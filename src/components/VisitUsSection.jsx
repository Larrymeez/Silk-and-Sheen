// src/components/VisitUsSection.jsx
import { FiMapPin, FiClock, FiNavigation } from "react-icons/fi";

const SHOP_LAT = -1.1924826;
const SHOP_LNG = 36.8987077;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${SHOP_LAT},${SHOP_LNG}`;
const EMBED_SRC = `https://maps.google.com/maps?q=${SHOP_LAT},${SHOP_LNG}&z=16&output=embed`;

function VisitUsSection() {
  return (
    <section className="w-full bg-brandbg py-20 sm:py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
            Come See Us
          </p>
          <h2 className="font-calligraphy italic text-4xl sm:text-5xl md:text-6xl text-white">
            Visit Our Shop
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* MAP */}
          <div className="relative rounded-sm overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[380px] bg-gray-900">
            <iframe
              title="Silk & Sheen shop location"
              src={EMBED_SRC}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            <div className="flex items-start gap-4 mb-8">
              <FiMapPin className="text-gold text-xl mt-1 shrink-0" />
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Location</h3>
                <p className="text-gray-300 leading-relaxed">
                  JBC Shopping Mall, Kamiti Road
                  <br />
                  Kahawa West, Nairobi
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-10">
  <FiClock className="text-gold text-xl mt-1 shrink-0" />
  <div>
    <h3 className="text-white font-semibold text-lg mb-1">Hours</h3>
    <p className="text-gray-300 leading-relaxed">
      Monday – Saturday: 9:00 AM – 6:00 PM
      <br />
      Sunday: Closed
    </p>
  </div>
</div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 w-fit
                bg-gold text-white
                px-7 py-3.5
                rounded-md
                text-base font-medium
                transition duration-300
                hover:bg-yellow-600 hover:-translate-y-0.5
              "
            >
              <FiNavigation />
              Get Directions
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default VisitUsSection;