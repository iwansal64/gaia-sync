import type { APIContext } from "astro";
import { create_response, generate_long_id, get_sensors_data_hourly_simple, get_user_data_from_cookies } from "../../../lib/api_helper";
import z from "zod";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "../../../lib/db";


const PostType = z.object({
      prompt: z.string(),
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

      const user_prompt: string = result.data.prompt;
      const target_device_id: string = result.data.device_id;

      
      // Verify the user data
      const user_data = await get_user_data_from_cookies(cookies);
      if(!user_data) return create_response({ status: 401 });


      // Verify the connections
      const connection_data = await prisma.connections.findUnique({
            where: {
                  user_id_device_id: {
                        device_id: target_device_id,
                        user_id: user_data.id
                  }
            }
      });
      if(!connection_data) return create_response({ status: 404 });
      if(!connection_data.device_accepted || !connection_data.user_accepted) return create_response({ status: 401 });
      

      // Gather sensors data for that device
      const sensors_data = await get_sensors_data_hourly_simple(target_device_id);
      if(!sensors_data) return create_response({ status: 500 });

      // Generate AI Message
      const gemini_ai = new GoogleGenAI({
            apiKey: import.meta.env.GEMINI_API_KEY
      });

      console.log("[AI] Generating content..");
      const ai_response = await gemini_ai.models.generateContent({
            model: import.meta.env.AI_MODEL,
            config: {
                  thinkingConfig: {
                        includeThoughts: false
                  }
            },
            contents: [
                  {
                        role: "user",
                        // Improve here for adding memory
                        parts: [
                              {
                                    text: user_prompt
                              },
                              {
                                    text: `Answer the message with max of 500 characters based on this data for an aquaponics system. Each reading has Electrical Conductivity (EC, µS/cm), Total Dissolved Solids (TDS, ppm), pH, and Temperature (°C). and it's in JSON format:${JSON.stringify(sensors_data)}`
                              }
                        ]
                  }
            ]
      });
      console.log("[AI] Content generated successfully");

      if(!ai_response.text) {
            console.log(ai_response);
            return create_response({ status: 503, body: { message: "The AI is not available" } });
      }

      const ai_message: string = ai_response.text.substring(0, Math.min(ai_response.text.length, 500) - 1);


      // Store the message
      try {
            await prisma.ai_chat_history.createMany({
                  data: [
                        {
                              id: generate_long_id(),
                              message: user_prompt,
                              from_user: true,
                              connection_id: connection_data.id,
                        },
                        {
                              id: generate_long_id(),
                              message: ai_message,
                              from_user: false,
                              connection_id: connection_data.id,
                        }
                  ]
            })
      }
      catch(err) {
            console.error(`There's an error when trying to store message to database. Error: ${err}`);
            return create_response({ status: 500 });
      }


      // Send back the resulting message
      return create_response({
            body: {
                  message: ai_message
            }
      });
}

const GetType = z.object({
      device_id: z.string()
});

export async function GET({ request, cookies }: APIContext) {
      // Verify the user data
      const user_data = await get_user_data_from_cookies(cookies);
      if(!user_data) return create_response({ status: 401 });


      // Get the device data from search query
      const url = new URL(request.url);
      const search_params = Object.fromEntries(url.searchParams.entries());
      
      // Verify the body;
      const result = GetType.safeParse(search_params);
      if (!result.success) {
            return create_response({ status: 400 });
      }

      const target_device_id = result.data.device_id;
      

      // Verify the connections
      const connection_data = await prisma.connections.findUnique({
            where: {
                  user_id_device_id: {
                        device_id: target_device_id,
                        user_id: user_data.id
                  }
            }
      });
      if(!connection_data) return create_response({ status: 404 });
      if(!connection_data.device_accepted || !connection_data.user_accepted) return create_response({ status: 401 });


      // Get the AI chat histories for the connection
      const chat_histories = await prisma.ai_chat_history.findMany({
            where: {
                  connections: {
                        id: connection_data.id
                  }
            }
      });


      // Return the Chat Histories data
      return create_response({
            body: {
                  chat_histories: chat_histories
            }
      });
}