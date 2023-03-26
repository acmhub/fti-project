/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				light: "var(--light)",
				dark: "var(--dark)",
				theme1: "var(--theme1)",
				theme2: "var(--theme2)",
				positive: "var(--positive)",
				negative: "var(--negative)",
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide"), require("@tailwindcss/line-clamp")],
};
