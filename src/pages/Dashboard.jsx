import React, { useMemo, useState } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import NetworkMapCard from '../components/dashboard/NetworkMapCard'
import TrainStatusCard from '../components/dashboard/TrainStatusCard'
import KPIStatsCard from '../components/dashboard/KPIStatsCard'
import ManorStatusCard from '../components/dashboard/ManorStatusCard'
import SuggestedActionsCard from '../components/dashboard/SuggestedActionsCard'

const StatCard = ({ title, value, trend }) => {
  return (
    <div className='rounded-xl border border-black/5 bg-white p-5 shadow-sm'>
      <p className='text-xs text-gray-500'>{title}</p>
      <div className='mt-2 flex items-end justify-between'>
        <h3 className='font-[font2] text-3xl'>{value}</h3>
        <span className={'text-xs px-2 py-1 rounded-md ' + (trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>{trend}</span>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const [active, setActive] = useState('overview')
  const menuItems = useMemo(() => ([
    { id: 'overview', label: 'Overview' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'schedules', label: 'Schedules' },
    { id: 'passengers', label: 'Passengers' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ]), [])

  const NavLink = ({ id, children }) => (
    <button
      onClick={() => setActive(id)}
      className={'w-full text-left block px-3 py-2 rounded-md transition-colors cursor-pointer text-black ' + (active === id ? 'bg-gray-100' : 'hover:bg-gray-100')}
    >{children}</button>
  )

  return (
    <div className='relative h-screen w-screen bg-black text-white overflow-hidden'>
      <div className='relative h-full w-full flex bg-gray-50'>
        <aside className='hidden lg:flex flex-col w-64 h-full border-r border-gray-200 bg-white'>
          <div className='px-5 py-6 flex items-center gap-3'>
            <div className='h-9 w-9 rounded-md bg-[#0b1426] flex items-center justify-center font-[font2] text-xl'>IR</div>
            <h1 className='font-[font2] text-xl text-black'>Indian Railways</h1>
          </div>
          <nav className='px-3 mt-2 space-y-1 text-sm text-black'>
            {menuItems.map(item => (
              <NavLink key={item.id} id={item.id}>{item.label}</NavLink>
            ))}
          </nav>
        </aside>

        <main className='flex-1 h-full overflow-y-auto bg-gray-50'>
          <DashboardHeader onLogout={() => { localStorage.removeItem('ir_auth_email'); window.location.assign('/login') }} />

          <div className='p-5 lg:p-8'>
            {active === 'overview' && (
              <>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                  <div className='lg:col-span-2 space-y-4'>
                    <NetworkMapCard />
                    <KPIStatsCard />
                    <ManorStatusCard />
                  </div>
                  <div className='space-y-4'>
                    <TrainStatusCard />
                    <SuggestedActionsCard />
                  </div>
                </div>
              </>
            )}

            {active === 'tickets' && (
              <div className='rounded-xl border border-black/5 bg-white p-5 shadow-sm text-black'>
                <h3 className='font-[font2] text-lg'>Tickets</h3>
                <p className='text-sm text-gray-600 mt-2'>Ticket management panel coming soon. Filter, export, and refund tickets.</p>
              </div>
            )}

            {active === 'schedules' && (
              <div className='rounded-xl border border-black/5 bg-white p-5 shadow-sm text-black'>
                <h3 className='font-[font2] text-lg'>Schedules</h3>
                <p className='text-sm text-gray-600 mt-2'>View and edit timetables. Real-time adjustments reflected on passenger app.</p>
              </div>
            )}

            {active === 'passengers' && (
              <div className='rounded-xl border border-black/5 bg-white p-5 shadow-sm text-black'>
                <h3 className='font-[font2] text-lg'>Passengers</h3>
                <p className='text-sm text-gray-600 mt-2'>Search passengers, view histories, and handle KYC/verification.</p>
              </div>
            )}

            {active === 'reports' && (
              <div className='rounded-xl border border-black/5 bg-white p-5 shadow-sm text-black'>
                <h3 className='font-[font2] text-lg'>Reports</h3>
                <p className='text-sm text-gray-600 mt-2'>Generate monthly ridership, revenue, and punctuality reports.</p>
              </div>
            )}

            {active === 'settings' && (
              <div className='rounded-xl border border-black/5 bg-white p-5 shadow-sm text-black'>
                <h3 className='font-[font2] text-lg'>Settings</h3>
                <form className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                  <label className='flex flex-col gap-1'>
                    <span className='text-gray-600'>Organization name</span>
                    <input className='rounded-lg border border-gray-300 px-3 py-2 outline-none' defaultValue='Indian Railways'/>
                  </label>
                  <label className='flex flex-col gap-1'>
                    <span className='text-gray-600'>Default timezone</span>
                    <select className='rounded-lg border border-gray-300 px-3 py-2 outline-none'>
                      <option>Asia/Kolkata (IST)</option>
                      <option>UTC</option>
                    </select>
                  </label>
                  <label className='flex items-center gap-2 sm:col-span-2 mt-2'>
                    <input type='checkbox' className='h-4 w-4'/>
                    <span className='text-gray-600'>Enable service disruption alerts</span>
                  </label>
                  <div className='sm:col-span-2'>
                    <button className='mt-2 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700'>Save changes</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard


