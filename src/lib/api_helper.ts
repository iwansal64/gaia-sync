import * as cookie from "cookie";
import { id_characters, id_length, token_characters, token_length, verfication_token_characters, verfication_token_length } from "./api_config";

export function create_response({body, status = 200, cookies}: {body?: any, status?: number, cookies?: string[]}): Response {
  const headers: Headers = new Headers();
  cookies?.forEach((cookie) => {
    headers.append("Set-Cookie", cookie);
  })
  
  return new Response(
    JSON.stringify(body),
    { 
      status: status,
      headers: headers
    }
  )
}

export function create_cookie({ name, value = "", maxAge, expires }: { name: string, value?: string, maxAge?: number, expires?: Date }): string {
  return cookie.serialize(name, value, {
    path: "/",
    sameSite: true,
    secure: false,
    maxAge: maxAge,
    expires: expires,
    httpOnly: true
  });
}

export function generate_access_token(): string {
  const characters_length = token_characters.length;
  return (new Array<string>(token_length).fill(" ")).map(() => token_characters.charAt(Math.floor(Math.random() * characters_length))).join("");
}

export function generate_access_token_expiration(): Date {
  return new Date((new Date()).valueOf() + 1000 * 60 * 60 * 24);
}

export function generate_id(): string {
  const characters_length = id_characters.length;
  return (new Array<string>(id_length).fill(" ")).map(() => id_characters.charAt(Math.floor(Math.random() * characters_length))).join("");
}

export function generate_verification_token(): string {
  const characters_length = verfication_token_characters.length;
  return (new Array<string>(verfication_token_length).fill(" ")).map(() => verfication_token_characters.charAt(Math.floor(Math.random() * characters_length))).join("");
}