import React from 'react';
import Header from './Header';
import Featuredproducts from './Featuredproducts';
import Category from "./Category";
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 shadow-md">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header/>
      <Category/>
      <Featuredproducts/>
    </div>
  )
}
