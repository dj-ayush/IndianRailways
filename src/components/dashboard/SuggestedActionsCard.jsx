import React from 'react'

const SuggestedActionsCard = () => {
  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm'>
      <div className='px-5 py-3 border-b border-gray-200'>
        <h3 className='font-[font2] text-gray-900'>Suggested Actions</h3>
      </div>
      <div className='p-5'>
        <p className='font-[font2] text-gray-900'>Hold Train T5 at Station X for 5 m</p>
        <p className='text-xs text-gray-500 mt-1'>Due to S12-block, rerouting advised</p>
        <div className='mt-4 flex gap-3'>
          <button className='px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700'>Accept</button>
          <button className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700'>Reject</button>
        </div>
      </div>
    </div>
  )
}

export default SuggestedActionsCard


