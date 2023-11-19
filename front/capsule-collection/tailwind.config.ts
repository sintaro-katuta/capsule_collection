import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'iphone-se': '320px',
      'iphone-12': '390px',
      'iphone-12-pro': '428px',
      'iphone-14': '475px',
      'iphone-14-pro': '510px',
      'iphone-14-pro-max': '550px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'background': '#f2f7f5',
        'headline': '#00473e',
        'paragraph': '#475d5b',
      },
      textColor: {
        'background': '#f2f7f5',
        'headline': '#00473e',
        'paragraph': '#475d5b',
      },
      margin: {
        'x-origin': '120px'
      },
      height: {
        'body': 'calc(100vh - 140px)'
      }
    },
  },
  plugins: [],
}
export default config
