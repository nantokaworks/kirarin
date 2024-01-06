import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  emitPackage: true,
  include: ['./src/**/*.{ts,tsx,js,jsx}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    extend: {
      keyframes: {
        comeInOut: {
          '0%': {
            transform: 'scale(0)',
          },
          '50%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0)',
          },
        },
        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(180deg)',
          },
        },
        baloon: {
          '0%, 100%': {
            transform: 'rotate(20deg)',
          },
          '50%': {
            transform: 'rotate(-20deg)',
          },
        },
        yurayura: {
          '0%, 100%': {
            transform: 'rotate(15deg)',
          },
          '50%': {
            transform: 'rotate(-15deg)',
          },
        },
        powanYura: {
          '0%': {
            transform: 'rotate(10deg)',
          },
          '100%': {
            transform: 'rotate(-10deg)',
          },
        },
        powanFly: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(0,-0.6rem,0)' },
        },
        powanScale: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '10%': { transform: 'scale(1)', opacity: 1 },
          '90%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0)', opacity: 0 },
        },
      },
    },
  },
})
