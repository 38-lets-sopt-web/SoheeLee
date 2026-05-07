import { Global, css } from "@emotion/react";

function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          min-height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #eaf0f7;
          color: #0f2a44;
        }

        button {
          border: none;
          font-family: inherit;
          cursor: pointer;
        }

        input {
          font-family: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        ul,
        li {
          list-style: none;
        }
      `}
    />
  );
}

export default GlobalStyle;