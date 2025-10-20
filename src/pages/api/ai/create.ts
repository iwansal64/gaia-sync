import type { APIContext } from "astro";
import { create_response, get_sensors_data_hourly_simple } from "../../../lib/api_helper";
import z from "zod";
import { GoogleGenAI } from "@google/genai";

const gemini_ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


const PostType = z.object({
      device_id: z.string()
});

export async function POST({ cookies, request }: APIContext) {
      // Get the report key value
      const ai_report_cookie = cookies.get(import.meta.env.AI_REPORT_GENERATOR_KEY)?.value;
      if (!ai_report_cookie) create_response({ status: 401 });
      if (ai_report_cookie !== import.meta.env.AI_REPORT_GENERATOR_VALUE) return create_response({ status: 401 });

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

      const device_id = result.data.device_id;


      // Gather data
      const sensors_data = await get_sensors_data_hourly_simple(device_id);
      if(!sensors_data) return create_response({ status: 500 });


      /// [NEXT THING TO DO] Run the Generative AI
      // const ai_response = gemini_ai.models.generateContent({
      //       model: "gemini-2.5-flash",
      //       contents: ""
      // })

      return create_response({ status: 200, body: { pass: "OK" } });
}