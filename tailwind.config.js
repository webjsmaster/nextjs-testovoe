/** @type {import('tailwindcss').Config} */
const constants = {
    myBlue: '#4D6AE4',
    myGray: 'rgba(30, 30, 46, 0.50)',
    titleColor: '#1E1E2E',
    myOrange: '#FFC543',
    linkColor: '#86BFEB',
};
module.exports = {
    important: true,
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            'montserrat': ['Montserrat', 'sans-serif'],
        },
        screens: {
            'mobile': '368px',
        },
        extend: {
            colors: {
                current: 'currentColor',
                ...constants,
            },
            keyframes: {
                spine: {
                    '0%': {transform: 'rotate(0deg)'},
                    '50%': {transform: 'rotate(180deg)', borderWidth: '1px'},
                    '100%': {transform: 'rotate(360deg)'},
                },
                spineTwo: {
                    '0%': {transform: 'rotate(0deg)', borderWidth: '1px'},
                    '50%': {transform: 'rotate(180deg)', borderWidth: '10px'},
                    '100%': {transform: 'rotate(360deg)', borderWidth: '1px'},
                }
            },
            animation: {
                spinner: 'spine 1.2s linear infinite',
                spinnerTwo: 'spineTwo 1.2s linear infinite',
            },
            boxShadow: {
                footer: '0px -5px 20px 0px rgba(0, 0, 0, 0.10)',
                authBtn: '0px 4px 20px 0px rgba(104, 109, 224, 0.50)'
            },
            backgroundImage: {
                'linear-gradient-footer': 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #E5F1FB 100%)',
                'linear-gradient-loginBtn': 'linear-gradient(273deg, #FFC543 4.95%, #FF8412 93.62%);',
                'linear-gradient-regBtn': 'linear-gradient(273deg, #686DE0 4.95%, #4834D4 93.62%)',
                'linear-gradient-popup': 'linear-gradient(180deg, #4936D4 0%, #6835D4 100%)',
                'linear-gradient-canselBtn': 'linear-gradient(273deg, #EDEBFB 4.95%, #F0F0FC 93.62%)',
            },
            backgroundColor: {
                'popup-opacity': 'rgba(30, 30, 46, 0.5);'
            },
        },
    },
    plugins: [],
}
