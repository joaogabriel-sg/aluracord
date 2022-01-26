import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  html,
  body,
  #__next {
    min-height: 100vh;
    display: flex;
    flex: 1;
  }

  *,
  input,
  textarea,
  select,
  button {
    font: 400 1rem 'Open Sans', Helvetica, Arial, sans-serif;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  #__next {
    flex: 1;
  }

  #__next > * {
    flex: 1;
  }
`;
