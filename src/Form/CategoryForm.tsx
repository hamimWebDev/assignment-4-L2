import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAddCategoryMutation } from "../redux/api/categoryApi";

const CategoryForm: React.FC = () => {
  const [AddCategory] = useAddCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imgSrc: "",
    productImage: null as File | null,
  });

  useEffect(() => {
    return () => {
      formData.imgSrc && URL.revokeObjectURL(formData.imgSrc);
    };
  }, [formData.imgSrc]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newImageURL = file ? URL.createObjectURL(file) : "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      productImage: file,
      imgSrc: newImageURL,
    }));
  };

  const uploadImageToImageBB = async (file: File): Promise<string | null> => {
    const imageBBApiKey = "3ab9a41a4be5e04b88403d171ce271e6";
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name === "" || formData.imgSrc === "") {
      alert("Please fill out all required fields.");
      return;
    }

    if (!formData.productImage) {
      alert("Please upload a product image.");
      return;
    }

    const imageUrl = await uploadImageToImageBB(formData.productImage);

    if (imageUrl) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        imgSrc: imageUrl,
      }));

      const addCategoryData = {
        name: formData.name,
        imgSrc: imageUrl,
      };

      console.log("Form Data Submitted: ", addCategoryData);
      AddCategory(addCategoryData);
      setIsModalOpen(false);
      setFormData({
        name: "",
        imgSrc: "",
        productImage: null,
      });
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-slate-800 text-slate-100 p-3 rounded-lg shadow-md hover:bg-slate-700 transition-all duration-300"
      >
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 48-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0 0-48z" />
          </svg>
        </div>
        <p className="text-center text-xs">Add Category</p>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900 flex justify-between items-center">
              Add New Category
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded hover:bg-gray-200 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </button>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label
                  htmlFor="name"
                  className="text-start text-lg font-medium"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-100"
                />
              </div>
              <div className="form-control">
                <label
                  htmlFor="productImage"
                  className="text-start text-lg font-medium"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  name="productImage"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                  className="file-input file-input-bordered file-input-md w-full max-w-xs bg-slate-100 mt-2"
                />
                <div className="mt-4 flex space-x-4">
                  {formData.imgSrc && (
                    <img
                      src={formData.imgSrc}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded shadow-md"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-800 text-white py-3 px-4 rounded-md hover:bg-slate-900 focus:outline-none focus:bg-slate-900 transition-all duration-300"
              >
                Submit
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 p-2 rounded hover:bg-gray-200 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
