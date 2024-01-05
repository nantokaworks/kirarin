import type { Meta, StoryObj } from '@storybook/react'
import { HeartPowan } from '~/HeartPowan'

const meta = {
  title: 'HeartPowan',
  component: HeartPowan,
  tags: ['autodocs'],
} satisfies Meta<typeof HeartPowan>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Heart Powan' } }
