import { Preview } from '@storybook/react'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: ['ref'],
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, ctx) => {
      const isDark = useDarkMode()

      return (
        <div data-color-mode={isDark ? 'dark' : 'light'}>
          <div
            style={{
              backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
              color: isDark ? '#e5e5e5' : '#1a1a1a',
              padding: '1rem',
              minHeight: ctx.viewMode !== 'docs' ? '100vh' : 'auto',
            }}
          >
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default preview
