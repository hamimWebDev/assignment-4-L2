import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUpdateCategoryMutation } from "../redux/api/categoryApi";

interface EditCategoryFormProps {
  _id: string;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ _id }) => {
  const [updateCategory, { isLoading, error }] = useUpdateCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imgSrc: "",
    productImage: null as File | null,
  });

  useEffect(() => {
    return () => {
      // Clean up the URL object to avoid memory leaks
      if (formData.imgSrc) {
        URL.revokeObjectURL(formData.imgSrc);
      }
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

    const updateCategoryData: {
      name?: string;
      imgSrc?: string;
    } = {};

    if (formData.productImage) {
      const imageUrl = await uploadImageToImageBB(formData.productImage);

      if (imageUrl) {
        updateCategoryData.imgSrc = imageUrl;
      }
    }

    if (formData.name) {
      updateCategoryData.name = formData.name;
    }

    if (Object.keys(updateCategoryData).length === 0) {
      return;
    }

    try {
      const UpdateData = { _id, ...updateCategoryData };
      await updateCategory(UpdateData);
      setIsModalOpen(false);
      setFormData({
        name: "",
        imgSrc: "",
        productImage: null,
      });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className=""
      >
        <svg
          height="25"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="blue"
        >
          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900 flex justify-between items-center">
              Edit Category
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
                  accept="image/*"
                  name="productImage"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {formData.imgSrc && (
                <img
                  src={formData.imgSrc}
                  alt="Selected"
                  className="max-h-60 mt-4"
                />
              )}

              <div className="form-control">
                <button
                  type="submit"
                  className={`${
                    isLoading ? "opacity-50" : ""
                  } w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm`}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Category"}
                </button>
              </div>
              {error && (
                <div className="text-red-600 text-sm mt-2">
                  {JSON.stringify(error)}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategoryForm;
