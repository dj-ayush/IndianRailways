import React from 'react'

const FeatureCard = ({ icon, title, description, glass = false }) => {
  return (
    <div className={(glass
      ? 'bg-white/10 backdrop-blur-md border border-white/20 '
      : 'bg-white text-gray-800 border border-black/5 ') +
      'rounded-2xl shadow-md p-8 flex flex-col items-center text-center'}>
      <div className={'h-14 w-14 rounded-full flex items-center justify-center ' + (glass ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700')}>
        {icon}
      </div>
      <h4 className={'mt-4 font-[font2] text-xl ' + (glass ? 'text-white' : 'text-gray-900')}>{title}</h4>
      <p className={'mt-3 text-sm leading-6 max-w-[34ch] ' + (glass ? 'text-white/80' : 'text-gray-600')}>{description}</p>
    </div>
  )
}

const FeaturesSection = () => {
  return (
    <section className='relative z-10 w-full lg:py-28 py-16'>
      <div className='max-w-6xl mx-auto px-4'>
        <h2 className='text-center font-[font2] text-3xl lg:text-5xl text-white'>Advanced Features</h2>
        <p className='text-center text-white/80 mt-4 max-w-3xl mx-auto'>Our AI-powered digital twin platform provides comprehensive solutions for railway traffic management</p>

        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <FeatureCard
            glass
            title='Real-time Monitoring'
            description='Monitor train movements, speeds, and status across the network in real-time with our tracking system.'
            icon={<svg viewBox='0 0 24 24' className='h-7 w-7'><path fill='currentColor' d='M12 3a9 9 0 100 18 9 9 0 000-18Zm0 2a7 7 0 110 14A7 7 0 0112 5Zm0 2a1 1 0 00-1 1v4.382l-2.105 2.105a1 1 0 101.414 1.414l2.396-2.396A1 1 0 0013 13V8a1 1 0 00-1-1z'/></svg>}
          />
          <FeatureCard
            title='AI-Powered Predictions'
            description='Predict potential delays and conflicts before they happen with machine learning algorithms.'
            icon={<svg viewBox='0 0 24 24' className='h-7 w-7'><path fill='currentColor' d='M12 2C7 2 3 6 3 11s4 9 9 9 9-4 9-9-4-9-9-9zm0 2c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7zm-1 3v4H7v2h4v4h2v-4h4v-2h-4V7h-2z'/></svg>}
          />
          <FeatureCard
            glass
            title='Optimized Routing'
            description='Automatically generate optimal routes to avoid conflicts and maximize throughput.'
            icon={<svg viewBox='0 0 24 24' className='h-7 w-7'><path fill='currentColor' d='M6 3a3 3 0 110 6 3 3 0 010-6zm12 6a3 3 0 110-6 3 3 0 010 6zM6 15a3 3 0 110 6 3 3 0 010-6zm14-2a1 1 0 010 2h-5a5 5 0 01-5-5V8H6a1 1 0 110-2h5a1 1 0 011 1v1a3 3 0 003 3h5z'/></svg>}
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection


