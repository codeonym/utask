import React from 'react'

function LoadingSkeleton() {
  return (
    <section
      className='
      w-full
      h-full
      lg:p-48
      '
    >
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="skeleton h-1/6 w-full"></div>
        <div className="skeleton h-1/6 w-1/2"></div>
        <div className="skeleton h-1/6 w-1/2"></div>
        <div className="skeleton h-1/6 w-1/2"></div>
        <div className="skeleton h-1/6 w-full"></div>
        <div className="skeleton h-1/6 w-full"></div>
      </div>
    </section>
  )
}

export default LoadingSkeleton