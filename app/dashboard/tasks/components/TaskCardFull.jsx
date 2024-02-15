"use client"
import React, { useState, useEffect } from 'react'
import { IoTrash } from "react-icons/io5"
import { IoIosSave } from "react-icons/io"
import { FaCheck } from "react-icons/fa6"
import { cn } from '@lib/cn'
import { useRouter } from 'next/navigation'
import { handleRevalidate } from "@actions/revalidatePathAction"
import { toast } from "react-hot-toast"

const HIGH_PRIORITY = 'badge-neutral'
const MEDIUM_PRIORITY = 'badge-accent'
const LOW_PRIORITY = 'badge-secondary'


const DONE_BADGE = 'badge-accent'
const ONGOING_BADGE = 'badge-info'
const MISSED_BADGE = 'badge-error'

function TaskCardFull({ task }) {

  const [localTask, setLocalTask] = useState(task);
  const [save, setSave] = useState(false);
  const [remove, setRemove] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const updateTask = async (taskData) => {
      const data = JSON.stringify(taskData)
      const res = await fetch(`/api/tasks/${taskData._id}/update`, {
        method: "PUT",
        body: data
      })

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        toast.error('Failed to update task')
      } else {

        handleRevalidate('/dashboard')
        toast.success('Task updated successfully')
        router.push('/dashboard/tasks/' + taskData._id)
      }

      return res.json()
    }
    if (save) {
      updateTask(localTask);
    }
  }, [save]);

  useEffect(() => {

    const removeTask = async (taskId) => {
      const data = JSON.stringify({
        taskId: taskId
      })
      const res = await fetch(`/api/tasks/${taskId}/delete`, {
        method: "DELETE",
        body: data
      })

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to delete task')
      } else {
        toast.success('Task deleted successfully')
        handleRevalidate('/dashboard')
        router.push('/dashboard/tasks')
      }

      return res.json()
    }
    if (remove) {
      removeTask(localTask._id);
    }
  }, [remove]);

  const toggleTodoList = (index) => {
    let newTask = { ...localTask };
    newTask.todo[index].status = !newTask.todo[index].status;
    let allDone = newTask.todo.every((item) => item.status);
    if (allDone) {
      newTask.status = 'done';
    }
    setLocalTask(newTask);
  };

  const getPriorityLevel = (priority) => {
    return priority?.toLowerCase() === "high"
      ? HIGH_PRIORITY
      : priority?.toLowerCase() === "medium"
        ? MEDIUM_PRIORITY
        : LOW_PRIORITY;
  };

  const getBadgeInfo = (badge) => {
    return badge?.toLowerCase() === "done"
      ? DONE_BADGE
      : badge?.toLowerCase() === "ongoing"
        ? ONGOING_BADGE
        : MISSED_BADGE;
  };
  return (
    <div className="text-slate-600 max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium pr-2">{localTask?.title}</h1>
        </div>
        <div className="inline-flex space-x-2 items-center">
          <button
            onClick={() => setSave(true)}
            className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500"
          >
            <IoIosSave />
            <span className="text-sm font-medium hidden md:block">Save</span>
          </button>
          <button
            onClick={() => setRemove(true)}
            className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center hover:bg-slate-200"
          >
            <IoTrash />
            <span className="text-sm hidden md:block">Delete</span>
          </button>
        </div>
      </div>
      <p className="text-slate-500">{localTask.description}</p>
      <div className="text-x text-center bg-slate-100 p-4 rounded-lg flex-col flex items-start gap-2">
        <div>
          status:
          <span
            className={cn('ml-2 badge p-3', getBadgeInfo(localTask.status))}
          >
            {localTask.status}
          </span>
        </div>
        <div>
          created at:
          <span
            className='ml-2 badge bg-white p-3'
          >
            {localTask.createdAt?.toLocaleString()}
          </span>
        </div>
        <div>
          due date:
          <span
            className='ml-2 badge bg-white p-3'
          >
            {localTask.dueDate?.toLocaleString()}
          </span>
        </div>
        <div>
          Owner:
          <span
            className='ml-2 badge bg-white p-3'
          >
            {localTask?.userId?.username}
          </span>
        </div>
        <div>
          Collaborators:
          {localTask.collaborators?.length >= 1
            ? localTask.collaborators?.map((contributor) => {
              return (
                <span key={contributor}
                  className='ml-2 badge bg-white p-3'
                >
                  {contributor}
                </span>
              )
            }
            ) : (
              <span
                className='ml-2 badge bg-white p-3'
              >
                Owner
              </span>
            )}
        </div>
        <div>
          Priority:
          <span
            className={cn('ml-2 badge p-3', getPriorityLevel(task.priority))}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <div className="my-5">

        {/* ... Repeat for all todo list */}
        {localTask.todo.length > 0
          ? localTask.todo.map((item, idx) => (
            <div key={item.idx}
              className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent"
            >
              <div
                className="inline-flex items-center space-x-2"
              >
                <div>
                  {item.status && (
                    <FaCheck />
                  )}
                </div>
                <div
                  className={cn("text-slate-500", item.status && "line-through")}>
                  {item.title}
                </div>
              </div>
              <button
                disabled={item.status}
                onClick={() => toggleTodoList(idx)}
                className="btn disabled:bg-slate-100 btn-outline btn-error btn-sm"
              >
                <IoTrash />
              </button>
            </div>
          )) : (
            <p>Your todo list is empty</p>
          )}
      </div>
      <div>

      </div>
    </div>
  );
}

export default TaskCardFull