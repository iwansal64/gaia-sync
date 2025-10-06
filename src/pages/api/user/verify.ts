import type { APIContext } from "astro";
import { prisma } from "../../../lib/db";
import { z } from "zod";
import { create_cookie, create_response, generate_id, generate_verification_token } from "../../../lib/api_helper";

const PostType = z.object({
  verification_token: z.string(),
});

export async function POST({ request, cookies }: APIContext): Promise<Response> {
  // Verify the email token from user
  const email = cookies.get("email_token")?.value;
  if(!email) return create_response({ status: 404 });
  
  // Get the body response
  const body = await (async () => {
    try {
      return await request.json();
    } catch (err) {
      return false;
    }
  })();

  if (!body) return create_response({ status: 400 });

  // Verify the body;
  const result = PostType.safeParse(body);
  if (!result.success) {
    return create_response({ status: 400 });
  }

  
  // Get the token
  const verification_token = result.data.verification_token;


  // Check into the database
  const user_data = await prisma.users.findUnique({
    where: {
      email: email
    },
  });

  // Verify if the user exists
  if (!user_data) return create_response({ status: 404 });

  // Check if the email verification token is valid
  if(user_data.verification_token != verification_token) return create_response({ status: 401 });

  // Return OK
  return create_response({});
}
