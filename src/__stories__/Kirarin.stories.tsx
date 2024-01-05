import type { Meta, StoryObj } from '@storybook/react'
import Kirarin from '~/Kirarin'
import { COLORS_RAINBOW, COLORS_UNICORN, COLORS_VIVID } from '~/particles/colors'

const meta = {
  title: 'Kirarin',
  component: Kirarin,
  tags: ['autodocs'],
} satisfies Meta<typeof Kirarin>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Kirarin' } }
export const NotStrong: Story = { args: { children: 'Kirarin', strong: false } }
export const Unicorn: Story = { args: { children: 'Kirarin', colors: COLORS_UNICORN } }
export const Rainbow: Story = { args: { children: 'Kirarin', colors: COLORS_RAINBOW } }
export const Vivid: Story = { args: { children: 'Kirarin', colors: COLORS_VIVID } }
