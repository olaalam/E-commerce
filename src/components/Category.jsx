import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "./Loading";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMes, setErrMes] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: window.innerWidth < 768 ? 1 : 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getCategory() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
      setErrMes("");
    } catch (error) {
      setErrMes(error.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  if (loading) return <Loading />;
  if (errMes) return <div className="text-red-500 text-center p-32">Error: {errMes}</div>;

  return (
    <div className="dark:bg-gray-900 dark:text-white text-gray-900 border-b dark:border-gray-800">
      <div className="py-12 container">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Shop Popular Categories
        </h2>

        <Slider {...settings}>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

function CategoryItem({ category }) {
  return (
    <div className="text-center dark:bg-gray-900 dark:text-white bg-white border-b dark:border-gray-800 shadow-md p-4">
      <Helmet>
        <title>{category.name}</title>
      </Helmet>

      <div className="w-full h-[200px] flex justify-center items-center">
        <img
          src={category.image}
          alt={category.name}
          className="object-cover h-full w-full rounded-md"
        />
      </div>

      <h3 className="text-md font-medium mt-2">{category.name}</h3>
    </div>
  );
}
