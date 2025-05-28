// Define standard care instructions
const standardCare = [
  { children: [{ text: "Machine wash cold" }] },
  { children: [{ text: "Do not bleach" }] },
  { children: [{ text: "Tumble dry low" }] },
  { children: [{ text: "Iron on low heat" }] },
];

const delicateCare = [
  { children: [{ text: "Hand wash only" }] },
  { children: [{ text: "Do not bleach" }] },
  { children: [{ text: "Lay flat to dry" }] },
  { children: [{ text: "Do not iron" }] },
];

const traditionalCare = [
  { children: [{ text: "Dry clean only" }] },
  { children: [{ text: "Store in cool, dry place" }] },
  { children: [{ text: "Handle with care" }] },
  { children: [{ text: "Keep away from direct sunlight" }] },
];

export const products = [
  // Men's Modern Collection
  {
    _id: "prod1",
    name: "MetroFlex Performance Blazer", // Modernized Name
    price: 4500, // Adjusted Price
    details:
      "Sophisticated performance blazer, engineered for comfort and style. Features wrinkle-resistant fabric and a sleek, modern cut. Perfect for the urban professional.", // Modernized Details
    category: "Male",
    tags: "blazer modern urban professional", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/blazer.webp", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "metroflex-performance-blazer" }, // Modernized Slug
    care: standardCare,
  },
  {
    _id: "prod2",
    name: "AeroTech Traveler Shirt", // Modernized Name
    price: 2800, // Adjusted Price
    details:
      "Lightweight, breathable travel shirt with moisture-wicking technology. Minimalist design with hidden pockets, ideal for the modern man on the go.", // Modernized Details
    category: "Male",
    tags: "shirt modern travel minimalist", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/metroflex.jpg", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "aerotech-traveler-shirt" }, // Modernized Slug
    care: standardCare,
  },
  {
    _id: "prod3",
    name: "NovaTech Urban Jacket", // Modernized Name
    price: 5200, // Adjusted Price
    details:
      "Versatile urban jacket with a weather-resistant shell and insulated lining. Clean lines and functional design make it a staple for city living.", // Modernized Details
    category: "Male",
    tags: "jacket modern urban outerwear", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/nova-jacket.webp", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "novatech-urban-jacket" }, // Modernized Slug
    care: standardCare,
  },
  {
    _id: "prod4",
    name: "Zenith Comfort Chinos", // Modernized Name
    price: 3200, // Adjusted Price
    details:
      "Modern slim-fit chinos crafted from stretch cotton for maximum comfort and a polished look. Versatile for both casual and smart-casual occasions.", // Modernized Details
    category: "Male",
    tags: "chinos modern slim-fit versatile", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/cargo_pants.jpg", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "zenith-comfort-chinos" }, // Modernized Slug
    care: standardCare,
  },
  // Women's Modern Collection
  {
    _id: "prod7",
    name: "Etherea Silk Blouse", // Modernized Name
    price: 3800, // Adjusted Price
    details:
      "Luxurious silk blouse with a fluid drape and contemporary design. Features delicate detailing and a versatile silhouette for elegant styling.", // Modernized Details
    category: "Female",
    tags: "blouse silk modern elegant", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/choli_blouse.jpg", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "etherea-silk-blouse" }, // Modernized Slug
    care: delicateCare,
  },
  {
    _id: "prod8",
    name: "Aura Knit Midi Dress", // Modernized Name
    price: 4200, // Adjusted Price
    details:
      "Chic knit midi dress with a flattering bodycon fit and minimalist aesthetic. Perfect for transitioning from day to evening with effortless style.", // Modernized Details
    category: "Female",
    tags: "dress knit midi modern minimalist", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/fusion_wrap_dress.webp", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "aura-knit-midi-dress" }, // Modernized Slug
    care: delicateCare,
  },
  {
    _id: "prod9",
    name: "Nova Sculpted Blazer", // Modernized Name
    price: 5500, // Adjusted Price
    details:
      "Modern sculpted blazer with a tailored fit and sharp lines. Crafted from premium fabric for a sophisticated and powerful statement.", // Modernized Details
    category: "Female",
    tags: "blazer modern tailored sophisticated", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/himalayan_sweater.webp", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "nova-sculpted-blazer" }, // Modernized Slug
    care: delicateCare,
  },
  {
    _id: "prod10",
    name: "Luna Wide-Leg Trousers", // Modernized Name
    price: 3500, // Adjusted Price
    details:
      "Elegant high-waisted wide-leg trousers in a flowing fabric. Offers a contemporary silhouette that combines comfort and high fashion.", // Modernized Details
    category: "Female",
    tags: "trousers modern wide-leg elegant", // Modernized Tags
    image: [
      {
        asset: {
          _ref: "/images/Modern-Comfort-Leggings.jpg", // Placeholder - replace with actual image
        },
      },
    ],
    slug: { current: "luna-wide-leg-trousers" }, // Modernized Slug
    care: standardCare,
  },
  // Accessories (Unisex - Modern)
  
];

// Helper function to get a product by its slug
export const getProductBySlug = (slug) => {
  return products.find((product) => product.slug.current === slug);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      (product.name && product.name.toLowerCase().includes(searchTerm)) ||
      (product.tags && product.tags.toLowerCase().includes(searchTerm)) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm)) ||
      (product.details && product.details.toLowerCase().includes(searchTerm))
  );
};
