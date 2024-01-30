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
        'profile-edit': "url('/edit_hover.svg')",
      },
      backgroundColor: {
        'background': '#f2f7f5',
        'headline': '#00473e',
        'paragraph': '#475d5b',
        'button': '#FE8402',
      },
      textColor: {
        'background': '#f2f7f5',
        'headline': '#00473e',
        'paragraph': '#475d5b',
        'button': '#FE8402',
      },
      borderColor: {
        'background': '#f2f7f5',
        'headline': '#00473e',
        'paragraph': '#475d5b',
        'button': '#FE8402',
      },
      margin: {
        'x-origin': '120px'
      },
      top: {
        '1/6': '30%'
      },
      height: {
        'body': 'calc(100vh - 145px)',
        '1/12': '8.333333%',
        '2/12': '16.666667%', 
        '9/12': '75%',
        '10/12': '83.333333%',
      },
    },
  },
  plugins: [],
}
export default config
