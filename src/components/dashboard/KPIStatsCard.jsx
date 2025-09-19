// KPIStatsCard.jsx
import React from 'react'

const KPIBox = ({ value, label, color }) => (
  <div className='flex-1 rounded-xl border border-blue-100 bg-white p-4 shadow-md hover:shadow-lg transition-shadow'>
    <div className={`font-bold text-3xl mb-1 ${color}`}>{value}</div>
    <div className='text-xs font-medium text-gray-500 uppercase tracking-wider'>{label}</div>
  </div>
)

const KPIStatsCard = () => {
  return (
    <div className='bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden'>
      <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100'>
        <h3 className='font-bold text-gray-800 text-lg'>Performance Metrics</h3>
      </div>
      <div className='p-5'>
        <div className='flex gap-5'>
          <KPIBox value='50' label='Total Trains' color='text-blue-600' />
          <KPIBox value='5 min' label='Average Delay' color='text-amber-600' />
          <KPIBox value='2' label='Conflicts Avoided' color='text-green-600' />
        </div>
      </div>
    </div>
  )
}

export default KPIStatsCard