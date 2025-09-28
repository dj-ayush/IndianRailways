// src/utils/simulationEngine.js
export class SimulationEngine {
  constructor() {
    this.state = {
      throughput: 92,
      avgDelay: 3.2,
      energyEfficiency: 87,
      activeTrains: 24,
      conflictsAvoided: 5,
      trains: [
        { id: 'T1', status: 'On Time', route: 'Mumbai → Delhi', delay: 0, position: 65 },
        { id: 'T2', status: 'Delayed', route: 'Chennai → Kolkata', delay: 8, position: 32 },
        { id: 'T3', status: 'On Time', route: 'Bangalore → Hyderabad', delay: 0, position: 78 },
        { id: 'T4', status: 'Delayed', route: 'Ahmedabad → Pune', delay: 5, position: 45 },
        { id: 'T5', status: 'On Time', route: 'Jaipur → Lucknow', delay: 0, position: 88 },
        { id: 'T6', status: 'On Time', route: 'Kolkata → Patna', delay: 0, position: 22 },
        { id: 'T7', status: 'Blocked', route: 'Delhi → Chandigarh', delay: 15, position: 10 }
      ],
      stations: [
        { id: 'S1', name: 'Mumbai Central', trains: 3, status: 'Normal' },
        { id: 'S2', name: 'New Delhi', trains: 5, status: 'Busy' },
        { id: 'S3', name: 'Chennai Central', trains: 2, status: 'Normal' },
        { id: 'S4', name: 'Howrah', trains: 4, status: 'Congested' },
        { id: 'S5', name: 'Bangalore City', trains: 2, status: 'Normal' }
      ],
      suggestions: [
        { 
          id: 1,
          action: 'Hold Train T5 at Station X for 5 min', 
          reason: 'Due to S12-block, rerouting advised',
          confidence: 92,
          accepted: null,
          impact: { throughput: 3, delay: -1.5, conflicts: 1 }
        }
      ],
      history: []
    };
    
    this.observers = [];
    this.isRunning = false;
    this.intervalId = null;
  }
  
  // Add observer for state changes
  subscribe(observer) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }
  
  // Notify all observers of state changes
  notify() {
    this.observers.forEach(observer => observer(this.state));
  }
  
  // Start the simulation
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.updateSimulation();
    }, 5000); // Update every 5 seconds
  }
  
  // Stop the simulation
  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  // Update simulation state
  updateSimulation() {
    // Simulate random events and gradual changes
    const randomChange = (min, max) => (Math.random() * (max - min) + min);
    
    // Update metrics with small random fluctuations
    this.state.throughput = Math.min(100, Math.max(70, 
      this.state.throughput + randomChange(-0.5, 1.0)));
    
    this.state.avgDelay = Math.max(0, 
      this.state.avgDelay + randomChange(-0.3, 0.8));
    
    this.state.energyEfficiency = Math.min(100, Math.max(75, 
      this.state.energyEfficiency + randomChange(-0.3, 0.5)));
    
    // Move trains along their routes
    this.state.trains = this.state.trains.map(train => {
      const speed = train.status === 'Delayed' ? 0.5 : 1;
      const newPosition = Math.min(100, train.position + speed);
      
      // Random delays can occur
      let newStatus = train.status;
      let newDelay = train.delay;
      
      if (Math.random() < 0.05 && train.status === 'On Time') {
        newStatus = 'Delayed';
        newDelay = Math.floor(Math.random() * 10) + 1;
      } else if (Math.random() < 0.1 && train.status === 'Delayed' && train.delay > 0) {
        newDelay = Math.max(0, train.delay - 1);
        if (newDelay === 0) newStatus = 'On Time';
      }
      
      return {
        ...train,
        position: newPosition,
        status: newStatus,
        delay: newDelay
      };
    });
    
    // Occasionally generate new suggestions
    if (Math.random() < 0.3 && this.state.suggestions.length < 3) {
      this.generateNewSuggestion();
    }
    
    // Add to history
    this.state.history.push({
      timestamp: new Date().toLocaleTimeString(),
      throughput: this.state.throughput,
      avgDelay: this.state.avgDelay,
      conflictsAvoided: this.state.conflictsAvoided
    });
    
    // Keep history to last 20 entries
    if (this.state.history.length > 20) {
      this.state.history.shift();
    }
    
    this.notify();
  }
  
  // Generate a new AI suggestion
  generateNewSuggestion() {
    const actions = [
      'Hold Train T{id} at Station {station} for {time} min',
      'Reroute Train T{id} via Alternate Route {route}',
      'Increase speed of Train T{id} by {speed}%',
      'Delay departure of Train T{id} by {time} min'
    ];
    
    const reasons = [
      'Due to S{sec}-block, rerouting advised',
      'To optimize throughput in sector {sec}',
      'Prevent potential congestion at station {station}',
      'Balance network load across sector {sec}'
    ];
    
    const action = actions[Math.floor(Math.random() * actions.length)]
      .replace('{id}', Math.floor(Math.random() * 7) + 1)
      .replace('{station}', String.fromCharCode(65 + Math.floor(Math.random() * 5)))
      .replace('{time}', Math.floor(Math.random() * 5) + 2)
      .replace('{route}', Math.floor(Math.random() * 5) + 1)
      .replace('{speed}', Math.floor(Math.random() * 20) + 10);
    
    const reason = reasons[Math.floor(Math.random() * reasons.length)]
      .replace('{sec}', Math.floor(Math.random() * 15) + 1)
      .replace('{station}', String.fromCharCode(65 + Math.floor(Math.random() * 5)));
    
    const newSuggestion = {
      id: Date.now(),
      action,
      reason,
      confidence: Math.floor(Math.random() * 15) + 80,
      accepted: null,
      impact: {
        throughput: Math.random() * 4 + 1,
        delay: -(Math.random() * 2 + 0.5),
        conflicts: 1
      }
    };
    
    this.state.suggestions.push(newSuggestion);
  }
  
  // Handle AI suggestion response
  respondToSuggestion(suggestionId, accepted) {
    const suggestionIndex = this.state.suggestions.findIndex(s => s.id === suggestionId);
    if (suggestionIndex === -1) return;
    
    this.state.suggestions[suggestionIndex].accepted = accepted;
    
    if (accepted) {
      const impact = this.state.suggestions[suggestionIndex].impact;
      this.state.throughput = Math.min(100, this.state.throughput + impact.throughput);
      this.state.avgDelay = Math.max(0, this.state.avgDelay + impact.delay);
      this.state.conflictsAvoided += impact.conflicts;
    }
    
    this.notify();
  }
  
  // Run optimization algorithm
  runOptimization() {
    // Simulate AI processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Apply significant improvements
        this.state.throughput = Math.min(100, this.state.throughput + (Math.random() * 5 + 2));
        this.state.avgDelay = Math.max(0, this.state.avgDelay - (Math.random() * 1.5 + 0.5));
        this.state.energyEfficiency = Math.min(100, this.state.energyEfficiency + (Math.random() * 3 + 1));
        this.state.conflictsAvoided += Math.floor(Math.random() * 2) + 1;
        
        // Fix some delayed trains
        this.state.trains = this.state.trains.map(train => {
          if (train.status === 'Delayed' && Math.random() > 0.5) {
            return { ...train, status: 'On Time', delay: 0 };
          }
          return train;
        });
        
        // Generate new predictions
        this.generateNewSuggestion();
        
        this.notify();
        resolve();
      }, 2000);
    });
  }
  
  // Get current state
  getState() {
    return { ...this.state };
  }
}

// Create a singleton instance
export const simulationEngine = new SimulationEngine();