import type { APIContext } from "astro";
import z from "zod";
import { create_response, get_user_data_from_cookies } from "../../../lib/api_helper";
import { prisma } from "../../../lib/db";
import sha3 from "js-sha3";


const PostType = z.object({
      username: z.string(),
      password: z.string()
});

export async function POST({ request, cookies }: APIContext): Promise<Response> {
      // Verify the user login
      const user_data = await get_user_data_from_cookies(cookies);
      if(!user_data) return create_response({ status: 401 });

      // Get the body response
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

      const username = result.data.username;
      const password = result.data.password;

      // Hash the password
      const hashed_password = sha3.sha3_256(password);

      // Update the user
      try {
            await prisma.users.update({
                  where: {
                        id: user_data.id
                  },
                  data: {
                        username: username,
                        password: hashed_password
                  }
            })
      }
      catch(err) {
            console.error("There's an error when updating the user data");
            console.error(err);
            return create_response({ status: 500, body: { message: "There's an error in DB" } });
      }

      return create_response({});
}