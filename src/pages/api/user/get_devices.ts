import type { APIContext } from 'astro';
import { prisma } from "../../../lib/db";
import { create_response, get_user_data_from_cookies, used_device_data_props } from "../../../lib/api_helper";


export async function POST({ request, cookies }: APIContext): Promise<Response> {
  // Check into the database
  const user_data = await get_user_data_from_cookies(cookies);


  // Verify if the user exists
  if(!user_data) return create_response({ status: 401 });


  // Get device data
  const devices_data = await prisma.devices.findMany({
    where: {
      connections: {
        some: {
          user_id: user_data.id
        }
      }
    },
    select: used_device_data_props
  })
  
  
  // Return the result with the genrated cookie
  return create_response({ 
    body: {
      "devices_data": devices_data
    } 
  });
};
