import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";

// Define a type for the product
export interface Product {
  _id: string;
  images: string[];
  name: string;
  category: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  inStock: number;
  size: string;
  brand: string;
  shopArea: string;
  policy: string;
  PolicyDays: number;
  contact_whatsapp: string;
  contact_phone: string;
}

// Assume this is your list of products
const products: Product[] = [
  {
    _id: "64db5ba13f52e1a439b3e4d1",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(4).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(5).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(6).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(7).jpeg",
    ],
    name: "ভিয়েতনাম নারিকেল চারা",
    category: "Bonsai Plant",
    oldPrice: "৳3000",
    newPrice: "৳2200",
    rating: 3,
    inStock: 12,
    size: "2-3fit",
    brand: "PlantsBD",
    shopArea: "Barishal, Uzirpur, Jugihaty",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01767****55",
    contact_phone: "01767****55",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d2",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "মেক্সিকান ক্যালেন্ডুলা",
    category: "Flower Plants",
    oldPrice: "৳3500",
    newPrice: "৳2700",
    rating: 4,
    inStock: 8,
    size: "1-2fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Mirpur",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01768****66",
    contact_phone: "01768****66",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d3",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "জাপানি পাইন",
    category: "Woody Plants",
    oldPrice: "৳5000",
    newPrice: "৳3800",
    rating: 5,
    inStock: 5,
    size: "3-4fit",
    brand: "PlantsBD",
    shopArea: "Chattogram, Agrabad",
    policy: "return",
    PolicyDays: 15,
    contact_whatsapp: "01769****77",
    contact_phone: "01769****77",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d4",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "ভারতীয় টমেটো",
    category: "Fruit Plants",
    oldPrice: "৳1200",
    newPrice: "৳900",
    rating: 4,
    inStock: 20,
    size: "1fit",
    brand: "PlantsBD",
    shopArea: "Sylhet, Jaflong",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01770****88",
    contact_phone: "01770****88",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d5",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "বৃক্ষচাপা",
    category: "Herbal Plants",
    oldPrice: "৳2500",
    newPrice: "৳1900",
    rating: 3,
    inStock: 15,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Rajshahi, Bogura",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01771****99",
    contact_phone: "01771****99",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d6",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "লেবু গাছ",
    category: "Fruit Plants",
    oldPrice: "৳1500",
    newPrice: "৳1200",
    rating: 4,
    inStock: 25,
    size: "1-2fit",
    brand: "PlantsBD",
    shopArea: "Khulna, Jessore",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01772****00",
    contact_phone: "01772****00",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d7",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "সারস পাতা",
    category: "Outdoor Plants",
    oldPrice: "৳2000",
    newPrice: "৳1500",
    rating: 4,
    inStock: 10,
    size: "3fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Dhanmondi",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01773****11",
    contact_phone: "01773****11",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d8",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "রোজের চারা",
    category: "Flower Plants",
    oldPrice: "৳3000",
    newPrice: "৳2400",
    rating: 5,
    inStock: 18,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Rajshahi, Puthia",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01774****22",
    contact_phone: "01774****22",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d9",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "শীতকালীন ফুল",
    category: "Flower Plants",
    oldPrice: "৳1800",
    newPrice: "৳1400",
    rating: 3,
    inStock: 30,
    size: "1fit",
    brand: "PlantsBD",
    shopArea: "Khulna, Satkhira",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01775****33",
    contact_phone: "01775****33",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d10",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "মরিচ গাছ",
    category: "Fruit Plants",
    oldPrice: "৳1200",
    newPrice: "৳900",
    rating: 4,
    inStock: 22,
    size: "1fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Tejgaon",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01776****44",
    contact_phone: "01776****44",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d11",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "গোলাপ গাছ",
    category: "Flower Plants",
    oldPrice: "৳2500",
    newPrice: "৳1900",
    rating: 5,
    inStock: 10,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Sylhet, Sylhet",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01777****55",
    contact_phone: "01777****55",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d12",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "অর্কিড",
    category: "Flower Plants",
    oldPrice: "৳2000",
    newPrice: "৳1600",
    rating: 4,
    inStock: 14,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Banani",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01778****66",
    contact_phone: "01778****66",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d13",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "পাম গাছ",
    category: "Outdoor Plants",
    oldPrice: "৳1800",
    newPrice: "৳1400",
    rating: 3,
    inStock: 12,
    size: "3fit",
    brand: "PlantsBD",
    shopArea: "Chattogram, Halishahar",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01779****77",
    contact_phone: "01779****77",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d14",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "বনসাই গাছ",
    category: "Bonsai Plant",
    oldPrice: "৳4000",
    newPrice: "৳3200",
    rating: 4,
    inStock: 8,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Uttara",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01780****88",
    contact_phone: "01780****88",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d15",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "ইউক্যালিপটাস",
    category: "Woody Plants",
    oldPrice: "৳4500",
    newPrice: "৳3600",
    rating: 5,
    inStock: 6,
    size: "4fit",
    brand: "PlantsBD",
    shopArea: "Sylhet, Zakiganj",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01781****99",
    contact_phone: "01781****99",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d16",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "জলপাই গাছ",
    category: "Fruit Plants",
    oldPrice: "৳2500",
    newPrice: "৳1900",
    rating: 4,
    inStock: 9,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Khulna, Meherpur",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01782****00",
    contact_phone: "01782****00",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d17",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "নীল বেল",
    category: "Flower Plants",
    oldPrice: "৳2200",
    newPrice: "৳1800",
    rating: 3,
    inStock: 13,
    size: "1fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Chittagong",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01783****11",
    contact_phone: "01783****11",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d18",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "মেহেদি গাছ",
    category: "Herbal Plants",
    oldPrice: "৳2700",
    newPrice: "৳2100",
    rating: 4,
    inStock: 11,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Sylhet, Jaintiapur",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01784****22",
    contact_phone: "01784****22",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d19",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "জয়ফল গাছ",
    category: "Herbal Plants",
    oldPrice: "৳2000",
    newPrice: "৳1600",
    rating: 3,
    inStock: 14,
    size: "1fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Gabtali",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01785****33",
    contact_phone: "01785****33",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d20",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "নগদ গাছ",
    category: "Outdoor Plants",
    oldPrice: "৳2400",
    newPrice: "৳1900",
    rating: 4,
    inStock: 9,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Chattogram, Lalkhan Bazar",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01786****44",
    contact_phone: "01786****44",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d21",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "শাল গাছ",
    category: "Woody Plants",
    oldPrice: "৳3500",
    newPrice: "৳2900",
    rating: 5,
    inStock: 7,
    size: "3fit",
    brand: "PlantsBD",
    shopArea: "Dhaka, Gulshan",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01787****55",
    contact_phone: "01787****55",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d22",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "অর্কিড গাছ",
    category: "Flower Plants",
    oldPrice: "৳2700",
    newPrice: "৳2100",
    rating: 4,
    inStock: 6,
    size: "1fit",
    brand: "PlantsBD",
    shopArea: "Chattogram, Korangi",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01788****66",
    contact_phone: "01788****66",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d23",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "পেটুনিয়া",
    category: "Flower Plants",
    oldPrice: "৳2200",
    newPrice: "৳1800",
    rating: 3,
    inStock: 11,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Khulna, Jashore",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01789****77",
    contact_phone: "01789****77",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d24",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "ওয়াশিংটনিয়া",
    category: "Outdoor Plants",
    oldPrice: "৳3500",
    newPrice: "৳2900",
    rating: 5,
    inStock: 5,
    size: "4fit",
    brand: "PlantsBD",
    shopArea: "Chattogram, Bandar",
    policy: "return",
    PolicyDays: 10,
    contact_whatsapp: "01790****88",
    contact_phone: "01790****88",
  },
  {
    _id: "64db5ba13f52e1a439b3e4d25",
    images: [
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
      "https://plantsbd.com/public/uploads/product/1720344423-images-(3).jpeg",
    ],
    name: "জাট্রোপা",
    category: "Outdoor Plants",
    oldPrice: "৳2200",
    newPrice: "৳1800",
    rating: 3,
    inStock: 13,
    size: "2fit",
    brand: "PlantsBD",
    shopArea: "Sylhet, Moulvibazar",
    policy: "return",
    PolicyDays: 7,
    contact_whatsapp: "01791****99",
    contact_phone: "01791****99",
  },
];

const ProductGrid: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-3 bg-blue-800 mt-3">
        <div className="bg-green-400 p-2 pr-10 ml-3 rounded-tr-full">
          <h1 className="text-2xl text-gray-100 font-bold">All Plants</h1>
        </div>
        <div className="text-gray-100 flex items-center mr-3">
          <h1 className="text-xl lg:text-2xl">Available now:</h1>
          <div className="text-2xl bg-green-400 p-1 rounded-md ml-1">
            {products.length}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-6 p-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`mx-1 px-3 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`mx-1 px-3 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
