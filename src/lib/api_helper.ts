import * as cookie from "cookie";
import { id_characters, id_length, long_id_length, token_characters, token_length, verfication_token_characters, verfication_token_length } from "./api_config";
import type { devices, users } from "@prisma/client";
import type { AstroCookies } from "astro";
import { prisma } from "./db";
import dns from "dns/promises";

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

export function generate_long_id(): string {
  const characters_length = id_characters.length;
  return (new Array<string>(long_id_length).fill(" ")).map(() => id_characters.charAt(Math.floor(Math.random() * characters_length))).join("");
}

export function generate_verification_token(): string {
  const characters_length = verfication_token_characters.length;
  return (new Array<string>(verfication_token_length).fill(" ")).map(() => verfication_token_characters.charAt(Math.floor(Math.random() * characters_length))).join("");
}

export async function get_user_data_from_cookies(cookies: AstroCookies, is_device?: boolean): Promise<users | devices | null> {
  const access_token = cookies.get("access_token")?.value;
  
  // If there's no access token
  if(!access_token) return null;

  // Get the user data
  if(!is_device) {
    return await prisma.users.findUnique({
      where: {
        access_token: access_token
      }
    });
  }
  else {
    return await prisma.devices.findUnique({
      where: {
        access_token: access_token
      }
    });
  }
}

export function is_email_valid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function is_email_domain_valid(email: string) {
  const domain = email.split("@")[1];
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}



// Requets Handler

type SensorData = {
  _id: {
      "$oid": string
  },
  metadata: {
      device_id: string
  },
  timestamp: {
      "$date": {
          "$numberLong": string
      }
  },
  data: string
};

type IndexedSensorData = {
  [topic: string]: SensorData[]
};

export async function get_sensors_data(device_id: string): Promise<IndexedSensorData | null> {
  const response = await fetch(
    "http://localhost:8091/sensor/get",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "device_id": device_id
      })
    }
  );
  if(!response.ok) return null;

  const result = (await response.json())["data"];
  return result as IndexedSensorData;
}

type SensorDataSimple = {
  [topic: string]: {
    timestamp: Date,
    value: number
  }[]
};

export async function get_sensors_data_simple(device_id: string): Promise<SensorDataSimple | null> {
  const indexed_sensors_data = await get_sensors_data(device_id);
  if(!indexed_sensors_data) return null;

  const result: SensorDataSimple = {};
  Object.keys(indexed_sensors_data).forEach(key => {
    const sensors_data = indexed_sensors_data[key];
    result[key] = [];
    sensors_data.forEach(sensor_data => {
      result[key].push({
        timestamp: new Date(Number.parseInt(sensor_data.timestamp.$date.$numberLong)),
        value: Number.parseFloat(sensor_data.data)
      });
    })
  });

  return result;
}

export async function get_sensors_data_hourly_simple(device_id: string): Promise<SensorDataSimple | null> {
  const sensors_data_simple = await get_sensors_data_simple(device_id);
  if(!sensors_data_simple) return null;

  const result: SensorDataSimple = {};

  // Iterate for data in each topics
  Object.keys(sensors_data_simple).forEach(key => {
    // Get the sensors data for that topic
    const sensors_data = sensors_data_simple[key];
    
    // Prepare data to be filled in the next iteration
    result[key] = [];

    // Used for tracking time (in order to know is it already pass an hour)
    let last_data_date = 0;

    // Iterate for each sensor data inside that topic
    sensors_data.forEach(sensor_data => {
      // Get current date
      const current_data_date = sensor_data.timestamp;
      
      // If it's already more than hour
      if(current_data_date.valueOf() > last_data_date + (1000 * 60 * 60)) {

        // Push the data
        result[key].push({
          timestamp: current_data_date,
          value: sensor_data.value
        });

        // Update the last data date in order to wait for data in the next hour from current data date
        last_data_date = current_data_date.valueOf();
      }
    })
  });

  return result;
}


// Model Helper
export const used_device_data_props: {
  [key in keyof Partial<devices>]: boolean
} = {
  created_at: true,
  device_name: true,
  id: true,
  last_online: true,
  description: true,
  status: true,
}

export const used_user_data_props: {
  [key in keyof Partial<users>]: boolean
} = {
  created_at: true,
  username: true,
  email: true,
  id: true,
}