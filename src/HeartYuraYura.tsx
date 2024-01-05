import { ReactElement } from 'react'
import Kirarin from '~/Kirarin'
import { COLORS_HEART, Heart } from '~/particles'

export interface Props {
  children: React.ReactNode
  sizePx?: { min: number; max: number }
  posXPercents?: { min: number; max: number }[]
  posYPercents?: { min: number; max: number }[]
  frequencyMs?: { min: number; max: number }
  first?: number
  strong?: boolean
}

/**
 * 何かをゆらゆらハートにさせる
 * yurayura heart something
 *
 * @example
 * ```tsx
 * <HeartYuraYura>ゆら〜ん</HeartYuraYura>
 * ```
 */
export function HeartYuraYura({
  posXPercents = [{ min: 0, max: 100 }],
  posYPercents = [
    { min: 0, max: 10 },
    { min: 90, max: 100 },
  ],
  sizePx = { min: 8, max: 12 },
  frequencyMs = { min: 1600, max: 2400 },
  strong = true,
  first = 3,
  children,
  ...others
}: Props): ReactElement {
  return (
    <Kirarin
      colors={COLORS_HEART}
      animation='yurayura'
      particle={<Heart />}
      sizePx={sizePx}
      posXPercents={posXPercents}
      posYPercents={posYPercents}
      frequencyMs={frequencyMs}
      first={first}
      strong={strong}
      {...others}
    >
      {children}
    </Kirarin>
  )
}
