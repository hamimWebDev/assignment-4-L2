import Slider from "react-slick";

function Carousel() {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src="https://plantsbd.com/public/uploads/banner/1716554675Banner%20design%20final.jpg"
            className="mx-auto h-40 lg:h-[405px] w-full mt-[70px] border-whitesmoke border-[10px]  lg:border-[20px]"
          />
        </div>
        <div>
          <img
            src="https://plantsbd.com/public/uploads/banner/1711777337slider2.jpg"
            className="mx-auto h-40 lg:h-[405px] w-full mt-[70px] border-whitesmoke border-[10px]  lg:border-[20px]"
          />
        </div>
        <div>
          <img
            src="https://plantsbd.com/public/uploads/banner/1715313126100-01.jpg"
            className="mx-auto h-40 lg:h-[405px] w-full mt-[70px] border-whitesmoke border-[10px]  lg:border-[20px]"
          />
        </div>
        <div>
          <img
            src="https://plantsbd.com/public/uploads/banner/1713372896Blue%20and%20Purple%20Minimalist%203.3%20Sale%20Facebook%20Cover.webp"
            className="mx-auto h-40 lg:h-[405px] w-full mt-[70px] border-whitesmoke border-[10px]  lg:border-[20px]"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
