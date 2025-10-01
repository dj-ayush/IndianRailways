// NetworkMapCard.jsx
import React from 'react';

const NetworkMapCard = ({ onExpand = () => {} }) => {
  return (
    <div className='bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden'>
      <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100'>
        <h3 className='font-bold text-gray-800 text-lg'>Live Network Map</h3>
      </div>
      <div className='p-5'>
        <div className='relative h-84 w-full rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden border border-blue-100'>
          <video
            src='/video2.mp4'
            autoPlay
            loop
            muted
            playsInline
            className='h-full w-full object-cover rounded-lg'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-white/20 to-transparent'></div>
        </div>
        <div className='mt-4 flex justify-between items-center'>
          <div className='text-sm text-gray-600'>Live tracking of all trains in the network</div>
          <button onClick={onExpand} className='px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors'>
            Expand View
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkMapCard;