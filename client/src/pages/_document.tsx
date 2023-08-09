import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ru'>
      <Head>
        <script
          defer
          src='https://api-maps.yandex.ru/2.1/?apikey=aff58b82-7811-4ae0-984e-a1b0ecc0f6b6&lang=ru_RU'
          type='text/javascript'
        ></script>
        {/* че та не работает */}
        <link
          href='https://fonts.googleapis.com/css2?family=Ysabeau+Infant&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
