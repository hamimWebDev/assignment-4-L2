import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AllRouterParents = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[70px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AllRouterParents;
