import React from 'react'

const Dot = ({ color }) => (
  <span className={'inline-block h-2.5 w-2.5 rounded-full mr-2 ' + color} />
)

const Item = ({ color, title, value }) => (
  <div className='flex-1 rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3 flex items-center'>
    <Dot color={color} />
    <div>
      <div className='font-[font2] text-gray-900'>{value}</div>
      <div className='text-xs text-gray-500'>{title}</div>
    </div>
  </div>
)

const ManorStatusCard = () => {
  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm'>
      <div className='px-5 py-3 border-b border-gray-200'>
        <h3 className='font-[font2] text-gray-900'>Manor</h3>
      </div>
      <div className='p-5'>
        <div className='flex gap-4'>
          <Item color='bg-green-500' title='Trains' value='10' />
          <Item color='bg-amber-500' title='Avg Delay' value='5 min' />
          <Item color='bg-red-500' title='Conflicts Avoided' value='2' />
        </div>
      </div>
    </div>
  )
}

export default ManorStatusCard


