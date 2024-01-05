import saikoro, { saikoroArray } from 'saikoro'

interface Props {
  colors: string[]
  sizePx: { min: number; max: number }
  posXPercents: { min: number; max: number }[]
  posYPercents: { min: number; max: number }[]
}

export function generate({ colors, sizePx, posXPercents, posYPercents }: Props) {
  const left = saikoro({ type: 'integer', ...saikoroArray(posXPercents)() })()
  const top = saikoro({ type: 'integer', ...saikoroArray(posYPercents)() })()
  const reverse = saikoro({ type: 'integer', min: 0, max: 9 })() > 4
  const color = saikoroArray(colors)()
  const size = saikoro({ type: 'integer', ...sizePx })()
  const sizeHalf = Math.floor(size / 2)
  const now = Date.now()
  return {
    id: `${now.toString()}-${saikoro({ type: 'integer', min: 0, max: 99999 })()}}`,
    createdAt: now,
    color,
    size,
    reverse,
    style: {
      top: `calc(${top}% - ${sizeHalf}px)`,
      left: `calc(${left}% - ${sizeHalf}px)`,
      zIndex: saikoro({ type: 'integer', min: -1, max: 2 })().toString(),
    },
  }
}
