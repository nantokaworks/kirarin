import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outExtension({ format }) {
    return {
      js: `.mjs`,
    }
  },
  minify: true,
  target: 'esnext',
  format: ['esm'],
  clean: true,
  dts: true,
})
