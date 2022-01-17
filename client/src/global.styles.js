import { createGlobalStyle } from 'styled-components';

export const GlobalStyle =  createGlobalStyle `
    body {
        font-family: 'Open Sans Condensed', sans-serif;
        padding:20px 60px;

        @media screen and (max-width: 800px) {
            padding:10px;
        }

    }

    a{
        text-decoration:none;
        color:#000;
        transition:all 0.3s ease-in-out;
    }
    a:hover{
        color:#636666;
    }

    *{
        box-sizing: border-box;
    }
`;