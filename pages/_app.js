import Head from "next/head";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
