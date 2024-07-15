import Document, { Html, Head, Main, NextScript,DocumentContext } from "next/document";
import { JSX } from "react/jsx-runtime";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return Document.getInitialProps(ctx);  
  }

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
