import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartSummary from "./CartSummary";
import { useAppDispatch } from "../../redux/hooks";
import { clearCart } from "../../redux/features/cartSlice";

const ProductCheckout: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<string>("100");

  const handleDeliveryAreaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setDeliveryArea(selectedValue); // Update the state with the selected value
  };
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form submission logic here
    toast.success("Order submitted successfully!");

    setTimeout(() => {
      navigate(`/`);
    }, 6000)
    dispatch(clearCart());
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-[90px]">
        <div className="bg-white p-6 shadow-md rounded-lg h-max">
          <h2 className="text-lg font-semibold mb-4 text-green-600">
            আপনার অর্ডারটি কনফার্ম করতে তথ্যগুলো পুরণ করে "অর্ডার করুন" বাটন এ
            ক্লিক করুন
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                আপনার নাম লিখুন *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                id="name"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                মোবাইল নাম্বার দিন *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                id="phone"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                ঠিকানা লিখুন *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                id="address"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="deliveryArea"
              >
                ডেলিভারি এরিয়া নির্বাচন করুন *
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                id="deliveryArea"
                defaultValue=""
                onChange={handleDeliveryAreaChange}
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="100">ঢাকার ভিতরে 100 টাকা</option>
                <option value="150">ঢাকার বাইরে 150 টাকা</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="paymentMethod"
              >
                পেমেন্ট মেথড নির্বাচন করুন *
              </label>
              <div className="flex items-center space-x-4">
                <label
                  className={`inline-flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                    selectedPaymentMethod === "CashOnDelivery"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio opacity-0 absolute"
                    name="paymentMethod"
                    value="CashOnDelivery"
                    onChange={() => setSelectedPaymentMethod("CashOnDelivery")}
                    required
                  />
                  <span className="ml-2">Cash On Delivery</span>
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                    selectedPaymentMethod === "Bkash"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio opacity-0 absolute"
                    name="paymentMethod"
                    value="Bkash"
                    onChange={() => setSelectedPaymentMethod("Bkash")}
                    required
                  />
                  <span className="ml-2">Bkash</span>
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                    selectedPaymentMethod === "Advance"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio opacity-0 absolute"
                    name="paymentMethod"
                    value="Advance"
                    onChange={() => setSelectedPaymentMethod("Advance")}
                    required
                  />
                  <span className="ml-2">Advance 200 Taka</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <button
                type="submit"
                className="bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                অর্ডার করুন
              </button>
            </div>
          </form>
          <Link to={`/`} className="flex justify-end">
            <button
              type="button"
              className="bg-purple-600 text-white font-semibold p-1 rounded-md "
            >
              শপিং করুন
            </button>
          </Link>
        </div>
        {/* CartSummary */}
        <CartSummary deliveryArea={deliveryArea} />
      </div>
    </div>
  );
};

export default ProductCheckout;
