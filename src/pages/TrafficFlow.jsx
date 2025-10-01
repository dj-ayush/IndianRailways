import React from 'react'

const TrafficFlow = () => {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      <div className='max-w-6xl mx-auto px-5 py-10'>
        <h1 className='text-3xl font-bold mb-3'>Traffic Flow</h1>
        <p className='text-gray-600 mb-6'>Real-time block occupancy, headway management, and conflict resolution.</p>
        <div className='bg-white rounded-xl border p-5'>
          <div className='h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500'>Flow diagram placeholder</div>
        </div>
      </div>
    </div>
  )
}

export default TrafficFlow
