import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";

import AllRouterParents from "./RouterElements/AllRouterParents";
import Home from "./Home/Home";
import ProductDetails from "./Home/Products/ProductDetails";
import ProductCheckout from "./Home/Products/ProductCheckout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CategoryPlant from "./RouterElements/BonsaiPlant/CategoryPlant";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/customer/checkout",
        element: <ProductCheckout />,
      },
    ],
  },
  {
    path: "/",
    element: <AllRouterParents />,
    children: [
      {
        path: "/:category-plants",
        element: <CategoryPlant />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
