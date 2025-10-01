// TrainStatusCard.jsx
import React from 'react'

const statusColor = (status) => {
  if (status === 'On Time') return 'bg-green-100 text-green-800'
  if (status === 'Delayed') return 'bg-amber-100 text-amber-800'
  return 'bg-red-100 text-red-800'
}

const statusDot = (status) => {
  if (status === 'On Time') return 'bg-green-500'
  if (status === 'Delayed') return 'bg-amber-500'
  return 'bg-red-500'
}

const TrainStatusCard = ({ onViewAllTrains = () => {} }) => {
  const trains = [
    { id: 'T1', status: 'On Time', route: 'Mumbai → Delhi' },
    { id: 'T2', status: 'Delayed', route: 'Chennai → Kolkata' },
    { id: 'T3', status: 'Blocked', route: 'Bangalore → Hyderabad' },
    { id: 'T4', status: 'Delayed', route: 'Ahmedabad → Pune' },
  ]

  return (
    <div className='bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden'>
      <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100'>
        <h3 className='font-bold text-gray-800 text-lg'>Train Status Overview</h3>
      </div>
      <ul className='divide-y divide-blue-100'>
        {trains.map((t) => (
          <li key={t.id} className='flex items-center justify-between px-6 py-4 hover:bg-blue-50 transition-colors'>
            <div className='flex items-center'>
              <div className={`h-3 w-3 rounded-full mr-3 ${statusDot(t.status)}`}></div>
              <div>
                <span className='font-bold text-gray-800'>{t.id}</span>
                <div className='text-xs text-gray-500'>{t.route}</div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(t.status)}`}>
              {t.status}
            </span>
          </li>
        ))}
      </ul>
      <div className='px-6 py-3 bg-blue-50 border-t border-blue-100'>
        <button onClick={onViewAllTrains} className='text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors'>
          View All Trains →
        </button>
      </div>
    </div>
  )
}

export default TrainStatusCard