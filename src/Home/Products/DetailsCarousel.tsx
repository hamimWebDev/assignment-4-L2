import React, { useState } from "react";
import Slider from "react-slick";

interface Product {
  _id: string;
  images: string[];
  name: string;
  category: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  inStock: number;
  size: string;
  brand: string;
  shopArea: string;
  policy: string;
  policyDays: number;
  contact_whatsapp: string;
  contact_phone: string;
}

interface DetailsCarouselProps {
  product: Product;
}

const DetailsCarousel: React.FC<DetailsCarouselProps> = ({ product }) => {
  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();

  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    asNavFor: nav2, // Conditionally set only if nav2 is not undefined
    ref: (slider: Slider) => setNav1(slider),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1, // Conditionally set only if nav1 is not undefined
    ref: (slider: Slider) => setNav2(slider),
  };

  const images = product.images;

  return (
    <div className="w-full lg:w-[700px] mx-auto">
      {/* Main Image Slider */}
      <div className="w-full h-[300px] lg:h-[500px] bg-gray-100 border-2 rounded-md">
        <Slider {...mainSettings}>
          {images.map((imgSrc, index) => (
            <div key={index}>
              <img
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                className="w-[70%] h-[295px] lg:h-[495px] mx-auto"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Thumbnail Slider */}
      <div className="w-full mt-4">
        <Slider {...thumbnailSettings}>
          {images.map((imgSrc, index) => (
            <div key={index}>
              <img
                src={imgSrc}
                alt={`Thumbnail ${index + 1}`}
                className="w-[70px] h-[70px] mx-auto object-cover border-2 border-gray-300 rounded-md"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DetailsCarousel;
