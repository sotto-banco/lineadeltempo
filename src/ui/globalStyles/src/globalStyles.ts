import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        width: 100vw;
        height: 100vh;
        padding: 0;
        margin: 0;
        font-family: 'Roboto Mono', monospace;
    }

    #root {
        width: 100%;
        height: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .tl-timemarker-content-container
 * {
        color: black !important;
    }

    .tl-timemarker-content-container
 *:hover {
        color: orange !important;
    }
`;
