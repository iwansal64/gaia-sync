import type { APIContext } from "astro";
import { create_response, get_user_data_from_cookies } from "../../../lib/api_helper";
import { prisma } from "../../../lib/db";
import z from "zod";

const GetType = z.object({
      report_id: z.string()
});

export async function GET({ request, cookies }: APIContext) {
      // Get the required search param data
      const url = new URL(request.url);
      const search_params = Object.fromEntries(url.searchParams.entries());
      
      // Verify the body;
      const result = GetType.safeParse(search_params);
      if (!result.success) {
            return create_response({ status: 400 });
      }

      const target_report_id = result.data.report_id;
      

      // Get and verify user data
      const user_data = await get_user_data_from_cookies(cookies);
      if(!user_data) return create_response({ status: 401 });

      

      // Get the report data
      const report_data = await prisma.ai_reports.findUnique({
            where: {
                  id: target_report_id
            }
      });

      if(!report_data) return create_response({ status: 404 });


      
      // Return the report data
      return create_response({
            status: 200,
            body: {
                  report_data: report_data
            }
      });
}