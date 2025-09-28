import React, { createContext, useContext, useState, useEffect } from 'react'

const SimulationContext = createContext()

export const SimulationProvider = ({ children }) => {
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

  const value = {
    simulationData,
    setSimulationData,
    isOptimizing,
    simulationHistory,
    runOptimization,
    handleSuggestionResponse
  }

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulation = () => {
  const context = useContext(SimulationContext)
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider')
  }
  return context
}

export default SimulationContext
