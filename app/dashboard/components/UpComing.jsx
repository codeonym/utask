import React from 'react'
import Link from 'next/link'
import { TfiMoreAlt } from 'react-icons/tfi'

function UpComing({ tasks }) {
  return (
    <>
      <h2
        className='text-2xl flex font-bold flex-col gap-3 items-start'
      >
        Upcoming next week
        <span
          className="w-32 h-2 bg-yellow-300 rounded-full block"
        />
      </h2>
      <div
        className="
        overflow-auto
        max-h-64 mt-6
        scrollbar-thin 
        scrollbar-track-transparent 
      scrollbar-thumb-slate-300
        ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>date</th>
              <th>Progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {tasks.length !== 0
              ? tasks.map((item, idx) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.dueDate}</td>
                  <td>
                    You have completed
                    <span
                      className="badge badge-neutral ml-2" >
                      {item.progress}%
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/dashboard/tasks/${item._id}`}
                      className='btn btn-ghost hover:bg-slate-200'
                    >
                      <TfiMoreAlt />
                    </Link>
                  </td>
                </tr>
              ))
              : (
                <div>
                  No events for next week
                </div>
              )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UpComing