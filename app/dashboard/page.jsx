import React from 'react';
import UpcomingEvents from '@dashboard/components/UpcomingEvents'
import UpComing from '@dashboard/components/UpComing'
import Statistics from '@dashboard/components/Statistics'
import { getTasks } from '@lib/fetchResource'


function calculateTaskProgress(task) {
  const totalTodos = task.todo.length
  if (totalTodos === 0) {

    // No todos, progress is 0%
    return 0
  }

  const completedTodos = task.todo.filter(todo => todo.status).length
  return (completedTodos / totalTodos) * 100
}

async function Page() {
  const tasks = await getTasks()

  // Get today, tomorrow, and next week's tasks
  const todayTasks = []
  const tomorrowTasks = []
  const nextWeekTasks = []

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)

  tasks.forEach((task) => {
    const dueDate = new Date(task.dueDate)
    const mutatedTask = {
      ...task,
      progress: calculateTaskProgress(task)
    }
    if (dueDate.toDateString() === today.toDateString()) {
      todayTasks.push(mutatedTask)
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      tomorrowTasks.push(mutatedTask)
    } else if (dueDate <= nextWeek) {
      nextWeekTasks.push(mutatedTask)
    }
  })

  return (
    <section
      className='h-full w-full p-4 lg:container mx-auto pb-12 text-slate-500'>
      <div
        className='w-full h-full mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-2'>
        <div
          className='bg-slate-50 shadow-sm shadow-slate-200 flex items-center justify-center h-full flex-col p-4'>
          <UpcomingEvents
            day='Today'
            bgColor='bg-orange-300'
            tasks={todayTasks}
          />
        </div>
        <div
          className='bg-slate-50 shadow-sm shadow-slate-200 flex items-center justify-center h-full flex-col p-4'>
          <UpComing
            tasks={nextWeekTasks}
          />
        </div>
        <div
          className='bg-slate-50 shadow-sm shadow-slate-200 flex items-center justify-center h-full flex-col p-4'>
          <UpcomingEvents
            day='Tomorrow'
            bgColor='bg-indigo-300'
            tasks={tomorrowTasks}
          />
        </div>
        <div
          className='bg-slat-50 shadow-sm shadow-slate-200 flex items-center justify-center h-full flex-col'>
          <Statistics />
        </div>
      </div>
    </section>
  );
}

export default Page;
