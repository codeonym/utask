import React from 'react'
import Link from 'next/link'
import { HiBellAlert } from "react-icons/hi2"


function UpcomingEvents({ day, bgColor, tasks }) {
  return (
    <>
      <h2
        className='text-2xl flex font-bold flex-col items-start gap-3'
      >
        <div className="flex gap-2 items-center">
          {day}&apos;s Events
          <span
            className='rounded-full text-xs flex items-center text-white bg-yellow-400 w-6 h-6 justify-center text-center'
          >
            {tasks.length}
          </span>
        </div>
        <span
          className="w-32 h-2 bg-yellow-300 rounded-full block"
        />
      </h2>
      <ul
        className='
      overflow-y-auto 
      scrollbar-thin 
      scrollbar-track-transparent 
      scrollbar-thumb-slate-300
      gap-1 
      flex 
      w-full
      flex-col
      items-center
      max-h-64
      mt-6
      px-4
      md:px-14
      lg:px-16
      '>
        {tasks.length !== 0 ? tasks?.map(item => (
          <li
            key={item._id}
            className={"bg-indigo-300 flex flex-wrap justify-between px-12 py-8 w-full max-w-md alert shadow-md shadow-slat-200 text-white " + bgColor}
          >
            <div
              className='flex flex-col items-center'
            >
              <HiBellAlert className="text-2xl" />
              <h3
                className='text-xl'
              >
                {item.dueDate}
              </h3>
            </div>
            <div>
              <h3
                className='font-bold text-xl'
              >{item.title}
              </h3>
              <div
                className='text-sm text-slate-100'
              >
                You have finished {item.progress}%
              </div>
            </div>
            <Link
              href={`/dashboard/tasks/${item._id}`}
              className='btn btn-sm hover:bg-slate-200'
            >
              See Task
            </Link>
          </li>
        ))
          : (
            <div
              className='h-full'
            >
              No tasks for {day}.
            </div>
          )}
      </ul >
    </>
  )
}

export default UpcomingEvents