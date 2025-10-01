import React from 'react'

const Policy = () => {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      <div className='max-w-6xl mx-auto px-5 py-10'>
        <h1 className='text-3xl font-bold mb-3'>Policy & Priorities</h1>
        <p className='text-gray-600 mb-6'>Configure network-level priorities and policy rules enforced by the optimizer.</p>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' className='h-4 w-4 rounded border-gray-300 text-blue-600' />
            Prefer Passenger On Peak Hours
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' className='h-4 w-4 rounded border-gray-300 text-blue-600' />
            Reserve Freight Slots Overnight
          </label>
          <label className='flex flex-col'>
            <span className='text-gray-600 mb-1'>Max Headway (min)</span>
            <input className='px-3 py-2 border rounded-lg' defaultValue='5' />
          </label>
          <div className='md:col-span-2'>
            <button className='mt-2 rounded-lg bg-blue-600 text-white px-4 py-2.5 hover:bg-blue-700'>Save Policy</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Policy
