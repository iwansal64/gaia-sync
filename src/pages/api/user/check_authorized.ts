import type { APIContext } from 'astro';
import { prisma } from "../../../lib/db";
import { create_response } from "../../../lib/api_helper";
import { ModelUser } from "../../../lib/model";



export async function POST({ cookies }: APIContext): Promise<Response> {
  // Get the access token
  const access_token = cookies.get("access_token")?.value;
  if(!access_token) return create_response({ status: 401 });
  
  
  // Check into the database
  const user_data = await prisma.users.findUnique({
    where: {
      access_token: access_token
    }
  });

  
  // Verify if the user exists
  if(!user_data) return create_response({ status: 401 });
  
  
  // Verify data from database
  const safe_parse_result = ModelUser.safeParse(user_data);
  if(!safe_parse_result.success) {
    console.error(`There's an error when trying to parse model user: ${safe_parse_result.error}`)
    return create_response({ status: 500 });
  }
  
  
  // Return the result with the genrated cookie
  return create_response({});
};
