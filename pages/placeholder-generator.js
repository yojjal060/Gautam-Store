import React from "react";
import Head from "next/head";

// This is a simple component that renders a placeholder image
// This will be used if actual product images aren't available

export default function PlaceholderGenerator() {
  return (
    <div>
      <Head>
        <title>Image Placeholder Generator</title>
      </Head>

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          margin: "20px auto",
          maxWidth: "800px",
        }}
      >
        <h1>Product Image Placeholder Generator</h1>

        <p>
          This page helps you generate a simple product placeholder image that
          can be used in your e-commerce site.
        </p>

        <div
          id="placeholder-image"
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: "#f0f0f0",
            margin: "30px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "70%",
              backgroundColor: "#e0e0e0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: "#f8f8f8",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "60%",
                height: "10px",
                backgroundColor: "#ddd",
                marginBottom: "8px",
              }}
            ></div>
            <div
              style={{
                width: "40%",
                height: "8px",
                backgroundColor: "#ddd",
              }}
            ></div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#999",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Product Image
          </div>
        </div>

        <div>
          <p>To use this as a placeholder:</p>
          <ol
            style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}
          >
            <li>Take a screenshot of the gray box above</li>
            <li>
              Save it as "product_placeholder.jpg" in your public/images folder
            </li>
            <li>
              All products will use this placeholder until you add specific
              product images
            </li>
          </ol>
        </div>

        <div style={{ marginTop: "30px" }}>
          <p>
            Alternatively, you can use any image generation tool or download a
            placeholder image from:
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a
                href="https://placeholder.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                placeholder.com
              </a>
            </li>
            <li>
              <a
                href="https://placehold.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                placehold.co
              </a>
            </li>
            <li>
              <a
                href="https://picsum.photos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                picsum.photos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
