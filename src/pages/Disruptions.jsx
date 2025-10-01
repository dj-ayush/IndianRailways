import React from 'react'

const Disruptions = () => {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      <div className='max-w-6xl mx-auto px-5 py-10'>
        <h1 className='text-3xl font-bold mb-3'>Disruptions & Rerouting</h1>
        <p className='text-gray-600 mb-6'>Incident detection, impact analysis, and AI-assisted rerouting plans.</p>
        <ul className='space-y-3'>
          {['Signal failure at S12','Track maintenance between A-B','Overhead equipment issue near C'].map((d, i) => (
            <li key={i} className='bg-white border rounded-xl p-4 flex items-center justify-between'>
              <span>{d}</span>
              <button className='px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm'>View Plan</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Disruptions
