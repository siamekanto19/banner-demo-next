'use client'
import React, { FC, useEffect, useState } from 'react'

type Props = {
  title: string
  active: boolean
}

const Progress: FC<Props> = ({ title, active }) => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const duration = 5000 // 5 seconds
    const interval = 10 // Update every 10ms for smoothness
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep += 1
      setPercentage(Math.min((currentStep / steps) * 100, 100))

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [active])

  return (
    <div className='w-full'>
      <h4 className={`${active ? 'text-orange-500' : 'text-neutral-700'}`}>
        {title}
      </h4>
      <div className='w-full h-1 bg-neutral-300 rounded-full overflow-hidden mt-2'>
        {active ? (
          <div
            className='h-full bg-orange-500 transition-all duration-[10ms] ease-linear rounded-full'
            style={{ width: `${percentage}%` }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Progress
