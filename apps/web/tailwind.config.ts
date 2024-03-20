import flowbite from 'flowbite/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // ...
    '../../node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Ubuntu', ' sans-serif'],
      },
      colors: {
        primary: "#0F4068",
        secondary: "#295A82",
        tertiary: "#B9D2E7",
        quaternary: "#FFFFFF"

      }
    },
  },
  plugins: [flowbite],
};

export default config;
