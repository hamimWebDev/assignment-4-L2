import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsCarousel from "./DetailsCarousel";
import Counter from "./Counter";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cartSlice";

interface Product {
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
  policyDays: number;
  contact_whatsapp: string;
  contact_phone: string;
}

const ProductDetails: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const navigate = useNavigate(); // Move useNavigate to the top of the component
  const dispatch = useAppDispatch(); // Move useAppDispatch to the top of the component

  const product: Product | undefined = location.state?.product;

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleOrderClick = () => {
    dispatch(addToCart(product));
    navigate(`/customer/checkout`);
  };

  const handleAddCartClick = (product: Product) => {
    dispatch(addToCart(product));
  };
  console.log(product);
  return (
    <div className="container mx-auto p-6 pt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
        <DetailsCarousel key={product._id} product={product} />

        <div className="w-full lg:w-[700px] h-auto mx-auto bg-gray-100 lg:border-2 lg:rounded-md p-5">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="flex gap-2 items-center pt-3">
            <h1 className="line-through text-gray-400 text-xl font-bold">
              {product.oldPrice}
            </h1>
            <h1 className="text-2xl font-bold">{product.newPrice}</h1>
            <p className="text-sm font-bold">{product.inStock} in stock</p>
          </div>
          <div className="flex items-center pt-2 text-2xl">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={
                  index < product.rating ? "text-yellow-500" : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
            <span className="ml-2">({product.rating}/5)</span>
          </div>
          <div className="bg-green-500 border-t-[15px] border-b-[15px] border-r-[15px] border-t-transparent border-b-transparent border-r-gray-100 leading-[0px] w-max mt-3">
            <h1 className="pl-3 pr-2 text-white font-semibold">
              Shop Area: {product.shopArea}
            </h1>
          </div>
          <div className="mt-3 bg-pink-600 w-max p-1 text-center text-white text-lg font-medium">
            {product.policyDays} Days {product.policy}
          </div>
          <h1 className=" mt-3 font-semibold">
            Size:{" "}
            <span className="border border-black p-2">{product.size}</span>
          </h1>
          <h1 className="mt-3 font-semibold">Brand: {product.brand}</h1>
          <Counter stock={product.inStock} />
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 p-2 gap-3 ">
            <button
              onClick={() => handleAddCartClick(product)}
              className="bg-green-400 text-white p-2 rounded-md font-semibold text-lg hover:bg-blue-600"
            >
              Add To Cart
            </button>
            <button
              onClick={() => handleOrderClick()}
              className="bg-rose-500 text-white p-2 rounded-md font-semibold text-lg hover:bg-green-600"
            >
              Order Now
            </button>
          </div>
          <button className="bg-green-600 text-white p-2 rounded-md font-semibold text-lg w-full hover:bg-lime-600">
            {product.contact_phone}
          </button>
          <button className="bg-pink-600 text-white mt-3 p-2 rounded-md font-semibold text-lg w-full hover:bg-purple-600">
            {product.contact_whatsapp}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
