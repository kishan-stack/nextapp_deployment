"use client"
import { useEffect, useState } from "react";
import { ChevronDown,ChevronUp } from "lucide-react";
export default function ToggleCard() {
  const [isDown, setIsDown] = useState(false); // Card starts "up" in desktop view.

  // Set initial state based on screen width
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Tailwind's `md` breakpoint
      setIsDown(isMobile);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle the card's position
  const toggleCard = () => {
    setIsDown((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Card */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out 
          ${isDown ? "translate-y-0" : "translate-y-[70%] md:translate-y-0 md:translate-y-[70%]"} 
          md:w-[30rem] md:bottom-0 md:right-5`}
      >
        {/* Chevron Toggle */}
        <div className="flex justify-center items-center bg-gray-200 py-2 cursor-pointer" onClick={toggleCard}>
          {isDown ? (
            <ChevronUp className="h-6 w-6 text-gray-600" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-600" />
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">Toggleable Card</h2>
          <p className="text-sm text-gray-600">
            This card slides up and down based on the chevron toggle. It adapts
            to screen sizes for mobile and desktop views.
          </p>
        </div>
      </div>
    </div>
  );
}
