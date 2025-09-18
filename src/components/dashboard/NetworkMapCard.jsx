import React from 'react';

const NetworkMapCard = () => {
  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm'>
      <div className='px-5 py-3 border-b border-gray-200'>
        <h3 className='font-[font2] text-gray-900'>Network Map</h3>
      </div>
      <div className='p-5'>
        <div className='relative h-84 w-full rounded-lg bg-gray-50 overflow-hidden'>
          <video
            src='/video2.mp4' // This path is relative to the `public` folder
            autoPlay
            loop
            muted
            playsInline
            className='h-full w-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkMapCard;