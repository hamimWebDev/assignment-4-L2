import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CounterProps {
  stock: number;
}

const Counter: React.FC<CounterProps> = ({ stock }) => {
  const [count, setCount] = useState<number>(1);
  const [toastShown, setToastShown] = useState<boolean>(false);

  const increment = () => {
    if (count < stock) {
      setCount((prevCount) => prevCount + 1);
      setToastShown(false); // Reset the toast flag when incrementing
    } else if (!toastShown) {
      toast.error("No more in our stock");
      setToastShown(true); // Set the flag to true after showing the toast
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      setToastShown(false); // Reset the toast flag when decrementing
    }
  };

  return (
    <div className="flex items-center border-2 border-black w-32 text-3xl font-bold mt-3">
      <ToastContainer className="text-base w-min" />
      <button onClick={decrement} className="flex justify-center items-center flex-1 border-r-2 border-black">
        -
      </button>
      <div className="flex justify-center items-center flex-1 text-xl">
        {count}
      </div>
      <button onClick={increment} className="flex justify-center items-center flex-1  border-l-2 border-black ">
        +
      </button>
    </div>
  );
};

export default Counter;
