const api_url: string = "/api";

async function send_api_request({endpoint, data, method = "POST"} : {endpoint: string, data?: object, method?: "POST" | "GET" | "DELETE" | "PUT"}): Promise<Response> {
  //? Built the fetch data
  const response = await fetch(api_url+endpoint, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  //? Return the response
  return response;
}


export enum LoginResponseEnum {
  Authorized,
  Unauthorized,
  Error
}

export class API {
  static async login(username: string, password: string): Promise<{[key: string]: string}|LoginResponseEnum> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/login",
      method: "POST",
      data: {
        username: username,
        password: password
      }
    });
    
    //? Check the respose
    if(response.ok) return (await response.json());
    else if(response.status == 401) return LoginResponseEnum.Unauthorized;
    else return LoginResponseEnum.Error;
  }

  static async logout(): Promise<boolean> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/logout",
      method: "POST"
    });

    //? Return the response
    return response.ok;
  }
}