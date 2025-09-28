import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({ message: "Hello from Astro serverless!" }),
    { status: 200 }
  );
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  return new Response(
    JSON.stringify({ received: body }),
    { status: 200 }
  );
};
