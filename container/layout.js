import Head from "next/head";

// project imports
import Footer from "./footer";
import Header from "./header";

const Layout = (props) => {
  const { title, header, isLoggedIn, children } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {header && <Header isLoggedIn={isLoggedIn} />}
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
