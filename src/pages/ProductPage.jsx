// src/pages/ProductPage.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import clip1 from "../assets/clipins1.jpg";
import clip2 from "../assets/clipins2.jpg";
import clip4 from "../assets/clipins4.jpg";
import clip5 from "../assets/clipins5.jpg";
import clip6 from "../assets/clipins6.jpg";

const products = [
  { id: 1, name: "Silky Straight Clip-ins", basePrice: 4500, image: clip1 },
  { id: 2, name: "Body Wave Clip-ins", basePrice: 5000, image: clip2 },
  { id: 3, name: "Curly Clip-ins", basePrice: 5200, image: clip4 },
  { id: 4, name: "Kinky Straight Clip-ins", basePrice: 4800, image: clip5 },
  { id: 5, name: "Luxury Volume Clip-ins", basePrice: 5500, image: clip6 },
];

function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  const [inches, setInches] = useState(14);
  const [quantity, setQuantity] = useState(1);

  const price = product.basePrice + (inches - 14) * 300; // extra 300 per inch over 14

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} (${inches}" length) to cart. Total: KES ${price * quantity}`);
  };

  return (
    <div className="px-6 md:px-20 py-16 bg-brandbg text-white flex flex-col md:flex-row gap-10">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full rounded-2xl shadow-xl" />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-300">
          Select the desired length in inches. Price increases with longer lengths.
        </p>

        {/* Inches selector */}
        <div className="flex flex-col gap-2">
          <label>Length (inches): {inches}"</label>
          <input
            type="range"
            min={14}
            max={30}
            value={inches}
            onChange={e => setInches(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold"
          />
        </div>

        {/* Quantity selector */}
        <div className="flex flex-col gap-2">
          <label>Quantity:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-24 px-2 py-1 text-black rounded-md"
          />
        </div>

        {/* Total Price */}
        <p className="text-xl font-semibold">
          Total: KES {price * quantity}
        </p>

        <button
          onClick={handleAddToCart}
          className="bg-gold text-black px-6 py-3 rounded-md hover:bg-yellow-600 transition w-max"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductPage;