import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

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
          <img src={logo} alt="Logo" className="w-16" />
          <span
            className={`text-xl md:text-2xl font-semibold tracking-widest transition ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            SILK & SHEEN
          </span>
        </Link>

        {/* Navigation */}
        <ul
          className={`hidden md:flex items-center gap-10 text-sm tracking-wide transition ${
            scrolled ? "text-white" : "text-white"
          }`}
        >
          <li>
            <Link className="hover:text-gold transition" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="hover:text-gold transition" to="/">
              Shop
            </Link>
          </li>

          {/* Collections */}
          <li className="relative group cursor-pointer">
            <span className="hover:text-gold transition">
              Collections
            </span>

            {/* Dropdown */}
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
              <div className="bg-white text-black rounded-xl shadow-xl w-64 py-4">
                <ul className="flex flex-col">

                  <li className="px-6 py-2 hover:bg-gray-100">
                    <Link to="/bundles">Bundles</Link>
                  </li>

                  <li className="px-6 py-2 hover:bg-gray-100">
                    <Link to="/frontals-closures">Frontals & Closures</Link>
                  </li>

                  <li className="px-6 py-2 hover:bg-gray-100">
                    <Link to="/glueless-wigs">Glueless Lace Wigs</Link>
                  </li>

                  <li className="px-6 py-2 hover:bg-gray-100">
                    <Link to="/part-wigs">Part Wigs</Link>
                  </li>

                  <li className="px-6 py-2 hover:bg-gray-100">
                    <Link to="/clip-ins">Clip-ins</Link>
                  </li>

                  <li className="px-6 py-2 hover:bg-gray-100">
                    <Link to="/braiding-hair">Braiding Hair</Link>
                  </li>

                </ul>
              </div>
            </div>
          </li>

          <li>
            <Link className="hover:text-gold transition" to="/contact">
              Contact
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div
          className={`flex items-center gap-6 text-xl transition ${
            scrolled ? "text-white" : "text-white"
          }`}
        >
          <FiSearch className="cursor-pointer hover:text-gold transition" />
          <FiUser className="cursor-pointer hover:text-gold transition" />
          <FiShoppingCart className="cursor-pointer hover:text-gold transition" />
        </div>

      </div>
    </nav>
  );
}

export default Navbar;