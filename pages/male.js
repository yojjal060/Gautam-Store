import { CategoryPage } from "../components"; // Assuming CategoryPage is used for male section too

const Male = ({ AllMaleProducts }) => {
  return (
    <CategoryPage products={AllMaleProducts} title="Men's Modern Collection" /> // Updated Title
  );
};

export const getServerSideProps = async () => {
  const { getProductsByCategory } = await import("../data/products");
  const AllMaleProducts = getProductsByCategory("Male");

  return {
    props: { AllMaleProducts },
  };
};

export default Male;
