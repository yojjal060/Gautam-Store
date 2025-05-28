import React from "react";
import { client } from "../lib/client";
import { CategoryPage } from "../components";

const Female = ({ AllFemaleProducts }) => {
  return (
    <CategoryPage
      products={AllFemaleProducts}
      title="Women's Modern Collection"
    />
  );
};

export const getServerSideProps = async () => {
  // Import products from our local data instead of using Sanity
  const { getProductsByCategory } = await import("../data/products");
  const AllFemaleProducts = getProductsByCategory("Female");

  return {
    props: { AllFemaleProducts },
  };
};

export default Female;
