import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["var(--font-outfit)", "var(--font-inter)", "sans-serif"],
            },
            animation: {
                "shimmer": "shimmer 1.5s infinite",
            },
            keyframes: {
                shimmer: {
                    "100%": { transform: "translateX(100%)" },
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
} satisfies Config;
