import React from "react";
import { client } from "../lib/client";
import {
  HeroBanner,
  EventsBanner,
  Newsletter,
  FeaturesBanner,
  Product,
} from "../components";
import { Navigation, A11y, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Home = ({ products }) => {
  return (
    <>
      <HeroBanner />
      <EventsBanner />

      <div className="products-outer-container">
        <div className="subtitle">
          <span>OUR COLLECTIONS</span>
          <h2>Discover Your Next Style</h2>
        </div>
        <Swiper
          breakpoints={{
            // width >= 300
            300: {
              slidesPerView: 1,
              spaceBetween: 100,
            },
            // width >= 1000
            1000: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            // width >= 1260
            1260: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={3}
          navigation
        >
          <div className="products-container">
            {products?.map((product) => (
              <SwiperSlide>
                <Product key={product._id} product={product} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      <FeaturesBanner />
      <Newsletter />
    </>
  );
};

export const getServerSideProps = async () => {
  // Import from our local data instead of fetching from Sanity
  const { products } = await import("../data/products");

  return {
    props: { products },
  };
};

export default Home;
