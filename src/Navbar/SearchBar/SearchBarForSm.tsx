import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBarForSm = () => {
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState([]);

  const fetchData = async (value: string) => {
    try {
      const response = await fetch(
        "https://assignment-4-l2-backend.vercel.app/api/product"
      );
      const json = await response.json();

      console.log("API Response:", json); // Log the API response

      // If the response is an object with a 'data' key or similar, adjust accordingly
      const data = Array.isArray(json) ? json : json.data || [];

      const filteredResults = data.filter(
        (product: any) =>
          value &&
          product &&
          product.name &&
          product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResult(filteredResults);
      setIsOpen(filteredResults.length > 0); // Open dropdown only if there are results
      console.log("Filtered Results:", filteredResults);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsOpen(false); // Close dropdown on error
    }
  };
  const navigate = useNavigate();
  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };
  const handleSelect = (product: any) => {
    navigate(`/product/${product._id}`, { state: { product } });
    setIsOpen(false);
    setInput("");
  };
  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-300 rounded-xl w-full ">
        <input
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          placeholder="Search"
          className="px-2 py-1 sm:px-3 sm:py-2 w-full focus:outline-none text-black bg-gray-100 rounded-l-xl"
        />
        <div className="flex items-center relative border-l-2 border-gray-300">
          <button className="px-2 sm:px-3 bg-green-500 h-8 sm:h-9 md:h-10 flex items-center justify-center rounded-r-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && result.length > 0 && (
        <ul className="absolute right-0 mt-2 w-full border border-gray-300 rounded-md shadow-lg bg-white z-50">
          {result.map((product: any) => (
            <li key={product.id}>
              <div
                onClick={() => handleSelect(product)}
                className="block px-4 py-2 text-sm cursor-pointer"
              >
                {product.name.length > 7
                  ? `${product.name.substring(0, 18)}...`
                  : product.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarForSm;
