import React from 'react'

const Optimization = () => {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      <div className='max-w-6xl mx-auto px-5 py-10'>
        <h1 className='text-3xl font-bold mb-3'>Optimization Engine</h1>
        <p className='text-gray-600 mb-6'>Multi-objective optimization balances throughput, delays, and priorities across the network.</p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-white p-5 rounded-xl border'>
            <p className='text-xs text-gray-500 uppercase'>Objective</p>
            <p className='font-semibold mt-1'>Max Throughput</p>
          </div>
          <div className='bg-white p-5 rounded-xl border'>
            <p className='text-xs text-gray-500 uppercase'>Constraint</p>
            <p className='font-semibold mt-1'>Block Occupancy</p>
          </div>
          <div className='bg-white p-5 rounded-xl border'>
            <p className='text-xs text-gray-500 uppercase'>Priority</p>
            <p className='font-semibold mt-1'>Passenger Over Freight</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Optimization
