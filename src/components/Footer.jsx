// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import logo from "../assets/logo.png";

const SHOP_LAT = -1.1924826;
const SHOP_LNG = 36.8987077;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${SHOP_LAT},${SHOP_LNG}`;

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/" },
  { label: "Collections", to: "/" },
  { label: "Contact", to: "/contact" },
];

const policyLinks = [
  "FAQ",
  "Shipping & Returns",
  "Privacy Policy",
  "Terms of Service",
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/silk_n_sheenwigs/",
    Icon: FaInstagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@silknsheen",
    Icon: FaTiktok,
  },
];

function Footer() {
  return (
    <footer className="bg-brandbg text-white pt-16 sm:pt-20 pb-10 px-6 md:px-16 lg:px-20 mt-24">
      <div className="max-w-7xl mx-auto">

        {/* Signature hairline — echoes the Quick Shop filament */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-14 sm:mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">

          {/* Logo & About */}
          <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
            <img src={logo} alt="Silk & Sheen" className="w-28 md:w-32 object-contain" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium wigs crafted for elegance, confidence, and timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-3">
              {policyLinks.map((label) => (
                <li key={label} className="text-gray-500 cursor-default">
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Follow */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">
              Get In Touch
            </h4>

            <a
              href="tel:+254705250810"
              className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors mb-4"
            >
              <FiPhone className="text-lg shrink-0" />
              <span>0705 250 810</span>
            </a>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors mb-6"
            >
              <FiMapPin className="text-lg shrink-0" />
              <span>JBC Mall, Kamiti Rd</span>
            </a>

            <div className="flex items-center gap-5 text-xl">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Silk & Sheen. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;