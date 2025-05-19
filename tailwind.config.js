/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#FFBB94',
				secondary: '#DC586D',
				third: '#fb9590',
				bgColor: '#852E4E',
				brandGreen: '#2dcc6f',
				brandBlue: '#1376f4',
				brandWhite: '#eeeeee',
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '3rem',
				},
			},
			animation: {
				fadeIn: 'fadeIn 0.2s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0, transform: 'translateY(4px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
	],
}
