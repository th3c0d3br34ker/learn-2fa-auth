import Head from "next/head";

// project imports
import Footer from "./footer";

const Layout = (props) => {
  const { title, children } = props;
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>

      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
