// ManorStatusCard.jsx
import React from 'react'

const Dot = ({ color }) => (
  <span className={`inline-block h-3 w-3 rounded-full mr-3 ${color}`} />
)

const Item = ({ color, title, value }) => (
  <div className='flex-1 rounded-xl border border-blue-100 bg-white p-4 shadow-md hover:shadow-lg transition-shadow flex items-center'>
    <Dot color={color} />
    <div>
      <div className='font-bold text-gray-800 text-xl'>{value}</div>
      <div className='text-xs text-gray-500 font-medium'>{title}</div>
    </div>
  </div>
)

const ManorStatusCard = () => {
  return (
    <div className='bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden'>
      <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100'>
        <h3 className='font-bold text-gray-800 text-lg'>Station Status: Manor</h3>
      </div>
      <div className='p-5'>
        <div className='flex gap-5'>
          <Item color='bg-blue-500' title='Active Trains' value='10' />
          <Item color='bg-amber-500' title='Avg Delay' value='5 min' />
          <Item color='bg-green-500' title='Issues Resolved' value='2' />
        </div>
      </div>
    </div>
  )
}

export default ManorStatusCard