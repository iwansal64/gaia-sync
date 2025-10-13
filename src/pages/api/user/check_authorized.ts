import { create_response } from "../../../lib/api_helper";



export async function POST(): Promise<Response> {
  // Return the result with the genrated cookie
  return create_response({});
};
