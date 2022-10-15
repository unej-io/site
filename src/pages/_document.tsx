import Document, { Head, Html, Main, NextScript } from "next/document";

import { createGetInitialProps } from "@mantine/next";

import { emotionCache } from "@unej-io/ui/core";

const getInitialProps = createGetInitialProps(emotionCache);

class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
