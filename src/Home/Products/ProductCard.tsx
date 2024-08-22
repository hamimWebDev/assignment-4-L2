import { useNavigate } from "react-router-dom";
import { Product } from "./ProductGrid";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cartSlice";
import { useDeleteProductMutation } from "../../redux/api/productApi";
import EditPlantForm from "../../Form/EditPlantForm";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => {
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOrderClick = (product: Product) => {
    dispatch(addToCart(product));
    navigate(`/customer/checkout`);
  };

  return (
    <div className="border p-2 lg:p-4 rounded-lg">
      <div className="cursor-pointer hover:scale-105" onClick={onClick}>
        <div className="overflow-hidden rounded mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-20 lg:h-40 w-full object-cover"
          />
        </div>
        <h3 className=" text-xs lg:text-base hover:text-blue-600 hover:underline font-bold mb-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
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
          <span className="ml-2">({product.rating}.0)</span>
        </div>
        <div className="text-lg mb-2">
          <span className="line-through text-gray-500 mr-2">
            {product.oldPrice}
          </span>
          <span className="text-green-500">{product.newPrice}</span>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <EditPlantForm _id={product._id} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteProduct(product._id);
          }}
          className="flex items-center justify-center bg-red-500 text-white p-2 rounded"
        >
          <svg
            height="25"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="white"
          >
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
      <button
        onClick={() => {
          handleOrderClick(product);
        }}
        className="bg-green-500 text-white py-2 px-4 rounded w-full mt-2"
      >
        ORDER NOW
      </button>
    </div>
  );
};
