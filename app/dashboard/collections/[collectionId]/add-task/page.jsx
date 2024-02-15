import React from 'react'
import { getTasks } from "@lib/fetchResource"
import SearchTask from './components/SearchTask'
async function page({params}) {

  const tasks = await getTasks()
  return (
    <section
      className="w-full h-full flex "
    
    >
      <SearchTask
        tasks={tasks}
        collectionId={ params.collectionId}
      />

    </section>
  )
}

export default page