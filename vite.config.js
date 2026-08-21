import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  optimizeDeps: {
    // Pre-bundle deps that are newly rendered on a page so Vite doesn't
    // re-optimize at runtime (which can serve a stale React chunk and
    // cause "Cannot read properties of null (reading 'useState')").
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'cmdk',
      '@radix-ui/react-popover',
    ],
  },
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ]
});