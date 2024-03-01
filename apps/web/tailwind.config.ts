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
        primary: ['Lato'],
      },
    },
  },
  plugins: [flowbite],
};

export default config;
