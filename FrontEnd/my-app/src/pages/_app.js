// hook de useEffect
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import "../styles/globals.css";
import Navbar from "@layout/Header";
import Head from "@layout/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
  }, []);

  return (
    <>
      {Component.authPage ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      )}
      <Head />
    </>
  );
}

export default MyApp;
