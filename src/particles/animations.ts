import { cva } from 'styled-system/css'

export const lifetimes = {
  kirakira: 900,
  yurayura: 4800,
  powan: 2800,
}

export type AnimationType = keyof typeof lifetimes

export const particle = cva({
  base: { position: 'absolute', display: 'block' },
  variants: {
    type: {
      kirakira: { animation: 'comeInOut 900ms forwards' },
      yurayura: { animation: 'comeInOut 4800ms forwards' },
      powan: {
        animation: 'powanFly 2800ms ease forwards',
      },
    },
  },
  defaultVariants: { type: 'kirakira' },
})

export const particleInner = cva({
  base: { display: 'block' },
  variants: {
    type: {
      kirakira: { animation: 'spin 1200ms linear' },
      yurayura: { animation: 'yurayura 1200ms linear infinite' },
      powan: { animation: 'powanScale 2800ms linear forwards' },
    },
    reverse: {
      true: { animationDirection: 'reverse' },
      false: { animationDirection: 'normal' },
    },
  },
  defaultVariants: { type: 'kirakira', reverse: false },
})
