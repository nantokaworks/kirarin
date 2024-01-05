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
 * 何かをハートフルにさせる
 * heartful something
 *
 * @example
 * ```tsx
 * <HeartPowan>ぽわ〜ん</HeartPowan>
 * ```
 */
export function HeartPowan({
  posXPercents = [{ min: 0, max: 100 }],
  posYPercents = [{ min: 20, max: 40 }],
  sizePx = { min: 8, max: 12 },
  frequencyMs = { min: 1200, max: 2000 },
  strong = true,
  first = 3,
  children,
  ...others
}: Props) {
  return (
    <Kirarin
      colors={COLORS_HEART}
      animation='powan'
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
