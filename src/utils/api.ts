const api_url: string = "http://127.0.0.1:8080";

async function send_api_request({endpoint, data, method} : {endpoint: string, data?: object, method?: string}): Promise<Response> {
  //? Built the fetch data
  const response = await fetch(api_url+endpoint, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include"
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
  static async login(username: string, password: string): Promise<LoginResponseEnum> {
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
    if(response.ok) return LoginResponseEnum.Authorized;
    else if(response.status == 401) return LoginResponseEnum.Unauthorized;
    else return LoginResponseEnum.Error;
  }
}