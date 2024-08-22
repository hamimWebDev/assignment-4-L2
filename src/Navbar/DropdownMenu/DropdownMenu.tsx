import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllCategories } from "../../Home/Category/AllCategories";

const DropdownMenu: React.FC = () => {
  const allCategories = AllCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsOpen(false); // Close dropdown after selection
    const categoryUrl = `/${categoryName.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(categoryUrl, { state: { categoryName } });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center justify-between bg-white text-gray-700  w-max hover:bg-gray-50"
        onClick={toggleDropdown}
      >
        <h1 className="font-bold ml-1">{selectedCategory}</h1>
        <svg
          className={`h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          className="absolute right-0 mt-6 w-44 border border-gray-300 rounded-md shadow-lg bg-white z-50"
          style={{ display: isOpen ? "block" : "none" }}
        >
          {allCategories.map((category: any, index: any) => (
            <li key={index}>
              <div
                onClick={() => handleSelect(category.name)}
                className={`block px-4 py-2 text-sm cursor-pointer ${
                  selectedCategory === category.name
                    ? "bg-gray-200 font-bold text-blue-600 rounded-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
