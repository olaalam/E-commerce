/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {

    container:{
      center:true,
      padding:'2rem',
    },
    row:{
      display:'flex',
      gap:'1rem',
      flexWrap:'wrap',
      justifyContent:'space-between',
      alignItems:'center',
    },
    fontSize:{
      'h1':'2em',
      'h2':'1.5em',
      'h3':'1.17em',
      'h4':'1em',
      'h5':'0.83em',
      'h6':'0.67em',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1560px',
    },
    extend: {    colors:{
      'main-color':'#0aad0a',
      'light-color':'#f0f3f2',
      'rating-color':'#ffc908'
    },
  },
  },
  plugins: [],
  darkMode: 'class',
}

