import React, { useState, useEffect } from "react";
import { useGetCategoryQuery } from "../redux/api/categoryApi";
import { useAddProductMutation } from "../redux/api/productApi";
import axios from "axios";

const PlantForm: React.FC = () => {
  const { data } = useGetCategoryQuery();
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

  const [addProduct] = useAddProductMutation();

  // Clean up URLs when component unmounts
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

    // Validate required fields
    const requiredFields = [
      "name",
      "category",
      "newPrice",
      "rating",
      "inStock",
      "size",
      "brand",
      "shopArea",
      "policyDays",
      "contact_whatsapp",
      "contact_phone",
    ];

    for (const field of requiredFields) {
      if (
        formData[field as keyof typeof formData] === "" ||
        formData[field as keyof typeof formData] === null
      ) {
        alert(`Please fill out the ${field.replace("_", " ")} field.`);
        return;
      }
    }

    if (formData.productImages.length < 2) {
      alert("Please upload at least 2 product images.");
      return;
    }

    // Upload images to ImageBB
    const imageUrls = await uploadImagesToImageBB(formData.productImages);

    // Construct the object to send to addProduct mutation
    const addProductData = {
      images: imageUrls,
      name: formData.name,
      category: formData.category,
      newPrice: formData.newPrice.toString(),
      oldPrice: formData.oldPrice.toString(),
      rating: formData.rating,
      inStock: formData.inStock,
      size: formData.size,
      brand: formData.brand,
      shopArea: formData.shopArea,
      policy: formData.policy,
      policyDays: formData.policyDays,
      contact_whatsapp: formData.contact_whatsapp,
      contact_phone: formData.contact_phone,
    };

    console.log("Form Data Submitted: ", addProductData);

    await addProduct(addProductData); // Send the object to the addProduct mutation

    setIsModalOpen(false);
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
        onClick={() => setIsModalOpen(true)}
        className="bg-slate-800 text-slate-100 flex items-center p-2 rounded-lg h-14"
      >
        <svg
          className="h-8 pr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
        <p className="text-">Add product</p>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900 flex justify-between">
              Add New Plant
              <button
                onClick={() => {
                  setIsModalOpen(false);
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
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="44"
                  height="44"
                  fill="currentColor"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </button>
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
              {[
                {
                  label: "Product Name",
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  label: "Category",
                  name: "category",
                  type: "select",
                  options: categories,
                  required: true,
                },
                {
                  label: "Price",
                  name: "newPrice",
                  type: "string",
                  required: true,
                },
                {
                  label: "Old Price",
                  name: "oldPrice",
                  type: "string",
                  placeholder: "Optional",
                },
                {
                  label: "Rating",
                  name: "rating",
                  type: "number",
                  min: "1",
                  max: "5",
                  required: true,
                },
                {
                  label: "Stock",
                  name: "inStock",
                  type: "number",
                  required: true,
                },
                {
                  label: "Size",
                  name: "size",
                  type: "text",
                  required: true,
                  placeholder: "1-3Fit",
                },
                { label: "Brand", name: "brand", type: "text", required: true },
                {
                  label: "Shop Area",
                  name: "shopArea",
                  type: "text",
                  required: true,
                },
                {
                  label: "Policy Days",
                  name: "policyDays",
                  type: "number",
                  required: true,
                },
                {
                  label: "Contact WhatsApp",
                  name: "contact_whatsapp",
                  type: "text",
                  required: true,
                },
                {
                  label: "Contact Phone",
                  name: "contact_phone",
                  type: "text",
                  required: true,
                },
              ].map((field) => (
                <div key={field.name} className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={
                        formData[field.name as keyof typeof formData] || ""
                      }
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-100"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option: any) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={
                        formData[field.name as keyof typeof formData] || ""
                      }
                      onChange={handleChange}
                      min={field.min}
                      max={field.max}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-100"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                      }}
                    />
                  )}
                </div>
              ))}

              <div className="form-control md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Product Images (At least 2 images)
                </label>
                <input
                  type="file"
                  name="productImages"
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  className="file-input file-input-bordered file-input-md w-full max-w-xs bg-slate-100"
                />
                <div className="mt-4 flex space-x-4">
                  {formData.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="md:col-span-2 w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-900 focus:outline-none focus:bg-slate-900"
              >
                Submit
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
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

export default PlantForm;
