import { AnimationType, getParticleClassName, getParticleInnerClassName } from '~/styles/inject'

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
      className={`${getParticleClassName(animation)} ${className || ''}`}
      style={style}
    >
      <span
        className={getParticleInnerClassName(animation, reverse)}
        style={{ width: size, height: size, fill: color }}
      >
        {children}
      </span>
    </span>
  )
}
