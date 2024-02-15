import React from 'react'
import TaskCardFull from "@dashboard/tasks/components/TaskCardFull"
import { getTaskById } from "@lib/fetchResource"
import { redirect } from 'next/navigation'

async function TaskPage({ params }) {

  const task = await getTaskById(params.taskId)
  if (!task) {
    redirect('/error')
  }

  return (
    <section
      className='
      flex items-center justify-center h-full'
    >
      <TaskCardFull task={task} />
    </section>
  )
}

export default TaskPage