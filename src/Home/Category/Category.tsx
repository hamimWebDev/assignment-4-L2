// categories.ts

import { AllCategories } from "./AllCategories";


const CategoryGrid = () => {
  const handleCategoryClick = (name: string) => {
    console.log(name);
  };

  return (
    <div className="bg-slate-100 mt-10 pt-4 pb-2">
      <h1 className="text-center text-2xl font-bold">Featured Category</h1>
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-4 p-4">
        {AllCategories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-blue-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:bg-green-500 hover:text-white"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={`https://plantsbd.com/public/uploads/category/1719926095-1716791746-images.webp`}
              alt={category.name}
              className="w-20 h-20 object-cover mb-4"
            />
            <h3 className="font-bold text-center">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
