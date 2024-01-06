import react from '@vitejs/plugin-react'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import libCss from 'vite-plugin-libcss'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    libCss(),
    svgr(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: ['src/index.ts'],
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.mjs`,
    },
    rollupOptions: {
      plugins: [peerDepsExternal() as Plugin],
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'anoare',
        'saikoro',
        'use-prefers-reduced-motion',
        'use-random-interval',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
          anoare: 'anoare',
          saikoro: 'saikoro',
          'use-prefers-reduced-motion': 'use-prefers-reduced-motion',
          'use-random-interval': 'use-random-interval',
        },
      },
    },
  },
})
