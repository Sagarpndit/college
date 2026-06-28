/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./components/**/*.{vue,js,ts,jsx,tsx}",
        "./pages/**/*.{vue,js,ts,jsx,tsx}",
        "./layouts/**/*.{vue,js,ts,jsx,tsx}",
        "./app/**/*.{vue,js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#3B82F6",
                    dark: "#1D4ED8",
                },
                background: "#0F172A",
                foreground: "#F8FAFC",
            },

            container: {
                center: true,
                padding: "1rem",
                screens: {
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1400px",
                },
            },

            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
            },

            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.1)",
            },
        },
    },

    plugins: [],
};