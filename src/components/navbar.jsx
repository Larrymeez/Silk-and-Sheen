// src/components/Navbar.jsx
import { useEffect, useState, useContext, useRef } from "react";
import logo from "../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser, FiX, FiMenu, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { products } from "../data/products";

const collectionLinks = [
  { to: "/bundles", label: "Bundles" },
  { to: "/frontals-closures", label: "Frontals & Closures" },
  { to: "/glueless-wigs", label: "Glueless Lace Wigs" },
  { to: "/part-wigs", label: "Part Wigs" },
  { to: "/clip-ins", label: "Clip-ins" },
  { to: "/braiding-hair", label: "Braiding Hair" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, setIsOpen, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu or mobile search is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, searchOpen]);

  const openSearch = () => {
    setMobileMenuOpen(false);
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileCollectionsOpen(false);
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
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-brandbg/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={closeMobileMenu}>
            <img src={logo} alt="Logo" className="w-14 sm:w-20 md:w-24" />
            <span className="text-base sm:text-xl md:text-2xl font-bold tracking-widest text-white">
              SILK & SHEEN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide text-white font-semibold">
            <li><Link className="hover:text-gold transition font-semibold" to="/">Home</Link></li>
            <li><Link className="hover:text-gold transition font-semibold" to="/">Shop</Link></li>
            <li className="relative group cursor-pointer">
              <span className="hover:text-gold transition font-semibold">Collections</span>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                <div className="bg-white text-black rounded-xl shadow-xl w-64 py-4">
                  <ul className="flex flex-col">
                    {collectionLinks.map((link) => (
                      <li key={link.to} className="px-6 py-2 hover:bg-gray-100">
                        <Link to={link.to}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li><Link className="hover:text-gold transition font-semibold" to="/contact">Contact</Link></li>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6 text-lg sm:text-xl text-white">

            {/* SEARCH — desktop inline */}
            <div ref={searchRef} className="relative hidden md:flex items-center">
              {searchOpen ? (
                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-64 bg-white/95 text-black text-sm placeholder-gray-500 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gold"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="ml-2 text-white hover:text-gold transition"
                    aria-label="Close search"
                  >
                    <FiX />
                  </button>

                  {query.trim().length > 0 && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white text-black rounded-xl shadow-xl overflow-hidden max-h-96 overflow-y-auto z-50">
                      {results.length > 0 ? (
                        results.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => goToProduct(product.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                          >
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{product.name}</p>
                              <p className="text-xs text-gray-500">KSh {product.basePrice?.toLocaleString()}</p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-4 text-sm text-gray-500">No products found.</p>
                      )}
                    </div>
                  )}
                </form>
              ) : (
                <FiSearch onClick={openSearch} className="cursor-pointer hover:text-gold transition" aria-label="Open search" />
              )}
            </div>

            {/* SEARCH — mobile icon only, opens overlay */}
            <FiSearch
              onClick={openSearch}
              className="cursor-pointer hover:text-gold transition md:hidden"
              aria-label="Open search"
            />

            <FiUser className="cursor-pointer hover:text-gold transition hidden sm:block" />

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

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden cursor-pointer hover:text-gold transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brandbg/98 backdrop-blur-md pt-20 px-6 overflow-y-auto md:hidden">
          <ul className="flex flex-col gap-1 text-white text-lg font-semibold">
            <li className="border-b border-white/10">
              <Link to="/" onClick={closeMobileMenu} className="block py-4">Home</Link>
            </li>
            <li className="border-b border-white/10">
              <Link to="/" onClick={closeMobileMenu} className="block py-4">Shop</Link>
            </li>

            {/* Collections accordion */}
            <li className="border-b border-white/10">
              <button
                onClick={() => setMobileCollectionsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-4"
              >
                <span>Collections</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${mobileCollectionsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileCollectionsOpen && (
                <ul className="pb-3 pl-4 flex flex-col gap-1 text-base font-normal text-gray-300">
                  {collectionLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} onClick={closeMobileMenu} className="block py-2.5 hover:text-gold transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="border-b border-white/10">
              <Link to="/contact" onClick={closeMobileMenu} className="block py-4">Contact</Link>
            </li>
          </ul>
        </div>
      )}

      {/* MOBILE SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-brandbg/98 backdrop-blur-md pt-20 px-4 sm:px-6 md:hidden">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-4">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-white/95 text-black text-base placeholder-gray-500 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
            />
            <button type="button" onClick={closeSearch} className="text-white text-2xl" aria-label="Close search">
              <FiX />
            </button>
          </form>

          {query.trim().length > 0 && (
            <div className="flex flex-col gap-2">
              {results.length > 0 ? (
                results.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goToProduct(product.id)}
                    className="w-full flex items-center gap-4 bg-white/95 text-black rounded-xl px-4 py-3 text-left"
                  >
                    <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-md flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">KSh {product.basePrice?.toLocaleString()}</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-400 text-sm px-1">No products found.</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;