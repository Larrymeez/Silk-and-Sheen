// src/components/Navbar.jsx
import { useEffect, useState, useContext, useRef } from "react";
import logo from "../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { products } from "../data/products";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, setIsOpen, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openSearch = () => {
    setSearchOpen(true);
    // wait for input to mount before focusing
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const results =
    query.trim().length > 0
      ? products
          .filter((p) => {
            const q = query.toLowerCase();
            return (
              p.name?.toLowerCase().includes(q) ||
              p.category?.toLowerCase().includes(q) ||
              p.type?.toLowerCase().includes(q)
            );
          })
          .slice(0, 6)
      : [];

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    closeSearch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      goToProduct(results[0].id);
    }
  };

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
          <img src={logo} alt="Logo" className="w-20 md:w-24" />
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

          {/* SEARCH */}
          <div ref={searchRef} className="relative flex items-center">
            {searchOpen ? (
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="
                    w-40
                    sm:w-64
                    bg-white/95
                    text-black
                    text-sm
                    placeholder-gray-500
                    rounded-md
                    px-3
                    py-2
                    outline-none
                    focus:ring-2
                    focus:ring-gold
                  "
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="ml-2 text-white hover:text-gold transition"
                  aria-label="Close search"
                >
                  <FiX />
                </button>

                {/* RESULTS DROPDOWN */}
                {query.trim().length > 0 && (
                  <div
                    className="
                      absolute
                      top-full
                      right-0
                      mt-2
                      w-72
                      sm:w-80
                      bg-white
                      text-black
                      rounded-xl
                      shadow-xl
                      overflow-hidden
                      max-h-96
                      overflow-y-auto
                      z-50
                    "
                  >
                    {results.length > 0 ? (
                      results.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => goToProduct(product.id)}
                          className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            hover:bg-gray-100
                            transition
                            text-left
                          "
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              KSh {product.basePrice?.toLocaleString()}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-4 text-sm text-gray-500">
                        No products found.
                      </p>
                    )}
                  </div>
                )}
              </form>
            ) : (
              <FiSearch
                onClick={openSearch}
                className="cursor-pointer hover:text-gold transition"
                aria-label="Open search"
              />
            )}
          </div>

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