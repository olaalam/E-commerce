import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
export default function Loading() {
  return (
    <div className=" flex justify-center items-center h-screen absolute top-0 left-0 right-0 bottom-0 bg-gray-100 bg-opacity-50 z-50">
  <InfinitySpin
  visible={true}
  width="200"
  color="#4fa94d"
  ariaLabel="infinity-spin-loading"
  />
    </div>
  )
}
