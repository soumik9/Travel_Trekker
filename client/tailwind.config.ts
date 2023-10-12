import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-400': "#E9C296",
        'primary-300': "#ECCBA6",
        primary: "#E7BD8D",
        'primary-600': "#E2B077",
        'primary-700': "#DEA462",

        purple: '#AB93E1',
        'purple-300': '#C9BAEC',
        'purple-400': '#B7A2E6',
        'purple-600': '#9A7EDC',
        'purple-700': '#8A69D6',

        secondary: '#D5D2E4',

        lightDark: "#1A1826",
        bgDark: "#0A090F",

        smartian: '#3c6382',

        error: "#F04438",
        "error-hover": "#C4173A",

        warning: "#F8B112",
        "warning-hover": "#FAC050",

        success: "#12B76A",

        diamond: "#1e3799",
        platinum: "#01a3a4",
        bronze: "#AD8A56",
      },
      screens: {
        xs: "375px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xll: "1440px",

        "3xl": "1920px",
      },
    },
  },
  plugins: [],
}
export default config
