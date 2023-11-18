const colours = require( './colours/colours.json' ); // Adjust the path to your JSON file

const defaultTheme = require( 'tailwindcss/defaultTheme' )

/** @type {import('tailwindcss').Config} */
module.exports = {
    content : [
        './index.html',
        './components/**/*.{html,js,php,py,jsx}',
        './colours/**/*.{html,js,php,py,jsx,json}',
        './pages/**/*.{html,js,php,py,jsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Montreal', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                ...colours,
            },
            truncate: {
                lines: {
                    3: '3',
                    5: '5',
                    8: '8',
                },
            },
        },
    },

    plugins: [
        require( '@tailwindcss/typography' ),
        require( '@tailwindcss/forms' ),
        require( '@tailwindcss/aspect-ratio' ),
        require( '@tailwindcss/container-queries' ),
        require( 'tailwindcss-elevation' ),
        require( 'tailwindcss-truncate-multiline' )(),
        require( 'tailwind-fontawesome' )( {
            version : 6,
        } ),
    ],
};
