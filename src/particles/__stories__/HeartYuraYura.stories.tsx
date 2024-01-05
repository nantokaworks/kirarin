import type { Meta, StoryObj } from '@storybook/react'
import { HeartYuraYura } from '~/HeartYuraYura'

const meta = {
  title: 'HeartYuraYura',
  component: HeartYuraYura,
  tags: ['autodocs'],
} satisfies Meta<typeof HeartYuraYura>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Heart Yura Yura' } }
