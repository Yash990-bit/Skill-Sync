import React, { useRef, useState, useEffect } from "react";
import Guide1 from "../assets/start.webp";
import Guide2 from "../assets/idea.webp";
import Guide3 from "../assets/use.webp";
import Guide4 from "../assets/utile.webp";
import Guide5 from "../assets/idea.webp";
import Guide6 from "../assets/book.webp";

export default function GuidesSlider() {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const guides = [
    { image: Guide1, title: "Start a side business" },
    { image: Guide2, title: "Ecommerce business ideas" },
    { image: Guide3, title: "Start an online business" },
    { image: Guide4, title: "Freelancing tips for beginners" },
    { image: Guide5, title: "How to find clients effectively" },
    { image: Guide6, title: "Create a logo for business" },
  ];

  const checkScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    setShowLeft(container.scrollLeft > 0);
    setShowRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (dir) => {
    const container = containerRef.current;
    const scrollAmount = dir === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    container.addEventListener("scroll", checkScroll);
    return () => container.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="relative bg-blue-100 py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto bg-blue-50 rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Guides to help you grow
          </h2>
        </div>

        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full hover:bg-black transition-all duration-300 z-10"
          >
            ◀
          </button>
        )}

        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full hover:bg-black transition-all duration-300 z-10"
          >
            ▶
          </button>
        )}

        <div
          ref={containerRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {guides.map((guide, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover"
              />
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                  {guide.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
