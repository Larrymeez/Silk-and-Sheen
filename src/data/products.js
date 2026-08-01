// src/data/products.js
import clip1 from "../assets/bundles1.jpg";
import clip2 from "../assets/frontal1.jpg";
import clip4 from "../assets/glueless1.jpg";
import clip5 from "../assets/clipins5.jpg";
import clip6 from "../assets/clipins6.jpg";

// Shared pricing table for Straight Wigs — non-linear, so it's stored explicitly
// rather than calculated per-inch.
const straightWigPricing = {
  18: 8500,
  20: 9500,
  22: 11500,
  24: 13500,
  26: 15500,
  28: 17500,
  30: 19500,
  32: 21500,
};

export const products = [
  {
    id: 1,
    name: "Brazilian Straight Clip-ins",
    category: "straight-wigs",
    type: "Straight",
    image: clip1,
    // images: [clip1],  // add front/back/side shots here once ready
    description:
      "Premium Brazilian straight human hair clip-ins for seamless length, natural volume, and effortless styling.",
    pricing: straightWigPricing,
    startingLength: 18,
    stock: 5,
  },

  {
    id: 2,
    name: "Brazilian Wavy Clip-ins",
    category: "straight-wigs",
    type: "Wavy",
    image: clip2,
    description:
      "Beautiful Brazilian wavy clip-ins designed to blend naturally while adding instant volume and movement.",
    pricing: straightWigPricing,
    startingLength: 18,
    stock: 5,
  },

  {
    id: 3,
    name: "Peruvian Curly Clip-ins",
    category: "straight-wigs",
    type: "Curly",
    image: clip4,
    description:
      "Luxurious Peruvian curly clip-ins with beautiful texture, volume, and natural movement.",
    pricing: straightWigPricing,
    startingLength: 18,
    stock: 5,
  },

  {
    id: 4,
    name: "Brazilian Curly Clip-ins",
    category: "straight-wigs",
    type: "Curly",
    image: clip5,
    description:
      "Full-bodied Brazilian curly clip-ins for effortless volume and a beautifully natural finish.",
    pricing: straightWigPricing,
    startingLength: 18,
    stock: 5,
  },

  {
    id: 5,
    name: "Malaysian Curly Clip-ins",
    category: "straight-wigs",
    type: "Curly",
    image: clip6,
    description:
      "Soft, luxurious Malaysian curly clip-ins crafted for versatile styling and natural-looking volume.",
    pricing: straightWigPricing,
    startingLength: 18,
    stock: 5,
  },
];