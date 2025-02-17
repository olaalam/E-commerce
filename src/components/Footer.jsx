import React from "react";

export default function Footer() {
  return (
    <div className="relative py-6 lg:ps-6 bg-gray-100 p-4 rounded-lg dark:bg-gray-900 dark:text-white border-b dark:border-gray-800 shadow-md">
      <h2 className="text-lg md:w-full lg:ps-8 font-semibold text-gray-800 sm:text-left text-center">
        Get the FreshCart app
      </h2>
      <p className="text-gray-600 lg:ps-8 md:w-full text-sm mb-3 sm:text-left text-center">
        We will send you a link, open it on your phone to download the app.
      </p>
  

      <div className="relative w-full sm:max-w-md mx-auto sm:mx-0">
  <div className="flex flex-col lg:flex-row items-center gap-2 lg:w-[200%]">
    <div className="relative flex-grow w-full lg:ms-10 lg:w-[200%]">
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 16"
      >
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
      </svg>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-green-500 focus:border-green-500 block w-full lg:w-[165%]  ps-10 py-2"
        placeholder="Email .."
      />
    </div>

    <button
      type="button"
      className="text-white lg:relative lg:left-72 lg:ms-16 bg-green-500 hover:bg-green-400 focus:bg-green-700 rounded-lg text-xs py-2 px-5 w-full sm:w-auto lg:w-[100%]"
    >
      Share App Link
    </button>
  </div>
</div>

  
      <div className="my-6 border-t-2 border-b-2 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex lg:ps-20 flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="text-gray-600 text-sm font-medium">
              Payment Partners
            </span>
            <div className="flex space-x-3 text-gray-600 text-2xl">
              <i className="fa-brands cursor-pointer hover:text-green-600 transition-all duration-200 fa-amazon-pay"></i>
              <i className="fa-brands cursor-pointer hover:text-green-600 transition-all duration-200 fa-cc-mastercard"></i>
              <i className="fa-brands cursor-pointer hover:text-green-600 transition-all duration-200 fa-cc-paypal"></i>
            </div>
          </div>
  
          <div className="flex flex-col lg:pe-20 sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="text-gray-600 text-sm font-medium">
              Get deliveries with FreshCart
            </span>
            <div className="flex space-x-3 text-gray-600 text-2xl">
              <i className="fa-brands cursor-pointer hover:text-green-600 transition-all duration-200 fa-google-play"></i>
              <i className="fa-brands cursor-pointer hover:text-green-600 transition-all duration-200 fa-app-store-ios"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
