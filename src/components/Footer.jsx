// src/components/Footer.jsx
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-brandbg text-white py-16 px-6 md:px-20 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <img src={logo} alt="Silk & Sheen Logo" className="w-32 md:w-40" />
          <p className="text-gray-300 text-sm">
            Premium wigs crafted for elegance, confidence, and timeless beauty. Follow us to stay inspired.
          </p>
          <div className="flex items-center gap-4 text-xl mt-2">
            <FiFacebook className="hover:text-gold transition cursor-pointer" />
            <FiInstagram className="hover:text-gold transition cursor-pointer" />
            <FiTwitter className="hover:text-gold transition cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li className="hover:text-gold transition cursor-pointer">Home</li>
            <li className="hover:text-gold transition cursor-pointer">Shop</li>
            <li className="hover:text-gold transition cursor-pointer">Collections</li>
            <li className="hover:text-gold transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li className="hover:text-gold transition cursor-pointer">FAQ</li>
            <li className="hover:text-gold transition cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-gold transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-gold transition cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
          <p className="text-gray-300 text-sm mb-4">
            Get the latest updates and offers directly in your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md border border-gray-600 bg-gray-900/40 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-gold text-black px-6 py-2 rounded-r-md hover:bg-yellow-600 transition font-semibold">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Silk & Sheen. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;