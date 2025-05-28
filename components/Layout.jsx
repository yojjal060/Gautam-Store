import React from "react";
import Head from "next/head";
import { Footer, Navbar } from "../components";
import BackToTop from "./BackToTop";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Gautam Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>{" "}
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </div>
  );
};

export default Layout;
