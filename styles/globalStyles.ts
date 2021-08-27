import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
    ${normalize};

    *,*::before,*::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: ${({ theme }) => theme.fonts.main};
        font-size: 1.6rem;
        background: ${({ theme }) => theme.colors.background.primary};
        color: ${({ theme }) => theme.colors.color.primary};
    }

    h1,h2,h3,h3,h4,h5,h6,button {
        font-family: ${({ theme }) => theme.fonts.title};
        margin: 0;
    }

    input, textarea {
        outline: none;
        border: none;
    }

    a {
        text-decoration: none;
        outline: none;
    }

    li {
        list-style: none;
    }
`;

export default GlobalStyles;
