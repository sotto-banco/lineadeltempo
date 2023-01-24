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

    .tl-text * {
        color: black !important;
    }

    .tl-timemarker-content-container
 * {
        color: rgb(50,50,50) !important;
        background-color: white;
    }

    /* .tl-timemarker-content-container
 *:hover {
        color: orange !important;
    } */

    .tl-slidenav-content-container * {
        color: black !important;
        
    }

    .tl-slidenav-title {
        opacity: 0.6 !important;
    }

    .tl-slidenav-description {
        opacity: 0.6 !important;
    }

    .tl-slidenav-content-container:hover * {
        opacity: 1 !important;
    }

    .tl-timeaxis * {
        color: rgb(100, 100, 100) !important;
    }
`;
