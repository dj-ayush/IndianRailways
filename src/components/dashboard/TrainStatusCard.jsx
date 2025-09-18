import React from 'react'

const statusColor = (status) => {
  if (status === 'On Time') return 'text-green-600'
  if (status === 'Delayed') return 'text-amber-600'
  return 'text-red-600'
}

const TrainStatusCard = () => {
  const trains = [
    { id: 'T1', status: 'On Time' },
    { id: 'T2', status: 'Delayed' },
    { id: 'T3', status: 'Blocked' },
    { id: 'T4', status: 'Delayed' },
  ]

  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm'>
      <div className='px-5 py-3 border-b border-gray-200'>
        <h3 className='font-[font2] text-gray-900'>Train Status</h3>
      </div>
      <ul className='divide-y'>
        {trains.map((t) => (
          <li key={t.id} className='flex items-center justify-between px-5 py-3'>
            <span className='font-[font2] text-gray-800'>{t.id}</span>
            <span className={'text-sm ' + statusColor(t.status)}>{t.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrainStatusCard


