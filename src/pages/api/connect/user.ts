import type { APIContext } from 'astro';
import { prisma } from "../../../lib/db";
import { z } from "zod";
import { create_response, generate_id, get_user_data_from_cookies } from "../../../lib/api_helper";


const PostType = z.object({
  device_id: z.string(),
});

export async function POST({ request, cookies }: APIContext): Promise<Response> {
  // Get the body response
  const body = await (async () => {
    try {
      return await request.json();
    }
    catch(err) {
      return false;
    }
  })();

  if(!body) return create_response({ status: 400 });


  // Verify the body;
  const result = PostType.safeParse(body);
  if(!result.success) {
    return create_response({ status: 400 });
  }

  const device_id = result.data.device_id;


  // Verify the access token
  const user_data = await get_user_data_from_cookies(cookies);

  if(!user_data) return create_response({ status: 401 });
  
  
  // Check into the database
  const device_data = await prisma.devices.findUnique({
    where: {
      id: device_id
    }
  });

  
  // Verify if the device exists
  if(!device_data) return create_response({ status: 404 });
  

  // Create or Update the connection data
  await prisma.connections.upsert({
    where: {
      user_id_device_id: {
        device_id: device_data.id,
        user_id: user_data.id
      }
    },
    update: {
      user_accepted: true
    },
    create: {
      id: generate_id(),
      users: {
        connect: {
          id: user_data.id // Link User ID
        }
      },
      devices: {
        connect: {
          id: device_data.id // and Device ID
        }
      },
      user_accepted: true
    }
  });

  
  // Return OK!
  return create_response({});
};
