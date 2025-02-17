import React from 'react'
import image from '../assets/404.png'

export default function Notfound() {
  return (
    <div className="dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 shadow-md">
      <div className="container" >
        <div className="flex flex-col items-center justify-center h-96">
          <img src={image} alt="404" className="w-1/2 "/>
        </div>

      </div>
      

    </div>
  )
}
