import type { APIContext } from "astro";
import { create_response, generate_long_id, get_sensors_data_hourly_simple } from "../../../lib/api_helper";
import z from "zod";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "../../../lib/db";


type AIResponseType = {
      title: string,
      suggestions: string,
      fact: string
};

const PostType = z.object({
      device_id: z.string()
});

export async function POST({ cookies, request }: APIContext) {
      // Get the required body data
      const body = await (async () => {
            try {
                  return await request.json();
            }
            catch (err) {
                  return false;
            }
      })();

      if (!body) return create_response({ status: 400 });

      // Verify the body;
      const result = PostType.safeParse(body);
      if (!result.success) {
            return create_response({ status: 400 });
      }

      const target_device_id = result.data.device_id;

      // Create Gemini AI instance
      const gemini_ai = new GoogleGenAI({
            apiKey: import.meta.env.GEMINI_API_KEY
      });
      
      // Get the report key value
      const ai_report_cookie = cookies.get(import.meta.env.AI_REPORT_GENERATOR_KEY)?.value;
      if (!ai_report_cookie) create_response({ status: 401 });
      if (ai_report_cookie !== import.meta.env.AI_REPORT_GENERATOR_VALUE) return create_response({ status: 401 });

      // Verify device id
      const device_data = await prisma.devices.findUnique({
            where: {
                  id: target_device_id
            }
      });

      if(device_data == null) return create_response({ status: 404 });


      // Gather data
      const sensors_data = await get_sensors_data_hourly_simple(target_device_id);
      if(!sensors_data) return create_response({ status: 500 });

      // Run the Generative AI
      console.log("AI START PROCESSING..");
      const before_ai_process_time = Date.now();
      const ai_response = await gemini_ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                  responseMimeType: "application/json",
                  responseSchema: {
                        type: "object",
                        properties: {
                              title: { 
                                    type: "string" 
                              },
                              suggestions: {
                                    type: "string"
                              },
                              fact: { 
                                    type: "string"
                              },
                        },
                        required: ["title", "suggestions", "fact"],
                  },
            },
            contents: [
                  {
                        role: "user",
                        parts: [
                              {
                                    text: `
You are a water quality analysis AI. Analyze the following sensor data:
Each reading has Electrical Conductivity (EC, µS/cm), Total Dissolved Solids (TDS, ppm), pH, and Temperature (°C).

Provide:
1. Title suitable for a notification (max 30 characters)
2. Key suggestions to maintain water quality (seperated by a period, max 200 characters)
3. Short factual summary about the condition of the water (max 200 characters).

This is the data (in json format):
${JSON.stringify(sensors_data)}
`
                              }
                        ]
                  }
            ]
      });
      const ai_request_time_spent = Date.now() - before_ai_process_time;
      console.log("AI PROCESS DONE!");
      

      if(!ai_response.text) {
            console.log(ai_response);
            return create_response({ status: 503, body: { message: "The AI is not available" } });
      }
      
      console.log(`Response: ${ai_response.text}`);
      const data: AIResponseType = JSON.parse(ai_response.text) as AIResponseType;

      if(data.fact === undefined) {
            return create_response({ status: 500, body: { message: "The AI was giving a wrong object type" } });
      }


      try {
            // Store the result
            await prisma.ai_reports.create({
                  data: {
                        title: data.title,
                        id: generate_long_id(),
                        suggestions: data.suggestions,
                        fact: data.fact,
                        devices: {
                              connect: {
                                    id: target_device_id
                              }
                        }
                  }
            });
      }
      catch(err) {
            console.error(`Uhmmm... I got this error when creating AI reports.. IDK why though :(\n${err}`);
            return create_response({ status: 500, body: { message: "There's an error in DB" } })
      }


      return create_response({ status: 200, body: { time_spent_in_secs: ai_request_time_spent / 1000 } });
}