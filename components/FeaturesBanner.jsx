import React from "react";
import Image from "next/image";
import img from "../src/assets/feature.png";
import Link from "next/link";

const FeaturesBanner = () => {
  return (
    <section className="features-section">
      <div className="title">
        <h1>Crafted with Conscience, Styled for Today</h1>
      </div>

      <div className="content">
        <div className="left">
          <div className="feature-background">The Gautam Store Difference</div>
          <div>
            <h3>Artisanal Quality</h3>
            <p>
              Sustainably sourced materials meet skilled Nepali craftsmanship in
              every piece.
            </p>
          </div>
          <div>
            <h3>Ethically Made</h3>
            <p>
              Handcrafted with care in our partner workshops, supporting local
              artisans.
            </p>
          </div>
          <div>
            <h3>Modern Heritage</h3>
            <p>
              Designs that honor Nepali traditions while embracing contemporary
              aesthetics.
            </p>
          </div>
          <div>
            <h3>Conscious Shopping</h3>
            <p>
              Join us in celebrating slow fashion and mindful consumption. Group
              discounts available.
            </p>
          </div>
        </div>

        <div className="right">
          <Image
            src={img}
            width={300}
            height={350}
            alt="Modern Nepali Fashion Feature"
          />
          <div>
            <p>
              Each Gautam Store Modern piece tells a story of heritage and innovation.
              We are committed to ethical production, using natural or
              thoughtfully selected materials, ensuring that every garment is as
              unique as you are.
            </p>
            <Link href={"/female"}>
              <button className="btn" type="button">
                Explore Collections
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;
