import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head />
        <body>
          <Main />
          <div id='modal-root' />
          <NextScript />
        </body>
      </Html>
    )
  }
}
