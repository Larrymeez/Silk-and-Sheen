// src/components/Footer.jsx
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-brandbg text-white py-20 px-6 md:px-20 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <img src={logo} alt="Silk & Sheen Logo" className="w-32 md:w-40" />
          <p className="text-gray-300 text-sm md:text-base">
            Premium wigs crafted for elegance, confidence, and timeless beauty. Follow us to stay inspired.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg md:text-xl font-semibold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-gray-300">
            <li className="hover:text-gold transition cursor-pointer">Home</li>
            <li className="hover:text-gold transition cursor-pointer">Shop</li>
            <li className="hover:text-gold transition cursor-pointer">Collections</li>
            <li className="hover:text-gold transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg md:text-xl font-semibold mb-6">Customer Service</h4>
          <ul className="flex flex-col gap-3 text-gray-300">
            <li className="hover:text-gold transition cursor-pointer">FAQ</li>
            <li className="hover:text-gold transition cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-gold transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-gold transition cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-lg md:text-xl font-semibold mb-6">Follow Us</h4>
          <p className="text-gray-300 text-sm md:text-base mb-4">
            Connect with us on social media for the latest updates.
          </p>
          <div className="flex items-center gap-4 text-2xl">
            <FiFacebook className="hover:text-gold transition-colors cursor-pointer" />
            <FiInstagram className="hover:text-gold transition-colors cursor-pointer" />
            <FiTwitter className="hover:text-gold transition-colors cursor-pointer" />
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-16 pt-6 text-center text-gray-500 text-sm md:text-base">
        © {new Date().getFullYear()} Silk & Sheen. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;