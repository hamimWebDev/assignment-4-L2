import { useNavigate } from "react-router-dom";
import { AllCategories } from "./AllCategories";
import CategoryForm from "../../Form/CategoryForm";
import { useDeleteCategoryMutation } from "../../redux/api/categoryApi";
import EditCategoryForm from "../../Form/EditCategoryFrom";

const CategoryGrid = () => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = AllCategories(); // Call the function to get categories data
  const navigate = useNavigate(); // Initialize the navigate hook

  if (typeof categories === "string") {
    return <div>{categories}</div>; // Handle loading, error, or no data cases
  }

  const handleCategoryClick = (categoryName: string) => {
    const categoryUrl = `/${categoryName.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(categoryUrl, { state: { categoryName } }); // Navigate to the category page
  };

  return (
    <div className="bg-slate-100 mt-10 pt-4 pb-2">
      <h1 className="text-center text-2xl font-bold flex justify-center items-center gap-3">
        Featured Category{" "}
        <span>
          <CategoryForm />
        </span>
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-4 p-4">
        {categories.map((category: any, index: any) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-blue-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:bg-green-500 hover:text-white"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.imgSrc}
              alt={category.name}
              className="w-20 h-20 object-cover mb-4"
            />
            <h3 className="font-bold text-center">{category.name}</h3>
            <div className="flex gap-3 justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategory(category._id);
                }}
                className="text-blue-600"
              >
                <svg
                  height="25"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="red"
                >
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <EditCategoryForm _id={category._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
