import logo from "../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="w-full bg-brandbg text-white px-6 md:px-20 py-4 flex items-center justify-between sticky top-0 z-50">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Silk & Sheen Logo" className="w-10" />
        <span className="text-xl font-semibold tracking-wider">
          SILK & SHEEN
        </span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-10 text-sm tracking-wide">
        <li className="cursor-pointer hover:text-gold transition">
          Home
        </li>
        <li className="cursor-pointer hover:text-gold transition">
          Shop
        </li>
        <li className="cursor-pointer hover:text-gold transition">
          Collections
        </li>
        <li className="cursor-pointer hover:text-gold transition">
          Contact
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6 text-xl">
        <FiSearch className="cursor-pointer hover:text-gold transition" />
        <FiUser className="cursor-pointer hover:text-gold transition" />
        <FiShoppingCart className="cursor-pointer hover:text-gold transition" />
      </div>

    </nav>
  );
}

export default Navbar;