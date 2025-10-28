import type { APIContext } from "astro";
import { create_cookie, create_response } from "../../../lib/api_helper";
import { resetAllStorageState } from "../../../utils/state_manager";

export async function POST(_: APIContext): Promise<Response> {
  const generated_cookie = create_cookie({ name: "access_token", expires: new Date() });
  resetAllStorageState();
  
  return create_response({ cookies: [generated_cookie] });
};
