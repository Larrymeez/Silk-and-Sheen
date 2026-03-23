import { Link } from "react-router-dom";

const categories = [
  {
    name: "Bundles",
    image: "/src/assets/bundles1.jpg",
    path: "/bundles",
  },
  {
    name: "Frontals & Closures",
    image: "/src/assets/frontal1.jpg",
    path: "/frontals-closures",
  },
  {
    name: "Glueless Lace Wigs",
    image: "/src/assets/glueless1.jpg",
    path: "/glueless-wigs",
  },
  {
    name: "Part Wigs",
    image: "/src/assets/part3.jpg",
    path: "/part-wigs",
  },
  {
    name: "Clip-ins",
    image: "/src/assets/clipins3.jpg",
    path: "/clip-ins",
  },
  {
    name: "Braiding Hair",
    image: "/src/assets/braiding1.jpg",
    path: "/braiding-hair",
  },
];

function CollectionsSection() {
  return (
    <section className="py-24 px-6 md:px-20 bg-brandbg text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-wide">
          Our Collections
        </h2>
        <p className="text-gray-300 mt-3">
          Browse by category and find your perfect look
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {categories.map((cat, index) => (
          <Link
            to={cat.path}
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Background Image */}
            <div className="h-64 sm:h-72 lg:h-80 w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
                {cat.name}
              </h3>
              <button className="bg-gold text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition">
                View More
              </button>
            </div>

            {/* Bottom Label */}
            <div className="absolute bottom-4 left-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-lg">
              {cat.name}
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}

export default CollectionsSection;