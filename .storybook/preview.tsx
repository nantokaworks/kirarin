import { Preview } from '@storybook/react'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { css, cx } from 'styled-system/css'
import 'styled-system/styles.css'

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
            className={cx(
              css({
                backgroundColor: { base: 'mj.background.50', _dark: 'mj.background.800' },
                color: { base: 'mj.foreground.900', _dark: 'mj.foreground.100' },
              }),
              css({
                p: '1rem',
                minH: ctx.viewMode !== 'docs' ? '100vh' : 'auto',
              })
            )}
          >
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default preview
