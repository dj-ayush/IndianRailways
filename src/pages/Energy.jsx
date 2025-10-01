import React from 'react'

const Energy = () => {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      <div className='max-w-6xl mx-auto px-5 py-10'>
        <h1 className='text-3xl font-bold mb-3'>Energy Efficiency</h1>
        <p className='text-gray-600 mb-6'>Eco-driving profiles, regenerative braking utilization, and power optimization.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-white p-5 rounded-xl border'>
            <p className='text-xs text-gray-500 uppercase'>Current Efficiency</p>
            <p className='text-2xl font-bold mt-2'>87%</p>
          </div>
          <div className='bg-white p-5 rounded-xl border'>
            <p className='text-xs text-gray-500 uppercase'>Potential Savings</p>
            <p className='text-2xl font-bold mt-2'>+6%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Energy
