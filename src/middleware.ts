import { defineMiddleware } from "astro/middleware";
import { create_response, get_user_data_from_cookies } from "./lib/api_helper";

const allowed_pathnames: string[] = ["/api/user/login", "/api/user/register", "/api/user/verify", "/api/user/create"];

export const onRequest = defineMiddleware(async ({ request, cookies, url }, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${url}`);

  try {
    // Modify the response object
    const response = await next();
    
    // Add security layer to prevent CSRF attack
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');


    if(url.pathname.includes("/api") && !allowed_pathnames.includes(url.pathname)) {
      // Get the access token
      const access_token = cookies.get("access_token")?.value;
      if(!access_token) return create_response({ status: 401 });
      
      // Check into the database
      let user_data = await get_user_data_from_cookies(cookies);
      if(!user_data) user_data = await get_user_data_from_cookies(cookies, true);
      
      // Verify if the user exists
      if(!user_data) return create_response({ status: 401 });
    }

    return response;

  } catch (err) {
    console.error("Caught by middleware:", err);

    // Catch unhandled errors globally — hide details from client
    return create_response({ status: 500 });
  }
});
