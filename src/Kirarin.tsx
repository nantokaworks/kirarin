import { range } from 'anoare'
import { useState } from 'react'
import { css, cx } from 'styled-system/css'
import { useIsClient, usePrefersReducedMotion, useRandomInterval } from 'usefoobar'
import { SpanWrapper, StrongWrapper } from '~/Wrapper'
import { generate } from '~/generate'
import { AnimationType, COLORS_KIRA, Particle, Pika, lifetimes } from '~/particles'

/**
 * Kirarin Props
 */
export interface Props {
  children: React.ReactNode
  animation?: AnimationType
  particle?: React.ReactNode
  colors?: string[]
  sizePx?: { min: number; max: number }
  posXPercents?: { min: number; max: number }[]
  posYPercents?: { min: number; max: number }[]
  frequencyMs?: { min: number; max: number }
  first?: number
  strong?: boolean
  className?: string
}

/**
 * 何かをきらきらさせる
 * sparkle something
 *
 * @example
 * ```tsx
 * <Kirarin>きらきら</Kirarin>
 * ```
 */
export function Kirarin({
  colors = COLORS_KIRA,
  animation = 'kirakira',
  particle = <Pika />,
  sizePx = { min: 8, max: 14 },
  posXPercents = [{ min: 0, max: 100 }],
  posYPercents = [{ min: 0, max: 100 }],
  frequencyMs = { min: 50, max: 450 },
  strong = true,
  first = 3,
  children,
  className,
  ...others
}: Props & React.HTMLAttributes<HTMLSpanElement>) {
  const isClient = useIsClient()
  const notKirarin = usePrefersReducedMotion() || !isClient

  const [datas, setDatas] = useState(() => {
    return notKirarin
      ? []
      : range(first).map(() => generate({ colors, sizePx, posXPercents, posYPercents }))
  })

  useRandomInterval(
    () => {
      const data = generate({ colors, sizePx, posXPercents, posYPercents })
      const now = Date.now()
      const newDatas = datas.filter((sp) => {
        const diff = now - sp.createdAt
        return diff < lifetimes[animation]
      })
      newDatas.push(data)
      setDatas(newDatas)
    },
    {
      minDelay: notKirarin ? undefined : frequencyMs.min,
      maxDelay: notKirarin ? undefined : frequencyMs.max,
    }
  )

  const Wrapper = strong ? StrongWrapper : SpanWrapper

  return (
    <span
      className={cx(
        css({ display: 'inline-block', position: 'relative', w: 'fit-content' }),
        className
      )}
      {...others}
    >
      {datas.map((p) => (
        <Particle
          key={p.id}
          color={p.color}
          size={p.size}
          animation={animation}
          reverse={p.reverse}
          style={p.style}
          children={particle}
        />
      ))}

      <Wrapper>{children}</Wrapper>
    </span>
  )
}

export default Kirarin
