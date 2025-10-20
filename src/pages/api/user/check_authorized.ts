import type { APIContext } from "astro";
import { create_response } from "../../../lib/api_helper";



export async function POST({ cookies }: APIContext): Promise<Response> {
  const access_token = cookies.get("access_token");
  
  // Return the result with the genrated cookie
  return create_response({
    body: {
      access_token: access_token
    }
  });
};
