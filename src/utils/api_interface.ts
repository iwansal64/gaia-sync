import z from "zod";
import { AccessedModelAIReport, AccessedModelDevice, type AccessedModelAIReportType, type AccessedModelDeviceType } from "../lib/model";

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

export enum ConnectDeviceResponseEnum {
  Authorized,
  Unauthorized,
  NotFound,
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

  static async is_authorized(): Promise<[boolean, string | undefined]> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/check_authorized",
      method: "POST"
    });

    //? Return the response
    if(response.ok) {
      return [true, (await response.json())["access_token"]];
    }

    return [false, undefined];
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

  static async get_devices(): Promise<AccessedModelDeviceType[] | null> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/user/get_devices",
      method: "POST"
    });
    
    //? Check the respose
    if (response.ok) {
      const devices_data = (await response.json())["devices_data"];
      if(devices_data == undefined) {
        return null;
      }

      const safe_device_data = z.array(AccessedModelDevice).safeParse(devices_data);
      
      if(!safe_device_data.success) {
        console.error(safe_device_data.error);
        return null;
      }

      return safe_device_data.data;
    }

    return null;
  }

  static async connect_device(device_id: string): Promise<ConnectDeviceResponseEnum> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/connect/user",
      method: "POST",
      data: {
        device_id: device_id
      }
    });
    
    //? Check the respose
    switch (response.status) {
      case 200: return ConnectDeviceResponseEnum.Authorized;
      case 401: return ConnectDeviceResponseEnum.Unauthorized;
      case 404: return ConnectDeviceResponseEnum.NotFound;
      default: return ConnectDeviceResponseEnum.Error;
    }
  }

  static async get_ai_reports(): Promise<AccessedModelAIReportType[] | null> {
    //? Send post request
    const response = await send_api_request({
      endpoint: "/ai/reports",
      method: "GET"
    });
    
    //? Check the respose
    if (response.ok) {
      const reports_data = (await response.json())["reports_data"];
      if(reports_data == undefined) {
        return null;
      }

      const safe_report_data = z.array(AccessedModelAIReport).safeParse(reports_data);
      
      if(!safe_report_data.success) {
        console.error(safe_report_data.error);
        return null;
      }

      return safe_report_data.data;
    }

    return null;
  }
}