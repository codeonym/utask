import React from 'react'
import Link from 'next/link'
import { IoMdExpand } from "react-icons/io"
import { cn } from '@lib/cn'

const HIGH_PRIORITY = 'badge-neutral'
const MEDIUM_PRIORITY = 'badge-accent'
const LOW_PRIORITY = 'badge-secondary'

const DONE_BADGE = 'badge-accent'
const ONGOING_BADGE = 'badge-info'
const MISSED_BADGE = 'badge-error'

function TaskCard({ title, description, id, priority, status }) {

  const getPriorityLevel = (priority) => {
    return priority.toLowerCase() === "high"
      ? HIGH_PRIORITY
      : priority.toLowerCase() === "medium"
        ? MEDIUM_PRIORITY
        : LOW_PRIORITY
  }

  const getBadgeInfo = (badge) => {
    return badge.toLowerCase() === "done"
      ? DONE_BADGE
      : badge.toLowerCase() === "ongoing"
        ? ONGOING_BADGE
        : MISSED_BADGE
  }
  return (
    <div
      className='
      w-80 h-48 bg-slate-600
      rounded-md shadow-md shadow-slate-300
      text-white indicator
      flex flex-col items-center justify-center
      p-4
      '>
      <span
        className={cn('indicator-item indicator-center badge py-4 px-6', getPriorityLevel(priority))}
      >
        {priority}
      </span>
      <Link
        href={`/dashboard/tasks/${id}`}
        className='indicator-item indicator-bottom text-slate-600 flex items-center gap-2 font-bold shadow-md shadow-slate-300  bg-yellow-300 hover:bg-yellow-400 py-3 px-4'
      >
        <IoMdExpand /> View task
      </Link>
      <h2
        className='
        font-bold text-xl
        '
      >
        {title}
      </h2>
      <div>
        <p
          className='
          text-justify text-sm text-slate-200
          '
        >
          {description}
        </p>
        <span
          className={cn('badge mt-4', getBadgeInfo(status))}
        >
          {status}
        </span>
      </div>
    </div>
  )
}

export default TaskCard