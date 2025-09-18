import React from 'react'

const DashboardHeader = ({ onLogout }) => {
  return (
    <div className='w-full flex items-center justify-between py-4 px-5 lg:px-8 bg-white border-b border-gray-200'>
      <h1 className='font-[font2] text-xl lg:text-2xl text-gray-900'>AI-Driven Digital Twin</h1>
      <button onClick={onLogout} className='text-blue-600 hover:text-blue-700 text-sm lg:text-base'>Logout</button>
    </div>
  )
}

export default DashboardHeader


