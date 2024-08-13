import { Product } from "./ProductGrid";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => (
  <div className="border p-2 lg:p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
    <div className="cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden rounded mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-20 lg:h-40 w-full object-cover"
        />
      </div>
      <h3 className="text-base hover:text-blue-600 hover:underline font-bold mb-2">
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
    <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
      ORDER NOW
    </button>
  </div>
);
