import type { APIContext } from "astro";
import { prisma } from "../../../lib/db";
import { z } from "zod";
import { create_cookie, create_response } from "../../../lib/api_helper";
import sha3 from "js-sha3";

const PostType = z.object({
  username: z.string(),
  password: z.string()
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

  
  // Get the username and password
  const username = result.data.username;
  const password = result.data.password;


  // Verify username and password
  if(username.length <= 2 || password.length < 8) return create_response({ status: 400 });
  

  // Check into the database
  const user_data = await prisma.users.findUnique({
    where: {
      email: email
    },
  });

  // Verify if the user exists
  if (!user_data) return create_response({ status: 404 });

  // Get the verification token
  const verification_token = cookies.get("create_user_token")?.value;
  if(!verification_token) return create_response({ status: 401 });
  
  // Check if the email verification token is valid
  if(user_data.verification_token != verification_token) return create_response({ status: 401 });

  // Get the hashed password
  const hashed_password = sha3.sha3_256(password);
  
  // Update the user data
  await prisma.users.update({
    where: {
      email: user_data.email,
    },
    data: {
      username: username,
      password: hashed_password,
    }
  })

  // Send clear cookie for several keys
  const clear_email_token_cookie = create_cookie({
    name: "email_token",
    maxAge: 0
  });
  const clear_verification_token_cookie = create_cookie({
    name: "email_token",
    maxAge: 0
  });

  // Return OK
  return create_response({
    cookies: [
      clear_email_token_cookie,
      clear_verification_token_cookie
    ]
  });
}
