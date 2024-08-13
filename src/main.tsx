import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import BonsaiPlant from "./RouterElements/BonsaiPlant/BonsaiPlant";
import AllRouterParents from "./RouterElements/AllRouterParents";
import Home from "./Home/Home";
import ProductDetails from "./Home/Products/ProductDetails";

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
    ],
  },
  {
    path: "/",
    element: <AllRouterParents />,
    children: [
      {
        path: "/artificial-grass",
        element: <div className="pt-20">This is artificial grass</div>,
      },
      {
        path: "/bonsai-plants",
        element: <BonsaiPlant />,
      },
      {
        path: "/flower-plants",
        element: <div className="pt-20">This is flower plants</div>,
      },
      {
        path: "/foreign-plants",
        element: <div className="pt-20">This is foreign plants</div>,
      },
      {
        path: "/fruit-plants",
        element: <div className="pt-20">This is fruit plants</div>,
      },
      {
        path: "/herbal-plants",
        element: <div className="pt-20">This is herbal plants</div>,
      },
      {
        path: "/outdoor-plants",
        element: <div className="pt-20">This is outdoor plants</div>,
      },
      {
        path: "/woody-plants",
        element: <div className="pt-20">This is woody plants</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
