
import React, { useState, useEffect } from 'react'

const AIControlPanel = () => {
  const [aiStatus, setAiStatus] = useState('active')
  const [optimizationLevel, setOptimizationLevel] = useState(85)
  const [simulationData, setSimulationData] = useState({
    throughput: 92,
    avgDelay: 3.2,
    energyEfficiency: 87,
    activeTrains: 24,
    conflictsAvoided: 5,
    predictions: [
      { type: 'throughput', value: 12, trend: 'increase', time: 'next hour' },
      { type: 'congestion', value: 'B-12', time: '23 minutes' },
      { type: 'energy', value: 7.3, trend: 'optimized', comparison: 'yesterday' }
    ],
    trainStatus: [
      { id: 'T1', status: 'On Time', route: 'Mumbai → Delhi', delay: 0 },
      { id: 'T2', status: 'Delayed', route: 'Chennai → Kolkata', delay: 8 },
      { id: 'T3', status: 'On Time', route: 'Bangalore → Hyderabad', delay: 0 },
      { id: 'T4', status: 'Delayed', route: 'Ahmedabad → Pune', delay: 5 },
      { id: 'T5', status: 'On Time', route: 'Jaipur → Lucknow', delay: 0 }
    ],
    suggestions: [
      { 
        action: 'Hold Train T5 at Station X for 5 min', 
        reason: 'Due to S12-block, rerouting advised',
        confidence: 92,
        accepted: null
      }
    ]
  })

  const [isOptimizing, setIsOptimizing] = useState(false)
  const [simulationHistory, setSimulationHistory] = useState([])

  // Simulate ML model processing
  const runOptimization = () => {
    setIsOptimizing(true)
    
    // Simulate processing time
    setTimeout(() => {
      const newThroughput = Math.min(100, simulationData.throughput + (Math.random() * 5))
      const newDelay = Math.max(0, simulationData.avgDelay - (Math.random() * 1.5))
      const newEnergy = Math.min(100, simulationData.energyEfficiency + (Math.random() * 2))
      const newConflicts = simulationData.conflictsAvoided + Math.floor(Math.random() * 2)
      
      // Generate new predictions
      const newPredictions = [
        { 
          type: 'throughput', 
          value: Math.floor(Math.random() * 10) + 5, 
          trend: 'increase', 
          time: 'next hour' 
        },
        { 
          type: 'congestion', 
          value: `Sector ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}-${Math.floor(Math.random() * 20) + 1}`, 
          time: `${Math.floor(Math.random() * 30) + 10} minutes` 
        },
        { 
          type: 'energy', 
          value: (Math.random() * 5 + 5).toFixed(1), 
          trend: 'optimized', 
          comparison: 'yesterday' 
        }
      ]
      
      // Update train statuses (simulate some improvements)
      const updatedTrains = simulationData.trainStatus.map(train => {
        if (train.status === 'Delayed' && Math.random() > 0.7) {
          return { ...train, status: 'On Time', delay: 0 }
        }
        if (train.status === 'On Time' && Math.random() > 0.9) {
          const delay = Math.floor(Math.random() * 10) + 1
          return { ...train, status: 'Delayed', delay }
        }
        return train
      })
      
      // Generate new suggestions
      const newSuggestions = [
        { 
          action: `Hold Train T${Math.floor(Math.random() * 8) + 1} at Station ${String.fromCharCode(65 + Math.floor(Math.random() * 5))} for ${Math.floor(Math.random() * 5) + 2} min`, 
          reason: `Due to S${Math.floor(Math.random() * 15) + 1}-block, rerouting advised`,
          confidence: Math.floor(Math.random() * 15) + 80,
          accepted: null
        }
      ]
      
      setSimulationData(prev => ({
        ...prev,
        throughput: newThroughput,
        avgDelay: newDelay,
        energyEfficiency: newEnergy,
        conflictsAvoided: newConflicts,
        predictions: newPredictions,
        trainStatus: updatedTrains,
        suggestions: newSuggestions
      }))
      
      // Add to history
      setSimulationHistory(prev => [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          throughput: newThroughput,
          delay: newDelay,
          conflicts: newConflicts
        }
      ])
      
      setIsOptimizing(false)
    }, 2000)
  }

  const handleSuggestionResponse = (index, accepted) => {
    setSimulationData(prev => {
      const newSuggestions = [...prev.suggestions]
      newSuggestions[index].accepted = accepted
      
      // Update metrics based on acceptance
      let newThroughput = prev.throughput
      let newDelay = prev.avgDelay
      let newConflicts = prev.conflictsAvoided
      
      if (accepted) {
        newThroughput = Math.min(100, prev.throughput + (Math.random() * 3 + 2))
        newDelay = Math.max(0, prev.avgDelay - (Math.random() * 1.2 + 0.5))
        newConflicts = prev.conflictsAvoided + 1
      } else {
        newThroughput = Math.max(70, prev.throughput - (Math.random() * 2))
        newDelay = prev.avgDelay + (Math.random() * 1.5)
      }
      
      return {
        ...prev,
        suggestions: newSuggestions,
        throughput: newThroughput,
        avgDelay: newDelay,
        conflictsAvoided: newConflicts
      }
    })
  }

  // Initialize with some history data
  useEffect(() => {
    const initialHistory = []
    const now = new Date()
    for (let i = 6; i > 0; i--) {
      const time = new Date(now.getTime() - i * 10 * 60000)
      initialHistory.push({
        timestamp: time.toLocaleTimeString(),
        throughput: 75 + Math.random() * 20,
        delay: 2 + Math.random() * 8,
        conflicts: Math.floor(Math.random() * 3)
      })
    }
    setSimulationHistory(initialHistory)
  }, [])

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
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Performance Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-center">
              <div className="text-xl font-bold text-blue-600">{simulationData.throughput.toFixed(1)}%</div>
              <div className="text-xs text-gray-600">Throughput</div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-center">
              <div className="text-xl font-bold text-green-600">{simulationData.avgDelay.toFixed(1)} min</div>
              <div className="text-xs text-gray-600">Avg. Delay</div>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-center">
              <div className="text-xl font-bold text-amber-600">{simulationData.conflictsAvoided}</div>
              <div className="text-xs text-gray-600">Conflicts Avoided</div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-center">
              <div className="text-xl font-bold text-purple-600">{simulationData.activeTrains}</div>
              <div className="text-xs text-gray-600">Active Trains</div>
            </div>
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
          {simulationData.predictions.map((prediction, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
              <div className={`h-6 w-6 rounded-full ${
                prediction.type === 'throughput' ? 'bg-green-100' : 
                prediction.type === 'congestion' ? 'bg-amber-100' : 'bg-blue-100'
              } flex items-center justify-center mt-0.5 flex-shrink-0`}>
                <i className={`fas ${
                  prediction.type === 'throughput' ? 'fa-arrow-up text-green-600' : 
                  prediction.type === 'congestion' ? 'fa-exclamation-triangle text-amber-600' : 'fa-bolt text-blue-600'
                } text-xs`}></i>
              </div>
              <div>
                <span className="font-medium text-gray-800">
                  {prediction.type === 'throughput' ? 'Throughput Increase: ' : 
                   prediction.type === 'congestion' ? 'Congestion Alert: ' : 'Energy Efficiency: '}
                </span>
                <span className="text-gray-600">
                  {prediction.type === 'throughput' ? `Expected ${prediction.value}% increase in ${prediction.time}` : 
                   prediction.type === 'congestion' ? `Potential congestion in ${prediction.value} in ${prediction.time}` : 
                   `Optimized by ${prediction.value}% compared to ${prediction.comparison}`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
            <i className="fas fa-lightbulb"></i>
          </div>
          <span>AI Suggestions</span>
        </h4>
        <div className="space-y-4">
          {simulationData.suggestions.map((suggestion, index) => (
            <div key={index} className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="font-medium text-gray-800">{suggestion.action}</p>
              <p className="text-sm text-gray-600 mt-1">{suggestion.reason}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-gray-500">
                  Confidence: <span className="font-semibold">{suggestion.confidence}%</span>
                </div>
                {suggestion.accepted === null ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleSuggestionResponse(index, true)}
                      className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-medium transition-colors"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleSuggestionResponse(index, false)}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    suggestion.accepted 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {suggestion.accepted ? 'Accepted' : 'Rejected'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={runOptimization}
          disabled={isOptimizing || aiStatus !== 'active'}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 ${
            isOptimizing || aiStatus !== 'active'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
          }`}
        >
          {isOptimizing ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i>
              Optimizing...
            </>
          ) : (
            <>
              <i className="fas fa-sync-alt"></i>
              Run Optimization
            </>
          )}
        </button>
        <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all border border-gray-200 flex items-center gap-2">
          <i className="fas fa-chart-line"></i>
          View Analytics
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Optimization History</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Time</th>
                <th className="text-right py-2">Throughput</th>
                <th className="text-right py-2">Avg. Delay</th>
                <th className="text-right py-2">Conflicts Avoided</th>
              </tr>
            </thead>
            <tbody>
              {simulationHistory.slice().reverse().map((record, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{record.timestamp}</td>
                  <td className="text-right py-2 font-medium">{record.throughput.toFixed(1)}%</td>
                  <td className="text-right py-2">{record.delay.toFixed(1)} min</td>
                  <td className="text-right py-2">{record.conflicts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <i className="fas fa-info-circle mr-2 text-blue-500"></i>
        Last optimized: {new Date().toLocaleTimeString()} | Next scheduled: {new Date(Date.now() + 30*60000).toLocaleTimeString()}
      </div>
    </div>
  )
}

export default AIControlPanel