import React from "react";
import Slider from "react-slick";
import img1 from "../assets/slider-image-1.jpeg";
import img2 from "../assets/slider-image-2.jpeg";
import img3 from "../assets/slider-image-3.jpeg";
import img4 from "../assets/assortment-citrus-fruits.png";
import img5 from "../assets/slider-2.jpeg";

export default function Header() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      <div className="container hidden md:block py-8 dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 shadow-md">
        <div className="flex justify-center items-start">
          <div className="w-2/3">
            <Slider {...settings}>
              <img src={img1} className="h-[400px] w-full object-cover" alt="Slider Image 1" />
              <img src={img2} className="h-[400px] w-full object-cover" alt="Slider Image 2" />
              <img src={img3} className="h-[400px] w-full object-cover" alt="Slider Image 3" />
            </Slider>
          </div>

          <div className="w-1/3 flex flex-col">
            <img src={img4} className="h-[200px] w-full object-cover" alt="Citrus Fruits" />
            <img src={img5} className="h-[200px] w-full object-cover" alt="Slider Side Image" />
          </div>
        </div>
      </div>

      {/* Small Screen Layout (Hidden on large screens) */}
      <div className="container sm:shadow-none pb-7 md:hidden py-4 dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 ">
        <Slider {...settings}>
          <img src={img1} className="h-[250px] w-full object-cover" alt="Slider Image 1" />
          <img src={img2} className="h-[250px] w-full object-cover" alt="Slider Image 2" />
          <img src={img3} className="h-[250px] w-full object-cover" alt="Slider Image 3" />
          <img src={img4} className="h-[250px] w-full object-cover" alt="Citrus Fruits" />
          <img src={img5} className="h-[250px] w-full object-cover" alt="Slider Side Image" />
        </Slider>
      </div>
    </>
  );
}
