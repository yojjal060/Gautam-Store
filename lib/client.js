// Local data client implementation (replaces Sanity client)
import {
  products,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
} from "../data/products";

// Mock client with methods that simulate Sanity's API but use local data
export const client = {
  fetch: (query) => {
    console.log("Data query:", query);

    // Return all products for common queries
    if (query.includes('*[_type == "product"]')) {
      // If filtering by category
      if (query.includes("category ==")) {
        const categoryMatch = query.match(/category == ['"]([^'"]+)['"]/);
        if (categoryMatch && categoryMatch[1]) {
          return Promise.resolve(getProductsByCategory(categoryMatch[1]));
        }
      }

      // Return all products by default
      return Promise.resolve(products);
    }

    // For single product queries (usually by slug)
    if (query.includes("slug.current ==")) {
      const slugMatch = query.match(/slug\.current == ['"]([^'"]+)['"]/);
      if (slugMatch && slugMatch[1]) {
        const product = getProductBySlug(slugMatch[1]);
        return Promise.resolve(product ? [product] : []);
      }
    }

    // Default fallback
    return Promise.resolve(products);
  },
};

// Helper function to process image sources consistently
export const urlFor = (source) => {
  // Handle null/undefined image sources
  if (!source) return "/images/dhaka_pocket_beige.jpg"; // Use an existing image as fallback

  // Handle different image formats
  if (typeof source === "string") {
    return source;
  }

  // Handle image asset references
  if (source.asset && source.asset._ref) {
    // Extract the filename from the ref and use existing assets
    const ref = source.asset._ref;

    // Handle direct image paths first
    if (ref.startsWith("/images/")) {
      return ref;
    } else if (ref.startsWith("./images/")) {
      // Convert relative path to absolute
      return ref.replace("./", "/");
    }

    // If the image doesn't exist or path is incorrect, use a fallback
    return "/images/dhaka_pocket_beige.jpg"; // Use an existing image as fallback
  }

  // Default fallback to an existing image
  return "/images/dhaka_pocket_beige.jpg";
};
