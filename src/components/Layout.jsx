import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import img from'../assets/light-patten.svg'

export default function Layout() {
  return (
    <div style={{backgroundImage:`url(${img})`}} className="min-dh-screen">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
