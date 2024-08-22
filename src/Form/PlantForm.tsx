import React, { useState, useEffect } from "react";
import { useGetCategoryQuery } from "../redux/api/categoryApi";
import { useAddProductMutation } from "../redux/api/productApi";
import axios from "axios";

const PlantForm: React.FC = () => {
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

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Plant Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Plant Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category: any) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    New Price
                  </label>
                  <input
                    type="number"
                    name="newPrice"
                    value={formData.newPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="New Price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Old Price
                  </label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Old Price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Rating"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="inStock"
                    value={formData.inStock || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Stock Quantity"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Size"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Brand"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Shop Area
                  </label>
                  <input
                    type="text"
                    name="shopArea"
                    value={formData.shopArea}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Shop Area"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Return Policy Days
                  </label>
                  <input
                    type="number"
                    name="policyDays"
                    value={formData.policyDays || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Return Policy Days"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    WhatsApp Contact
                  </label>
                  <input
                    type="text"
                    name="contact_whatsapp"
                    value={formData.contact_whatsapp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="WhatsApp Contact"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Contact
                  </label>
                  <input
                    type="text"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    placeholder="Phone Contact"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Product Images
                  </label>
                  <input
                    type="file"
                    name="productImages"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100"
                    required
                  />
                </div>

                {formData.images.length > 0 && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Preview
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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

export default PlantForm;
