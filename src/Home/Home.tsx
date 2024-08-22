import { useEffect } from "react";
import Carousel from "./Carousel/Carousel";
import CategoryGrid from "./Category/Category";
import ProductGrid from "./Products/ProductGrid";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Carousel />
      <CategoryGrid />
      <ProductGrid />
    </div>
  );
};

export default Home;
