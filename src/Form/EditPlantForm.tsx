import React, { useState, useEffect } from "react";
import { useGetCategoryQuery } from "../redux/api/categoryApi";
import axios from "axios";
import { useUpdateProductMutation } from "../redux/api/productApi";

interface EditPlantFormProps {
  _id: string;
}

const EditPlantForm: React.FC<EditPlantFormProps> = ({ _id }) => {
  const { data } = useGetCategoryQuery(undefined);
  const categories = data?.data.map((item: any) => item.name) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    newPrice: "",
    oldPrice: "",
    rating: null as number | null,
    inStock: null as number | null,
    size: "",
    brand: "",
    shopArea: "",
    policy: "return",
    policyDays: null as number | null,
    contact_whatsapp: "",
    contact_phone: "",
    images: [] as string[],
    productImages: [] as File[],
  });

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    return () => {
      formData.images.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "rating" ||
        name === "inStock" ||
        name === "newPrice" ||
        name === "oldPrice" ||
        name === "policyDays"
          ? parseFloat(value) || null
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));

    setFormData((prevFormData) => ({
      ...prevFormData,
      productImages: [...prevFormData.productImages, ...files],
      images: [...prevFormData.images, ...newImageURLs],
    }));
  };

  const uploadImagesToImageBB = async (files: File[]): Promise<string[]> => {
    const imageBBApiKey = "3ab9a41a4be5e04b88403d171ce271e6"; // Replace with your ImageBB API key
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("image", file);

      return axios
        .post(`https://api.imgbb.com/1/upload?key=${imageBBApiKey}`, formData)
        .then((response) => response.data.data.url)
        .catch((error) => {
          console.error("Image upload failed:", error);
          return null;
        });
    });

    const urls = await Promise.all(uploadPromises);
    return urls.filter((url): url is string => url !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least 2 images are uploaded
    if (
      formData.productImages.length < 2 &&
      formData.productImages.length > 0
    ) {
      alert("Please upload at least 2 product images.");
      return;
    }

    // Upload images to ImageBB
    const imageUrls = await uploadImagesToImageBB(formData.productImages);

    // Construct the object to send to updateProduct mutation
    const updatedProductData: {
      name?: string;
      category?: string;
      newPrice?: string;
      oldPrice?: string;
      rating?: number | null;
      inStock?: number | null;
      size?: string;
      brand?: string;
      shopArea?: string;
      policy?: string;
      policyDays?: number | null;
      contact_whatsapp?: string;
      contact_phone?: string;
      images?: string[];
    } = {};

    // Conditionally populate the object
    if (formData.name) updatedProductData.name = formData.name;
    if (formData.category) updatedProductData.category = formData.category;
    if (formData.newPrice) updatedProductData.newPrice = formData.newPrice;
    if (formData.oldPrice) updatedProductData.oldPrice = formData.oldPrice;
    if (formData.rating !== null) updatedProductData.rating = formData.rating;
    if (formData.inStock !== null)
      updatedProductData.inStock = formData.inStock;
    if (formData.size) updatedProductData.size = formData.size;
    if (formData.brand) updatedProductData.brand = formData.brand;
    if (formData.shopArea) updatedProductData.shopArea = formData.shopArea;
    if (formData.policyDays !== null)
      updatedProductData.policyDays = formData.policyDays;
    if (formData.contact_whatsapp)
      updatedProductData.contact_whatsapp = formData.contact_whatsapp;
    if (formData.contact_phone)
      updatedProductData.contact_phone = formData.contact_phone;
    if (imageUrls.length > 0) updatedProductData.images = imageUrls;

    console.log(updatedProductData);
    await updateProduct({ _id, ...updatedProductData });

    handleReset();
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      newPrice: "",
      oldPrice: "",
      rating: null,
      inStock: null,
      size: "",
      brand: "",
      shopArea: "",
      policy: "return",
      policyDays: null,
      contact_whatsapp: "",
      contact_phone: "",
      images: [],
      productImages: [],
    });
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className="flex items-center justify-center bg-blue-500 text-white p-2 rounded"
      >
        <svg
          height="25"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="white"
        >
          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900 flex justify-between">
              Edit Plant
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Close"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Add fields for form inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category: any) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">New Price</label>
                  <input
                    type="number"
                    name="newPrice"
                    value={formData.newPrice}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Old Price</label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating ?? ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">In Stock</label>
                  <input
                    type="number"
                    name="inStock"
                    value={formData.inStock ?? ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Shop Area</label>
                  <input
                    type="text"
                    name="shopArea"
                    value={formData.shopArea}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Policy Days</label>
                  <input
                    type="number"
                    name="policyDays"
                    value={formData.policyDays ?? ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Contact WhatsApp
                  </label>
                  <input
                    type="text"
                    name="contact_whatsapp"
                    value={formData.contact_whatsapp}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Contact Phone</label>
                  <input
                    type="text"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700">Product Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block mt-1"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 p-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPlantForm;
