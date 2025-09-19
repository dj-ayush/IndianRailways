import React, { useState } from 'react'

const AIControlPanel = () => {
  const [aiStatus, setAiStatus] = useState('active')
  const [optimizationLevel, setOptimizationLevel] = useState(85)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${aiStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></div>
          <span className="text-sm font-medium text-gray-700">AI Control Status: </span>
          <span className={`text-sm font-semibold ${aiStatus === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
            {aiStatus === 'active' ? 'Active' : 'Standby'}
          </span>
        </div>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            aiStatus === 'active' 
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
          onClick={() => setAiStatus(aiStatus === 'active' ? 'standby' : 'active')}
        >
          {aiStatus === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Optimization Level</h4>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={optimizationLevel} 
              onChange={(e) => setOptimizationLevel(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
            <span className="text-lg font-bold text-blue-600 min-w-[3rem]">{optimizationLevel}%</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Higher values prioritize throughput over energy savings
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Current Focus</h4>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-blue-700">Throughput Maximization</span>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            AI is currently prioritizing train flow efficiency
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <i className="fas fa-brain"></i>
          </div>
          <span>AI Predictions & Insights</span>
        </h4>
        <ul className="text-sm space-y-3">
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <i className="fas fa-arrow-up text-green-600 text-xs"></i>
            </div>
            <div>
              <span className="font-medium text-gray-800">Throughput Increase: </span>
              <span className="text-gray-600">Expected 12% increase in next hour</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-amber-600 text-xs"></i>
            </div>
            <div>
              <span className="font-medium text-gray-800">Congestion Alert: </span>
              <span className="text-gray-600">Potential congestion in Sector B-12 in 23 minutes</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <i className="fas fa-bolt text-blue-600 text-xs"></i>
            </div>
            <div>
              <span className="font-medium text-gray-800">Energy Efficiency: </span>
              <span className="text-gray-600">Optimized by 7.3% compared to yesterday</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <i className="fas fa-sync-alt"></i>
          Run Optimization
        </button>
        <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all border border-gray-200 flex items-center gap-2">
          <i className="fas fa-chart-line"></i>
          View Analytics
        </button>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <i className="fas fa-info-circle mr-2 text-blue-500"></i>
        Last optimized: Today at 14:32 | Next scheduled: 16:00
      </div>
    </div>
  )
}

export default AIControlPanel