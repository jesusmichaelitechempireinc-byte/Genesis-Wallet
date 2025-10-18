
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        'neo-out': '5px 5px 10px #1a1a1a, -5px -5px 10px #2a2a2a',
        'neo-in': 'inset 5px 5px 10px #1a1a1a, inset -5px -5px 10px #2a2a2a',
        'neo-out-sm': '3px 3px 6px #1a1a1a, -3px -3px 6px #2a2a2a',
        'neo-in-sm': 'inset 3px 3px 6px #1a1a1a, inset -3px -3px 6px #2a2a2a',
        'neo-out-lg': '8px 8px 16px #1a1a1a, -8px -8px 16px #2a2a2a',
        'neo-in-lg': 'inset 8px 8px 16px #1a1a1a, inset -8px -8px 16px #2a2a2a',
        'heavy-out': '12px 12px 24px #161616, -12px -12px 24px #2e2e2e',
        'heavy-in': 'inset 12px 12px 24px #161616, inset -12px -12px 24px #2e2e2e',
        'heavy-out-sm': '6px 6px 12px #161616, -6px -6px 12px #2e2e2e',
        'heavy-in-sm': 'inset 6px 6px 12px #161616, inset -6px -6px 12px #2e2e2e',
        'heavy-out-lg': '20px 20px 40px #161616, -20px -20px 40px #2e2e2e',
        'heavy-in-lg': 'inset 20px 20px 40px #161616, inset -20px -20px 40px #2e2e2e',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['DM Sans', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
