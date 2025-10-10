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

export enum VerifyResponseEnum {
  Authorized,
  Unauthorized,
  Error
}

export enum CreateUserResponseEnum {
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

  static async is_authorized(): Promise<boolean> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/check_authorized",
      method: "POST"
    });

    //? Return the response
    return response.ok;
  }

  static async register(email: string): Promise<boolean> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/register",
      method: "POST",
      data: {
        email: email
      }
    });
    
    //? Check the respose
    return response.ok;
  }
  
  static async verify(token: string): Promise<VerifyResponseEnum> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/verify",
      method: "POST",
      data: {
        verification_token: token
      }
    });
    
    //? Check the respose
    switch (response.status) {
      case 200: return VerifyResponseEnum.Authorized;
      case 401: return VerifyResponseEnum.Unauthorized;
      default: return VerifyResponseEnum.Error;
    }
  }

  static async create(new_username: string, new_password: string): Promise<CreateUserResponseEnum> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/create",
      method: "POST",
      data: {
        username: new_username,
        password: new_password
      }
    });
    
    //? Check the respose
    switch (response.status) {
      case 200: return CreateUserResponseEnum.Authorized;
      case 401: return CreateUserResponseEnum.Unauthorized;
      default: return CreateUserResponseEnum.Error;
    }
  }
}