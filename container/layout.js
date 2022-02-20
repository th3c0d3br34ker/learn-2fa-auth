import Head from "next/head";

// project imports
import Footer from "./footer";

const Layout = (props) => {
  const { title, children } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
