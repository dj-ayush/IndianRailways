// DashboardHeader.jsx
import React from 'react'

const DashboardHeader = ({ onLogout }) => {
  return (
    <div className='w-full flex items-center justify-between py-5 px-6 lg:px-8 bg-white border-b border-gray-200 shadow-sm'>
      <div className='flex items-center gap-3'>
        <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md'>
          IR
        </div>
        <h1 className='font-bold text-xl lg:text-2xl text-gray-800'>AI-Powered Railway Traffic Control</h1>
      </div>
      <button 
        onClick={onLogout} 
        className='px-4 py-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg text-sm lg:text-base'
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardHeader