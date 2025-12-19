// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://amirchason.github.io',
  base: '/interfaith-peace',
  integrations: [
    mdx(),
    react(),
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-ES',
          ar: 'ar-SA',
          hi: 'hi-IN',
          zh: 'zh-CN'
        }
      }
    })
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ar', 'hi', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    optimizeDeps: {
      exclude: ['@supabase/supabase-js']
    }
  }
});
