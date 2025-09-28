import React from 'react'

const LoadingSpinner = ({ message = "Loading...", size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  )
}

export default LoadingSpinner
