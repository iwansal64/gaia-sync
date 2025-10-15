// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import node from '@astrojs/node';

const env = loadEnv(
  process.env.NODE_ENV || "",
  process.cwd(),
  ''
);


// https://astro.build/config
export default defineConfig({
  output: "server",

  vite: {
    plugins: [
      tailwindcss()
    ],
    server: {
      allowedHosts: env.ALLOWED_HOSTS?.split(",") || ['localhost']
    }
  },

  integrations: [react()],
  adapter: node({
    mode: "standalone"
  })
});