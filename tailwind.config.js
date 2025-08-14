/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './components/**/*.{js,ts,jsx,tsx,mdx}',
	  './app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		keyframes: {
		  marquee: {
			'0%': { transform: 'translateX(0%)' },
			'100%': { transform: 'translateX(-50%)' },
		  }
		},
		animation: {
		  marquee: 'marquee 5s linear infinite',
		},
		backgroundImage: {
		  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
		  'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
		},
	  },
	},
	plugins: [],
  } 