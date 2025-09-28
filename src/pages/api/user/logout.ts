import type { APIContext } from "astro";
import * as cookie from "cookie";
import { create_cookie, create_response } from "../../../lib/api_helper";

export async function POST(_: APIContext): Promise<Response> {
  const generated_cookie = create_cookie({ name: "access_token", expires: new Date() });

  
  return create_response({ cookie: generated_cookie });
};
