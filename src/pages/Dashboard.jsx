// Dashboard.jsx
import React, { useMemo, useState } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import NetworkMapCard from '../components/dashboard/NetworkMapCard'
import TrainStatusCard from '../components/dashboard/TrainStatusCard'
import KPIStatsCard from '../components/dashboard/KPIStatsCard'
import ManorStatusCard from '../components/dashboard/ManorStatusCard'
import SuggestedActionsCard from '../components/dashboard/SuggestedActionsCard'
import AIControlPanel from '../components/dashboard/AIControlPanel'

const StatCard = ({ title, value, trend, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600'
  }

  const trendColor = trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
  
  return (
    <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-xs text-gray-500 uppercase tracking-wider font-medium'>{title}</p>
          <div className='mt-2 flex items-end'>
            <h3 className='font-bold text-2xl text-gray-800'>{value}</h3>
            <span className={`text-xs px-2 py-1 rounded-md ml-2 font-medium ${trendColor}`}>{trend}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <i className={`fas fa-${icon} text-lg`}></i>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const [active, setActive] = useState('overview')
  const menuItems = useMemo(() => ([
    { id: 'overview', label: 'AI Overview', icon: 'chart-network' },
    { id: 'tickets', label: 'Tickets', icon: 'ticket' },
    { id: 'schedules', label: 'Schedules', icon: 'calendar-alt' },
    { id: 'passengers', label: 'Passengers', icon: 'users' },
    { id: 'reports', label: 'Reports', icon: 'chart-bar' },
    { id: 'settings', label: 'Settings', icon: 'cog' },
  ]), [])

  const NavLink = ({ id, children, icon }) => (
    <button
      onClick={() => setActive(id)}
      className={'w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ' + 
        (active === id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800')}
    >
      <i className={`fas fa-${icon} w-5 text-center`}></i>
      <span>{children}</span>
    </button>
  )

  return (
    <div className='relative min-h-screen w-screen bg-gray-50 text-gray-800 overflow-hidden'>
      <div className='relative w-full flex'>
        <aside className='hidden lg:flex flex-col w-64 h-screen border-r border-gray-200 bg-white shadow-sm'>
          <div className='px-5 py-6 flex items-center gap-3 border-b border-gray-200'>
            <div className='h-9 w-9 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white text-xl'>
              <i className="fas fa-train"></i>
            </div>
            <div>
              <h1 className='font-bold text-lg text-gray-800'>Indian Railways</h1>
              <p className='text-xs text-gray-500'>AI Traffic Control</p>
            </div>
          </div>
          <nav className='px-3 mt-5 space-y-2 text-sm'>
            {menuItems.map(item => (
              <NavLink key={item.id} id={item.id} icon={item.icon}>{item.label}</NavLink>
            ))}
          </nav>
          
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">System Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        <main className='flex-1 h-screen overflow-y-auto bg-gray-50'>
          <DashboardHeader onLogout={() => { localStorage.removeItem('ir_auth_email'); window.location.assign('/login') }} />

          <div className='p-5 lg:p-8'>
            {active === 'overview' && (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">AI-Powered Traffic Control</h1>
                  <p className="text-gray-600">Maximizing section throughput through predictive analytics</p>
                </div>
                
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
                  <StatCard title="Current Throughput" value="92%" trend="+2.4%" icon="tachometer-alt" color="blue" />
                  <StatCard title="Avg. Delay (min)" value="3.2" trend="-1.1" icon="clock" color="green" />
                  <StatCard title="Energy Efficiency" value="87%" trend="+0.8%" icon="bolt" color="yellow" />
                </div>
                
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6'>
                  <div className='lg:col-span-2'>
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-800">Network Status</h3>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          <span className="text-xs text-gray-600">Operational</span>
                        </div>
                      </div>
                      <NetworkMapCard />
                    </div>
                  </div>
                  
                  <div className='space-y-6 lg:col-span-2'>
                    <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                      <h3 className="font-bold text-lg text-gray-800 mb-4">Train Status</h3>
                      <TrainStatusCard />
                    </div>
                    
                    <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                      <h3 className="font-bold text-lg text-gray-800 mb-4">AI Suggestions</h3>
                      <SuggestedActionsCard />
                    </div>
                  </div>
                </div>
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                  <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Performance Metrics</h3>
                    <KPIStatsCard />
                  </div>
                  
                  <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Maintenance Status</h3>
                    <ManorStatusCard />
                  </div>
                </div>
                
                <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                  <h3 className="font-bold text-lg text-gray-800 mb-4">AI Control Panel</h3>
                  <AIControlPanel />
                </div>
              </>
            )}

            {active === 'tickets' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <i className="fas fa-ticket-alt"></i>
                  </div>
                  <h3 className='font-bold text-lg text-gray-800'>Tickets Management</h3>
                </div>
                <p className='text-sm text-gray-600 mb-4'>Ticket management panel coming soon. Filter, export, and refund tickets.</p>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'schedules' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <h3 className='font-bold text-lg text-gray-800'>Schedules & Timetables</h3>
                </div>
                <p className='text-sm text-gray-600 mb-4'>View and edit timetables. Real-time adjustments reflected on passenger app.</p>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'passengers' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className='font-bold text-lg text-gray-800'>Passenger Management</h3>
                </div>
                <p className='text-sm text-gray-600 mb-4'>Search passengers, view histories, and handle KYC/verification.</p>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'reports' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <h3 className='font-bold text-lg text-gray-800'>Analytics & Reports</h3>
                </div>
                <p className='text-sm text-gray-600 mb-4'>Generate monthly ridership, revenue, and punctuality reports.</p>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'settings' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <i className="fas fa-cog"></i>
                  </div>
                  <h3 className='font-bold text-lg text-gray-800'>System Settings</h3>
                </div>
                <form className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                  <label className='flex flex-col gap-1'>
                    <span className='text-gray-600 text-xs uppercase tracking-wider font-medium'>Organization name</span>
                    <input 
                      className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all' 
                      defaultValue='Indian Railways'
                    />
                  </label>
                  <label className='flex flex-col gap-1'>
                    <span className='text-gray-600 text-xs uppercase tracking-wider font-medium'>Default timezone</span>
                    <select className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'>
                      <option>Asia/Kolkata (IST)</option>
                      <option>UTC</option>
                    </select>
                  </label>
                  <label className='flex items-center gap-2 sm:col-span-2 mt-2'>
                    <input 
                      type='checkbox' 
                      className='h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
                    />
                    <span className='text-gray-600'>Enable service disruption alerts</span>
                  </label>
                  <label className='flex items-center gap-2 sm:col-span-2'>
                    <input 
                      type='checkbox' 
                      className='h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
                    />
                    <span className='text-gray-600'>Enable AI predictive scheduling</span>
                  </label>
                  <label className='flex items-center gap-2 sm:col-span-2'>
                    <input 
                      type='checkbox' 
                      className='h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
                    />
                    <span className='text-gray-600'>Enable automatic throughput optimization</span>
                  </label>
                  <div className='sm:col-span-2'>
                    <button className='mt-2 rounded-lg bg-blue-600 text-white px-4 py-2.5 hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md'>
                      Save changes
                    </button>
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