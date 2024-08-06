import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AllRouterParents = () => {
  return (
    <div>
      <Navbar />
      <div className="w-[80%] bg-green-500 mx-auto pt-[70px] ">
      <Outlet />
      </div>
      
    </div>
  );
};

export default AllRouterParents;
