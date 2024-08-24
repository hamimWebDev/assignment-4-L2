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
  return (
    <div className="container mx-auto p-6 pt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
        <DetailsCarousel key={product._id} product={product} />

        <div className="w-full lg:w-[700px] h-auto mx-auto bg-gray-100 lg:border-2 lg:rounded-md p-5">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="flex gap-2 items-center pt-3">
            <h1 className="line-through text-gray-400 text-xl font-bold">
              {product.oldPrice ? `৳${product.oldPrice}` : ""}
            </h1>
            <h1 className="text-2xl font-bold text-green-600">{`৳${product.newPrice}`}</h1>
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
          <button className=" flex items-center justify-center gap-1 bg-orange-500 text-white p-2 rounded-md font-semibold text-lg w-full hover:bg-lime-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="green"
              width="30px"
              height="30px"
            >
              <path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z" />
            </svg>

            {product.contact_whatsapp}
          </button>
          <button className="flex justify-center items-center gap-1 bg-pink-600 text-white mt-3 p-2 rounded-md font-semibold text-lg w-full hover:bg-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="blue"
              aria-hidden="true"
              focusable="false"
              width="30px"
              height="30px"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            {product.contact_phone}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
