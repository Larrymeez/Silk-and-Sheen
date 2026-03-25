// src/components/Navbar.jsx
import { useEffect, useState, useContext } from "react";
import logo from "../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, setIsOpen, cartItems } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brandbg/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img src={logo} alt="Logo" className="w-20 md:w-24" /> {/* Slightly larger */}
          <span className="text-xl md:text-2xl font-bold tracking-widest text-white">
            SILK & SHEEN
          </span>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide text-white font-semibold">
          <li><Link className="hover:text-gold transition font-semibold" to="/">Home</Link></li>
          <li><Link className="hover:text-gold transition font-semibold" to="/">Shop</Link></li>
          <li className="relative group cursor-pointer">
            <span className="hover:text-gold transition font-semibold">Collections</span>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
              <div className="bg-white text-black rounded-xl shadow-xl w-64 py-4">
                <ul className="flex flex-col">
                  <li className="px-6 py-2 hover:bg-gray-100"><Link to="/bundles">Bundles</Link></li>
                  <li className="px-6 py-2 hover:bg-gray-100"><Link to="/frontals-closures">Frontals & Closures</Link></li>
                  <li className="px-6 py-2 hover:bg-gray-100"><Link to="/glueless-wigs">Glueless Lace Wigs</Link></li>
                  <li className="px-6 py-2 hover:bg-gray-100"><Link to="/part-wigs">Part Wigs</Link></li>
                  <li className="px-6 py-2 hover:bg-gray-100"><Link to="/clip-ins">Clip-ins</Link></li>
                  <li className="px-6 py-2 hover:bg-gray-100"><Link to="/braiding-hair">Braiding Hair</Link></li>
                </ul>
              </div>
            </div>
          </li>
          <li><Link className="hover:text-gold transition font-semibold" to="/contact">Contact</Link></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6 text-xl text-white">
          <FiSearch className="cursor-pointer hover:text-gold transition" />
          <FiUser className="cursor-pointer hover:text-gold transition" />

          {/* Shopping Cart */}
          <div className="relative">
            <FiShoppingCart
              className="cursor-pointer hover:text-gold transition"
              onClick={() => setIsOpen(!isOpen)}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;