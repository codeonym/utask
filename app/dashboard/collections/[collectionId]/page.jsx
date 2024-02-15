import React from 'react';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { CiFileOn } from 'react-icons/ci';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCollectionById } from '@lib/fetchResource';
import { FaPlus } from "react-icons/fa6";

async function CollectionPage({ params }) {

  const collection = await getCollectionById(params.collectionId);

  if (!collection) {
    redirect('/error');
  }

  const groupTasksByStatus = () => {
    const groupedTasks = {
      done: [],
      ongoing: [],
      missed: [],
    };

    collection.tasks.forEach((task) => {
      switch (task.status) {
        case 'done':
          groupedTasks.done.push(task);
          break;
        case 'ongoing':
          groupedTasks.ongoing.push(task);
          break;
        case 'missed':
          groupedTasks.missed.push(task);
          break;
        default:
          break;
      }
    });

    return groupedTasks;
  };

  const groupedTasks = groupTasksByStatus();


  return (
    <section className='mx-auto flex items-center justify-center w-full h-full'>
      <ul className='menu menu-lg bg-slate-100 rounded-lg px-12 py-4 w-full md:w-2/3'>
        <li>
          <details open>
            <summary>
              <IoFolderOpenOutline />
              {collection.title}
            </summary>
            <p>{collection.description}</p>
            <Link
              href={`/dashboard/collections/${params.collectionId}/add-task`}
              className='flex p-2 hover:bg-slate-300 rounded-lg gap-2 items-center text-white bg-indigo-400 my-2'
            >
              <FaPlus />
              Add Task
            </Link>
            <ul>
              {Object.entries(groupedTasks).map(([status, tasks]) => (
                <li key={status}>
                  <details open>
                    <summary>
                      <IoFolderOpenOutline />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </summary>
                    <ul>
                      {tasks.length > 0 ? (
                        tasks.map((task) => (
                          <li key={task._id}>
                            <Link href={`/dashboard/tasks/${task._id}`} passHref>
                              <a className='flex p-2 hover:bg-slate-300 rounded-lg gap-2 items-center'>
                                <CiFileOn />
                                {task.title}
                              </a>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <div>
                            <span className='flex p-2 hover:bg-slate-300 rounded-lg gap-2 items-center'>
                              <CiFileOn />
                              No tasks available
                            </span>
                          </div>
                        </li>
                      )}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </section>
  );
}

export default CollectionPage;
