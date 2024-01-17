import jsx from '@svgr/plugin-jsx'
import svgr from 'esbuild-plugin-svgr'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'esnext',
  format: ['esm'],
  clean: true,
  dts: true,
  esbuildPlugins: [svgr({ svgo: false, plugins: [jsx] })],
})
