// SuggestedActionsCard.jsx
import React from 'react'

const SuggestedActionsCard = ({ onAccept = () => {}, onReject = () => {} }) => {
  return (
    <div className='bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden'>
      <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100'>
        <h3 className='font-bold text-gray-800 text-lg'>AI Suggestions</h3>
      </div>
      <div className='p-5'>
        <div className='bg-blue-50 rounded-xl p-4 border border-blue-100'>
          <p className='font-bold text-gray-800'>Hold Train T5 at Station X for 5 min</p>
          <p className='text-xs text-gray-600 mt-1'>Due to S12-block, rerouting advised</p>
          <div className='mt-4 flex gap-3'>
            <button onClick={onAccept} className='px-4 py-2 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 text-white font-medium hover:from-green-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg'>
              Accept
            </button>
            <button onClick={onReject} className='px-4 py-2 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700 font-medium hover:from-gray-400 hover:to-gray-500 transition-all'>
              Reject
            </button>
          </div>
        </div>
        <div className='mt-4 text-xs text-gray-500'>
          <span className='font-medium'>Confidence Level:</span> 92%
        </div>
      </div>
    </div>
  )
}

export default SuggestedActionsCard