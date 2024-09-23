import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
    
    theme: {
        extend: {
            colors: {
                'nvim-bg': '#282c34',
                'nvim-fg': '#d8dee9',
                'nvim-gray': '#5c6370',
                'nvim-blue': '#88c0d0',
                'nvim-green': '#a3be8c',
                'nvim-red': '#bf616a',
                'nvim-yellow': '#ebcb8b',
                'nvim-purple': '#b48ead',
                'nvim-cyan': '#8fbcbb',
                'nvim-orange': '#d08770',
                'nvim-line': '#4c566a',
                'nvim-statusline': '#3b4252',
                'nvim-cursor': '#d8dee9'
            }
        }
    },

	plugins: [require('@tailwindcss/typography')]
} as Config;
