import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
    
    theme: {
        extend: {
            colors: {
                'nvim-bg': '#282c34',
                'nvim-fg': '#abb2bf',
                'nvim-gray': '#5c6370',
                'nvim-blue': '#61afef',
                'nvim-green': '#98c379',
                'nvim-statusline': '#21252b'
            }
        }
    },

	plugins: [require('@tailwindcss/typography')]
} as Config;
