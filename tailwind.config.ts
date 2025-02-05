import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purpleFragments: {
  				'#EFEBFF': '#EFEBFF',
  				'#BEADFF': '#BEADFF',
  				'#633CFF': '#633CFF'
  			},
  			greyFragments: {
  				'#FAFAFA': '#FAFAFA',
  				'#D9D9D9': '#D9D9D9',
  				'#737373': '#737373',
  				'#333333': '#333333'
  			},
  			redFragment: {
  				'#FF3939': '#FF3939'
  			},
      },
    },
  },
  plugins: [],
} satisfies Config;
