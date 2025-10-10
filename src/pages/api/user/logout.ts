import type { APIContext } from "astro";
import { create_cookie, create_response } from "../../../lib/api_helper";

export async function POST(_: APIContext): Promise<Response> {
  const generated_cookie = create_cookie({ name: "access_token", expires: new Date() });

  
  return create_response({ cookies: [generated_cookie] });
};
