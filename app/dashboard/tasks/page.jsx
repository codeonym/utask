import React from 'react'
import TaskCard from "@dashboard/tasks/components/TaskCard"
import { getTasks } from "@lib/fetchResource"

async function TaskPage() {
  const tasks = await getTasks()
  return (
    <section
      className='
      h-full w-full p-4 
      lg:container mx-auto 
      pb-12 text-slate-500
      '
    >
      <h2
        className='text-2xl p-4 flex font-bold flex-col gap-3 items-start'
      >
        Your Tasks
        <span
          className="w-32 h-2 bg-yellow-300 rounded-full block"
        />
      </h2>
      <div
        className='
        flex items-center flex-wrap justify-center gap-2
        '
      >
        {/* Filters and search here */}
        <form className="join">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="Search" />
            </div>
          </div>
          <select className="select select-bordered join-item">
            <option disabled selected>Status</option>
            <option>Ongoing</option>
            <option>Done</option>
            <option>Missed</option>
          </select>
          <select className="select select-bordered join-item">
            <option disabled selected>title</option>
            <option>Alphabets [A-Z]</option>
            <option>Alphabets [Z-A]</option>
          </select>
          <select className="select select-bordered join-item">
            <option disabled selected>Time</option>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
          <button className="btn join-item">Search</button>
        </form>
        <div className="gap-1 flex">
          <button
            className='badge badge-neutral px-4 py-3'
          >
            High
          </button>
          <button
            className='badge badge-accent px-4 py-3'
          >
            Medium
          </button>
          <button
            className='badge badge-secondary px-4 py-3'
          >
            low
          </button>
        </div>
      </div>
      <div
        className='
        '
      >
        <ul
          className='
          flex flex-wrap
          items-center justify-center gap-x-12 gap-y-12
          pt-8
          '>
          {/* Task Cards Here Including Edit Delete View custom  Buttons */}
          {tasks.map((item) =>
          (
            <li key={item._id}>
              <TaskCard
                id={item._id}
                title={item.title}
                description={item.description}
                status={item.status}
                priority={item.priority}
              />
            </li>
          )
          )}
        </ul>
      </div>
    </section>
  )
}

export default TaskPage