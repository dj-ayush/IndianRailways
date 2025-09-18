import React from 'react';

const ThemedCard = ({ title, description, bg, accent, imageUrl }) => { // Corrected: Using imageUrl here
  return (
    <div className={'rounded-3xl p-6 lg:p-8 shadow-md border border-black/5 ' + bg}>
      <div className='flex items-start justify-between'>
        <h3 className='font-[font2] text-3xl text-gray-900 max-w-[16ch]'>{title}</h3>
        <div className={'h-10 w-10 rounded-full flex items-center justify-center ' + accent}>
          <span className='text-xl'>→</span>
        </div>
      </div>
      <div className='mt-6'>
        <div className='h-44 w-40 rounded-2xl overflow-hidden rotate-[-8deg] mx-auto lg:mx-0'>
          {/* Ensure imageUrl is used as src for the img tag */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Visual for ${title}`}
              className='h-full w-full object-cover transform rotate-8' // rotate-8 to counteract parent rotate-[-8deg]
            />
          )}
        </div>
      </div>
      <p className='mt-6 text-gray-700 leading-7 max-w-[52ch]'>{description}</p>
    </div>
  );
};

const IndustryCards = () => {
  return (
    <section className='relative z-10 lg:py-20 py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Card 1: Dynamic Throughput Optimization */}
          <ThemedCard
            title={'Dynamic Throughput Optimization'}
            description={'Leverage AI to analyze traffic and dynamically adjust train movements, maximizing capacity utilization and ensuring smooth flow across network sections.'}
            bg='bg-rose-50'
            accent='bg-rose-200 text-rose-900'
            // Actual Unsplash image: Modern train in motion, symbolizing dynamic flow
            imageUrl='https://images.unsplash.com/photo-1570118091912-70b3d4ef2357?q=80&w=536&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />

          {/* Card 2: Predictive Conflict Resolution */}
          <ThemedCard
            title={'Predictive Conflict Resolution'}
            description={'Anticipate and prevent potential train conflicts and congestion. AI proactively identifies risks, suggesting optimal actions to eliminate delays.'}
            bg='bg-green-50'
            accent='bg-green-200 text-green-900'
            // Actual Unsplash image: A digital map with glowing lines, indicating predictive analysis
            imageUrl='https://images.unsplash.com/photo-1608461127691-760666cf8cd5?q=80&w=931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />

          {/* Card 3: Real-time Section Control */}
          <ThemedCard
            title={'Real-time Section Control'}
            description={'Gain precise, micro-level visibility and control over traffic. Our digital twin allows AI to enact exact speed adjustments and rerouting strategies.'}
            bg='bg-sky-50'
            accent='bg-sky-200 text-sky-900'
            // Actual Unsplash image: A modern control panel/dashboard, symbolizing real-time control
            imageUrl='https://images.unsplash.com/vector-1750195615932-9be0a03d8fcf?q=80&w=642&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />

          {/* Card 4: Adaptive Scheduling & Rescheduling */}
          <ThemedCard
            title={'Adaptive Scheduling & Rescheduling'}
            description={'Move beyond static timetables. Our system intelligently adapts schedules in milliseconds to disruptions, restoring optimal throughput across the network.'}
            bg='bg-fuchsia-50'
            accent='bg-fuchsia-200 text-fuchsia-900'
            // Actual Unsplash image: A train track diverging, representing dynamic routing decisions
            imageUrl='https://images.unsplash.com/vector-1751194334455-599e0087915d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
          
        </div>
      </div>
    </section>
  );
};

export default IndustryCards;