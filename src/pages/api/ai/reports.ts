import type { APIContext } from "astro";
import { create_response, get_user_data_from_cookies } from "../../../lib/api_helper";
import { prisma } from "../../../lib/db";


export async function GET({ cookies }: APIContext) {
      // -- Get the user data
      // Get the user data
      const user_data = await get_user_data_from_cookies(cookies);

      // Check if the user data is exists
      if(!user_data) return create_response({ status: 401 });

      
      // -- Gather AI reports data
      const ai_reports = await prisma.ai_reports.findMany({
            where: {
                  devices: {
                        connections: {
                              some: {
                                    user_id: user_data.id
                              }
                        }
                  }
            },
            select: {
                  created_at: true,
                  id: true,
                  title: true,
                  suggestions: true,
                  device_id: true,
                  fact: true
            }
      });

      
      // -- Return the ai reports
      return create_response({
            body: {
                  reports_data: ai_reports
            }
      });
}