import { cx } from 'styled-system/css'
import { AnimationType, particle, particleInner } from '~/particles'

interface Props {
  size: number
  color: string
  animation: AnimationType
  reverse: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const Particle = ({
  size,
  color,
  reverse,
  animation,
  className,
  style,
  children,
}: Props) => {
  return (
    <span
      className={cx(particle({ type: animation }), className)}
      style={style}
    >
      <span
        className={particleInner({ type: animation, reverse })}
        style={{ width: size, height: size, fill: color }}
      >
        {children}
      </span>
    </span>
  )
}
