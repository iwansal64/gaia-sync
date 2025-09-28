// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      basicSsl({
        name: "https certification",
        domains: ["localhost"],
        certDir: "../secrets/"
      })
    ]
  },


  integrations: [react()]
});
