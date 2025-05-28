// This is a script to help download a placeholder image
// Create a folder "public/images" and save the placeholder image there as "product_placeholder.jpg"

// Usage instructions:
// 1. Run this script with Node.js
// 2. It will create a product_placeholder.jpg file in your current directory
// 3. Move this file to your public/images folder

const fs = require("fs");
const https = require("https");
const path = require("path");

// URL to a basic placeholder image (350x350px, light gray with "Product Image" text)
const placeholderUrl =
  "https://via.placeholder.com/350x350/f0f0f0/888888?text=Product+Image";

// Function to download the image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(filepath);
          response.pipe(file);

          file.on("finish", () => {
            file.close();
            console.log(`Image downloaded successfully to ${filepath}`);
            resolve();
          });

          file.on("error", (err) => {
            fs.unlink(filepath, () => {}); // Delete the file if there was an error
            console.error(`Error writing file: ${err.message}`);
            reject(err);
          });
        } else {
          console.error(
            `Failed to download image. Status code: ${response.statusCode}`
          );
          reject(
            new Error(
              `Failed to download image. Status code: ${response.statusCode}`
            )
          );
        }
      })
      .on("error", (err) => {
        console.error(`Error downloading image: ${err.message}`);
        reject(err);
      });
  });
}

// Target filepath
const filepath = path.join(__dirname, "product_placeholder.jpg");

// Download the placeholder image
console.log("Downloading product placeholder image...");
downloadImage(placeholderUrl, filepath)
  .then(() => {
    console.log("✅ Done! Please move this file to your public/images folder");
    console.log(
      "Example command: move product_placeholder.jpg public\\images\\"
    );
  })
  .catch((error) => {
    console.error("❌ Failed to download placeholder image:", error);
    console.log("\nAlternative method:");
    console.log(
      "1. Visit: https://via.placeholder.com/350x350/f0f0f0/888888?text=Product+Image"
    );
    console.log('2. Right-click on the image and select "Save Image As..."');
    console.log(
      '3. Save it as "product_placeholder.jpg" in your public/images folder'
    );
  });
