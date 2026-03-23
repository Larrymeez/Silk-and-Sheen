import logo from "./assets/logo.png"; 
import heroImage from "./assets/hero.jpg";
import product1 from "./assets/product1.jpg";
import product2 from "./assets/product2.jpg";
import product3 from "./assets/product3.jpg";

function App() {
  return (
    <div className="relative bg-brandbg min-h-screen flex flex-col items-center overflow-hidden">

      {/* Background Gradient Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-yellow-500 opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-pink-500 opacity-20 rounded-full animate-pulse"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-start justify-between w-full px-6 md:px-20 py-16">

        {/* Left Column - lifted up */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 -translate-y-12 md:-translate-y-16 mb-10 md:mb-0 relative z-20">
          <img src={logo} alt="Silk & Sheen Logo" className="w-32 md:w-40 mb-6" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
            SILK & SHEEN
          </h1>
          <p className="text-white text-lg max-w-md mb-6">
            Premium wigs crafted for elegance, confidence and timeless beauty.
          </p>
          <div className="flex gap-4">
            <button className="bg-gold text-white px-8 py-3 rounded-md text-lg hover:bg-yellow-600 transition transform hover:scale-105 shadow-md">
              Shop Collection
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-brandbg transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Column - overlapping hero image */}
        <div className="md:w-1/2 flex justify-center relative -mt-12 md:-mt-24">
          <img
            src={heroImage}
            alt="Premium Wig Display"
            className="w-full max-w-lg rounded-lg shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>

      </div>

      {/* Teaser Product Cards */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6 px-6 md:px-20 pb-16">
        {[product1, product2, product3].map((img, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg w-60 hover:scale-105 transform transition">
            <img src={img} alt={`Product ${idx + 1}`} className="rounded-t-lg w-full" />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">Product {idx + 1}</h3>
              <p className="text-gray-500 mt-1">$99.99</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;