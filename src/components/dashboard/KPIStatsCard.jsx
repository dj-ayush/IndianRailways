import React from 'react'

const KPIBox = ({ value, label }) => (
  <div className='flex-1 rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3'>
    <div className='font-[font2] text-2xl text-gray-900'>{value}</div>
    <div className='text-xs text-gray-500 mt-1'>{label}</div>
  </div>
)

const KPIStatsCard = () => {
  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm'>
      <div className='px-5 py-3 border-b border-gray-200'>
        <h3 className='font-[font2] text-gray-900'>KPI Stats</h3>
      </div>
      <div className='p-5'>
        <div className='flex gap-4'>
          <KPIBox value='50' label='Total Trains' />
          <KPIBox value='5 min' label='Average Delay' />
          <KPIBox value='2' label='Conflicts Avoided' />
        </div>
      </div>
    </div>
  )
}

export default KPIStatsCard


