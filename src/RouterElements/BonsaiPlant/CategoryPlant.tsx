import { useLocation, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/productApi";
import { useEffect, useState } from "react";
import { Product } from "../../Home/Products/ProductGrid";
import { ProductCard } from "../../Home/Products/ProductCard";

const CategoryPlant = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const CategoryName = location.state?.categoryName;
  const { data, isLoading } = useGetProductQuery(CategoryName);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No data found</div>;
  }

  const products: Product[] = data.data;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-3 bg-blue-800 mt-3">
        <div className="bg-green-400 p-2 pr-10 ml-3 rounded-tr-full">
          <h1 className="text-2xl text-gray-100 font-bold">{CategoryName}</h1>
        </div>
        <div className="text-gray-100 flex items-center mr-3">
          <h1 className="text-base lg:text-2xl">Available now:</h1>
          <div className="lg:text-2xl bg-green-400 p-1 rounded-md ml-1">
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

export default CategoryPlant;
