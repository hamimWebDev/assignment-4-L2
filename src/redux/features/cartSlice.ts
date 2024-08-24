import { createSlice } from "@reduxjs/toolkit";
import { Count } from "../../Home/Products/Counter";
import { toast } from "react-toastify";

// Define the initial state using that type
const initialState = {
  products: [] as any[],
  selectedItem: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (action.payload.inStock > 0) {
        let quantity = Count;
        if (quantity === undefined) {
          quantity = 1;
        }
        if (!isExist) {
          state.products.push({ ...action.payload, quantity });
        } else if (isExist) {
          alert("This product is already added");
        }
        state.selectedItem = selectSelectedItem(state);
        state.totalPrice = selectTotalPrice(state);
      }
    },
    updateQuantity: (state: any, action) => {
      state.products = state.products.map((product: any) => {
        if (product._id === action.payload._id) {
          if (
            action.payload.type === "increment" &&
            product.quantity < product.inStock
          ) {
            product.quantity += 1;
          } else if (
            product.quantity >= product.inStock &&
            action.payload.type === "increment"
          ) {
            toast.error("No more in our stock");
          } else if (
            action.payload.type === "decrement" &&
            product.quantity > 1
          ) {
            product.quantity -= 1;
          }
        }
        return product;
      });
      state.selectedItem = selectSelectedItem(state);
      state.totalPrice = selectTotalPrice(state);
    },
    deleteAProduct: (state: any, action) => {
      state.products = state.products.filter(
        (product: any) => product._id !== action.payload._id
      );
      state.selectedItem = selectSelectedItem(state);
      state.totalPrice = selectTotalPrice(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItem = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectSelectedItem = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    return total + product.quantity;
  }, 0);

const selectTotalPrice = (state: any) => {
  return state.products.reduce((total: number, product: any) => {
    return total + product.quantity * product.newPrice;
  }, 0);
};

export const { addToCart, updateQuantity, deleteAProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
