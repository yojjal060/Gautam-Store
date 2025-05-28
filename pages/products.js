import { useEffect } from "react";
import { useRouter } from "next/router";

const Products = ({ Allproducts }) => {
  const router = useRouter();
  useEffect(() => {
    // This page is effectively deprecated as we now have separate Men/Women pages.
    // Redirect to homepage or a more relevant general page if direct access is attempted.
    router.replace("/");
  }, [router]);

  return null; // Or a loading indicator while redirecting
};

export const getServerSideProps = async () => {
  // This data fetching is no longer directly used by the page if it redirects.
  // const { products } = await import("../data/products");
  // const Allproducts = products;
  return {
    props: { Allproducts: [] }, // Return empty or minimal props
  };
};

export default Products;
