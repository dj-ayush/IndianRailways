// Dashboard.jsx
import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import NetworkMapCard from '../components/dashboard/NetworkMapCard'
import TrainStatusCard from '../components/dashboard/TrainStatusCard'
import KPIStatsCard from '../components/dashboard/KPIStatsCard'
import ManorStatusCard from '../components/dashboard/ManorStatusCard'
import SuggestedActionsCard from '../components/dashboard/SuggestedActionsCard'
import AIControlPanel from '../components/dashboard/AIControlPanel'
import LoadingSpinner from '../components/common/LoadingSpinner'

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
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(null) // { type: 'trains' | 'map' | 'schedule' }
  const [tickets, setTickets] = useState([
    { pnr: '123451', passenger: 'John Doe', train: 'Rajdhani 12951', date: '2025-10-01', status: 'Confirmed' }
  ])
  const [schedules, setSchedules] = useState([
    { name: 'Rajdhani 12951', route: 'Delhi → Mumbai', dep: '10:00', arr: '18:30', status: 'On time' },
    { name: 'Shatabdi 12001', route: 'Delhi → Bhopal', dep: '09:15', arr: '14:10', status: 'On time' },
    { name: 'Duronto 12267', route: 'Mumbai → Ahmedabad', dep: '08:40', arr: '12:20', status: 'On time' }
  ])
  const navigate = useNavigate()
  
  const menuItems = useMemo(() => ([
    { id: 'overview', label: 'AI Overview', icon: 'chart-network' },
    { id: 'tickets', label: 'Tickets', icon: 'ticket' },
    { id: 'schedules', label: 'Schedules', icon: 'calendar-alt' },
    { id: 'passengers', label: 'Passengers', icon: 'users' },
    { id: 'reports', label: 'Reports', icon: 'chart-bar' },
    { id: 'settings', label: 'Settings', icon: 'cog' },
  ]), [])

  useEffect(() => {
    // Load user data
    const loadUserData = () => {
      try {
        const storedUserData = localStorage.getItem('ir_user_data')
        const authEmail = localStorage.getItem('ir_auth_email')
        
        if (storedUserData && authEmail) {
          const user = JSON.parse(storedUserData)
          setUserData(user)
        } else {
          // If no valid user data, redirect to login
          localStorage.removeItem('ir_auth_email')
          localStorage.removeItem('ir_user_data')
          navigate('/login')
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('ir_auth_email')
    localStorage.removeItem('ir_user_data')
    // notify app that auth changed
    window.dispatchEvent(new Event('ir-auth-changed'))
    navigate('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner message="Loading dashboard..." />
      </div>
    )
  }

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
                <p className="text-sm font-medium text-gray-800">
                  {userData?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {userData?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className='flex-1 h-screen overflow-y-auto bg-gray-50'>
          <DashboardHeader onLogout={handleLogout} />

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
                      <NetworkMapCard onExpand={() => setModal({ type: 'map' })} />
                    </div>
                  </div>
                  
                  <div className='space-y-6 lg:col-span-2'>
                    <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                      <h3 className="font-bold text-lg text-gray-800 mb-4">Train Status</h3>
                      <TrainStatusCard onViewAllTrains={() => setModal({ type: 'trains' })} />
                    </div>
                    
                    <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                      <h3 className="font-bold text-lg text-gray-800 mb-4">AI Suggestions</h3>
                      <SuggestedActionsCard 
                        onAccept={() => {
                          const toast = document.createElement('div')
                          toast.textContent = 'Suggestion accepted'
                          toast.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow'
                          document.body.appendChild(toast)
                          setTimeout(() => toast.remove(), 2000)
                        }}
                        onReject={() => {
                          const toast = document.createElement('div')
                          toast.textContent = 'Suggestion rejected'
                          toast.className = 'fixed bottom-6 right-6 bg-gray-700 text-white px-4 py-2 rounded shadow'
                          document.body.appendChild(toast)
                          setTimeout(() => toast.remove(), 2000)
                        }}
                      />
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <i className="fas fa-ticket-alt"></i>
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>Tickets</h3>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input className='px-3 py-2 border border-gray-300 rounded-lg text-sm' placeholder='Search PNR or passenger' />
                    <button 
                      onClick={() => {
                        const newTicket = {
                          pnr: String(100000 + Math.floor(Math.random() * 900000)),
                          passenger: 'New Passenger',
                          train: 'Express 10001',
                          date: new Date().toISOString().slice(0,10),
                          status: 'Confirmed'
                        }
                        setTickets(prev => [newTicket, ...prev])
                      }}
                      className='px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700'
                    >
                      New Ticket
                    </button>
                  </div>
                </div>
                <div className='overflow-auto border border-gray-200 rounded-lg'>
                  <table className='min-w-full text-sm'>
                    <thead className='bg-gray-50'>
                      <tr className='text-left text-gray-600'>
                        <th className='px-4 py-2'>PNR</th>
                        <th className='px-4 py-2'>Passenger</th>
                        <th className='px-4 py-2'>Train</th>
                        <th className='px-4 py-2'>Date</th>
                        <th className='px-4 py-2'>Status</th>
                        <th className='px-4 py-2'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map(t => (
                        <tr key={t.pnr} className='border-t'>
                          <td className='px-4 py-2'>{t.pnr}</td>
                          <td className='px-4 py-2'>{t.passenger}</td>
                          <td className='px-4 py-2'>{t.train}</td>
                          <td className='px-4 py-2'>{t.date}</td>
                          <td className='px-4 py-2'>
                            <span className='px-2 py-1 rounded text-xs bg-green-100 text-green-700'>{t.status}</span>
                          </td>
                          <td className='px-4 py-2 text-right'>
                            <button className='px-2 py-1 text-blue-600 hover:underline'>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {active === 'schedules' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center justify-between mb-4">
                  <div className='flex items-center gap-3'>
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>Schedules</h3>
                  </div>
                  <button onClick={() => setModal({ type: 'schedule' })} className='px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700'>Add Schedule</button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {["Rajdhani 12951","Shatabdi 12001","Duronto 12267"].map((name, idx) => (
                    <div key={idx} className='border border-gray-200 rounded-lg p-4'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='font-medium text-gray-800'>{name}</p>
                          <p className='text-xs text-gray-500'>Delhi → Mumbai</p>
                        </div>
                        <span className='px-2 py-1 text-xs rounded bg-amber-100 text-amber-700'>On time</span>
                      </div>
                      <div className='mt-3 flex items-center gap-2 text-xs text-gray-600'>
                        <span><i className='far fa-clock mr-1'></i>Dep 10:00</span>
                        <span>•</span>
                        <span><i className='far fa-clock mr-1'></i>Arr 18:30</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === 'passengers' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center justify-between mb-4">
                  <div className='flex items-center gap-3'>
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <i className="fas fa-users"></i>
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>Passengers</h3>
                  </div>
                  <input className='px-3 py-2 border border-gray-300 rounded-lg text-sm' placeholder='Search by name or email' />
                </div>
                <ul className='divide-y border border-gray-200 rounded-lg'>
                  {[{name:'John Doe',email:'john@example.com'},{name:'Anita Singh',email:'anita@example.com'},{name:'Rahul Verma',email:'rahul@example.com'}].map((p, idx) => (
                    <li key={idx} className='flex items-center justify-between px-4 py-3'>
                      <div>
                        <p className='text-sm font-medium text-gray-800'>{p.name}</p>
                        <p className='text-xs text-gray-500'>{p.email}</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <button className='px-2 py-1 text-blue-600 hover:underline text-sm'>View</button>
                        <button className='px-2 py-1 text-gray-600 hover:underline text-sm'>History</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {active === 'reports' && (
              <div className='bg-white rounded-xl p-5 border border-gray-200 shadow-sm'>
                <div className="flex items-center justify-between mb-4">
                  <div className='flex items-center gap-3'>
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <i className="fas fa-chart-bar"></i>
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>Reports</h3>
                  </div>
                  <button
                    onClick={() => {
                      const rows = [
                        ['Metric','Value','Trend'],
                        ['Ridership','1.2M','+4.2%'],
                        ['Revenue','₹42.5Cr','+2.1%'],
                        ['Punctuality','91%','+1.3%']
                      ]
                      const csv = rows.map(r => r.map(v => '"' + String(v).replaceAll('"','""') + '"').join(',')).join('\n')
                      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'reports.csv'
                      document.body.appendChild(a)
                      a.click()
                      a.remove()
                      URL.revokeObjectURL(url)
                    }}
                    className='px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700'
                  >
                    Export CSV
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {[
                    {title:'Ridership', value:'1.2M', trend:'+4.2%'},
                    {title:'Revenue', value:'₹42.5Cr', trend:'+2.1%'},
                    {title:'Punctuality', value:'91%', trend:'+1.3%'}
                  ].map((r, idx) => (
                    <div key={idx} className='border border-gray-200 rounded-lg p-4'>
                      <p className='text-xs text-gray-500 uppercase tracking-wider'>{r.title}</p>
                      <div className='mt-2 flex items-end gap-2'>
                        <span className='text-2xl font-bold text-gray-800'>{r.value}</span>
                        <span className='text-xs text-green-600'>{r.trend}</span>
                      </div>
                    </div>
                  ))}
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const toast = document.createElement('div')
                    toast.textContent = 'Settings saved'
                    toast.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow'
                    document.body.appendChild(toast)
                    setTimeout(() => toast.remove(), 2000)
                  }}
                  className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'
                >
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
                    <button type='submit' className='mt-2 rounded-lg bg-blue-600 text-white px-4 py-2.5 hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md'>
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
      {modal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl shadow-xl border border-gray-200 w-[90vw] max-w-3xl max-h-[85vh] overflow-auto'>
            <div className='flex items-center justify-between px-5 py-3 border-b'>
              <h4 className='font-bold text-gray-800'>
                {modal.type === 'trains' && 'All Trains'}
                {modal.type === 'map' && 'Expanded Map'}
                {modal.type === 'schedule' && 'Add Schedule'}
              </h4>
              <button onClick={() => setModal(null)} className='text-gray-600 hover:text-gray-900'>
                <i className='fas fa-times'></i>
              </button>
            </div>
            <div className='p-5'>
              {modal.type === 'trains' && (
                <ul className='divide-y'>
                  {['T1 Mumbai → Delhi','T2 Chennai → Kolkata','T3 Bangalore → Hyderabad','T4 Ahmedabad → Pune'].map((t, i) => (
                    <li key={i} className='py-3 text-sm text-gray-700'>{t}</li>
                  ))}
                </ul>
              )}
              {modal.type === 'map' && (
                <div className='rounded-lg overflow-hidden'>
                  <video src='/video2.mp4' autoPlay loop muted playsInline className='w-full h-[60vh] object-cover' />
                </div>
              )}
              {modal.type === 'schedule' && (
                <form
                  className='grid grid-cols-1 sm:grid-cols-2 gap-4'
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const name = form.trainName.value.trim()
                    const route = form.route.value.trim()
                    const dep = form.dep.value.trim()
                    const arr = form.arr.value.trim()
                    if (!name || !route || !dep || !arr) return
                    setSchedules(prev => [{ name, route, dep, arr, status: 'On time' }, ...prev])
                    setModal(null)
                    const toast = document.createElement('div')
                    toast.textContent = 'Schedule added'
                    toast.className = 'fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow'
                    document.body.appendChild(toast)
                    setTimeout(() => toast.remove(), 2000)
                  }}
                >
                  <label className='flex flex-col text-sm'>
                    <span className='text-gray-600 mb-1'>Train name/number</span>
                    <input name='trainName' className='px-3 py-2 border border-gray-300 rounded-lg' placeholder='e.g., Rajdhani 12951' />
                  </label>
                  <label className='flex flex-col text-sm'>
                    <span className='text-gray-600 mb-1'>Route</span>
                    <input name='route' className='px-3 py-2 border border-gray-300 rounded-lg' placeholder='e.g., Delhi → Mumbai' />
                  </label>
                  <label className='flex flex-col text-sm'>
                    <span className='text-gray-600 mb-1'>Departure</span>
                    <input name='dep' className='px-3 py-2 border border-gray-300 rounded-lg' placeholder='HH:MM' />
                  </label>
                  <label className='flex flex-col text-sm'>
                    <span className='text-gray-600 mb-1'>Arrival</span>
                    <input name='arr' className='px-3 py-2 border border-gray-300 rounded-lg' placeholder='HH:MM' />
                  </label>
                  <div className='sm:col-span-2'>
                    <button type='submit' className='mt-2 rounded-lg bg-blue-600 text-white px-4 py-2.5 hover:bg-blue-700'>Save</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard