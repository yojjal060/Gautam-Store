import React from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "../styles/search.css";
import "../styles/quickview.css";
import "../styles/product.css";
import "../styles/productfilter.css";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
