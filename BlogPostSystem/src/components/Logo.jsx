import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div>
      <img 
        src="/log.jpg" 
        alt="Logo" 
        style={{ width: width }} 
        className="object-contain"
      />
    </div>
  )
}

export default Logo