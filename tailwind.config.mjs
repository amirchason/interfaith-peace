/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Religion-specific colors
        christianity: {
          DEFAULT: '#4A90E2',
          light: '#6BA3E7',
          dark: '#3A7BC8',
        },
        islam: {
          DEFAULT: '#2ECC71',
          light: '#52D77E',
          dark: '#27AE60',
        },
        hinduism: {
          DEFAULT: '#F39C12',
          light: '#F5AB35',
          dark: '#D68910',
        },
        buddhism: {
          DEFAULT: '#9B59B6',
          light: '#AF7AC5',
          dark: '#8E44AD',
        },
        judaism: {
          DEFAULT: '#3498DB',
          light: '#5DADE2',
          dark: '#2E86C1',
        },
        interfaith: {
          DEFAULT: '#95A5A6',
          light: '#AEB6B7',
          dark: '#7F8C8D',
        },
        // Semantic colors
        text: {
          primary: '#2C3E50',
          secondary: '#7F8C8D',
          muted: '#95A5A6',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#ECF0F1',
          tertiary: '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['Fira Code', 'Monaco', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.interfaith.DEFAULT'),
              '&:hover': {
                color: theme('colors.interfaith.dark'),
              },
            },
            h1: {
              color: theme('colors.text.primary'),
            },
            h2: {
              color: theme('colors.text.primary'),
            },
            h3: {
              color: theme('colors.text.primary'),
            },
            'blockquote': {
              borderLeftColor: theme('colors.interfaith.DEFAULT'),
              color: theme('colors.text.secondary'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
