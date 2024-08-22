import {
  clearCart,
  deleteAProduct,
  updateQuantity,
} from "../../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface CartSummaryProps {
  deliveryArea?: any; // Making deliveryArea optional
}

const CartSummary = ({ deliveryArea }: CartSummaryProps) => {
  const products = useAppSelector((store) => store.cart.products);
  const { totalPrice } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const deliveryCharge = deliveryArea ? parseInt(deliveryArea) : 0;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg h-max border">
      <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
        <p>অর্ডারের তথ্য</p>
        <button
          onClick={handleClearCart}
          className="bg-red-400 p-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left border">ডিলিট</th>
            <th className="p-2 text-left border">প্রোডাক্ট</th>
            <th className="p-2 text-left border">পরিমাণ</th>
            <th className="p-2 text-right border">মূল্য</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const handleQuantity = (type: any, _id: any) => {
              dispatch(updateQuantity({ type, _id }));
            };
            const handleDeleteProduct = (productId: any) => {
              dispatch(deleteAProduct({ _id: productId }));
            };
            return (
              <tr key={product._id} className="border">
                <td className="flex justify-center items-center p-4 border-r text-red-600">
                  <svg
                    onClick={() => handleDeleteProduct(product._id)}
                    className="h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                      fill="red"
                    />
                  </svg>
                </td>
                <td>
                  <div className="flex justify-start items-center p-4 border-r">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-10 object-cover rounded mr-2"
                    />
                    <span className="font-semibold">{product.name}</span>
                  </div>
                </td>

                <td className="flex justify-center">
                  <div className="flex justify-center items-center border-2 border-black w-20 text-3xl font-bold">
                    <button
                      onClick={() => handleQuantity("decrement", product._id)}
                      className="flex justify-center items-center flex-1 border-r-2 border-black"
                    >
                      -
                    </button>
                    <div className="flex justify-center items-center flex-1 text-xl">
                      {product.quantity}
                    </div>
                    <button
                      onClick={() => handleQuantity("increment", product._id)}
                      className="flex justify-center items-center flex-1  border-l-2 border-black "
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="border-l text-center font-bold">
                  ৳{product.newPrice}
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={3} className="p-2 text-right border">
              মোট
            </td>
            <td className="p-2 text-right border">৳{totalPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="p-2 text-right border">
              ডেলিভারি চার্জ
            </td>
            <td className="p-2 text-right border">৳{deliveryCharge}</td>
          </tr>
          <tr>
            <td colSpan={3} className="p-2 text-right border">
              ডিসকাউন্ট
            </td>
            <td className="p-2 text-right border">৳0</td>
          </tr>
          <tr>
            <td colSpan={3} className="p-2 text-right border font-bold">
              সর্বমোট
            </td>
            <td className="p-2 text-right border font-bold">
              ৳{Number(totalPrice + deliveryCharge).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartSummary;
