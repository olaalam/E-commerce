import { Suspense, useState,lazy } from 'react';
import React from 'react'; 
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Cart from './components/Cart';
import Category from './components/Category';
const Brands =lazy( () => import ('./components/Brands'));
import Products from './components/Products';
import Notfound from './components/Notfound';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import ProtectedRout from './components/ProtectedRout';
import Productdetails from './components/productDetails';
import Orders from './components/Orders';
import Loading from './components/Loading';
import Wishlist from './components/Wishlist';


export default function App() {
  let routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/cart', element:<ProtectedRout><Cart /></ProtectedRout> },
        { path: '/category', element: <Category /> },
        { path: '/brand', element: <Suspense fallback={<Loading/>}> <Brands /> </Suspense> },
        { path: '/product', element: <Products /> },
        { path: '/login', element: <Login /> },
        {path:'/productdetails/:id/:catId',element:<Productdetails/>},
        { path: '/register', element: <Register /> },
        { path: '/payment', element: <Payment /> },
        { path: '/wishlist', element:<ProtectedRout><Wishlist /></ProtectedRout>  },
        { path: '/allorders', element: <Orders /> },
        { path: '*', element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}