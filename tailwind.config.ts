import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          bg: '#121212',
          card: '#1E1E1E',
          hover: '#2D2D2D'
        }
      },
      height: {
        'half-screen': '50vh',
      },
      maxHeight: {
        'half-screen': '50vh',
      },
      maxWidth: {
        'half-screen': '50vw',
      },
      fontFamily: {
        sans: ['Pretendard', 'Arial', 'sans-serif'], // Pretendard를 기본 sans로 설정
      },
    },
  },
  plugins: [],
};
export default config;
