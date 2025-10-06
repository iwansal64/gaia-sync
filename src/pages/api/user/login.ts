import type { APIContext } from 'astro';
import { prisma } from "../../../lib/db";
import { z } from "zod";
import { create_cookie, create_response, generate_access_token_expiration, generate_access_token } from "../../../lib/api_helper";
import sha3 from "js-sha3";
import { ModelUser } from "../../../lib/model";


const PostType = z.object({
  username: z.string(),
  password: z.string()
});

export async function POST({ request }: APIContext): Promise<Response> {
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

  const username = result.data.username;
  const password = result.data.password;

  
  // Check into the database
  const user_data = await prisma.users.findUnique({
    where: {
      username: username
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


  // Verify password
  const hashed_password = sha3.sha3_256(password);
  if(user_data.password != hashed_password) return create_response({ status: 401 });
  

  // Create a token
  const generated_access_token: string = generate_access_token();
  const generated_access_token_expiration_date = generate_access_token_expiration();


  // Save the token to the database
  await prisma.users.update({
    where: {
      id: user_data.id
    },
    data: {
      access_token: generated_access_token,
      access_token_expire: generated_access_token_expiration_date
    }
  });


  // Save the token to the cookie
  const generated_cookie = create_cookie({ name: "access_token", value: generated_access_token });
  
  
  // Return the result with the genrated cookie
  return create_response({ 
    body: {
      "id": user_data.id,
      "access_token": generated_access_token
    },
    cookies: [generated_cookie]
  });
};
