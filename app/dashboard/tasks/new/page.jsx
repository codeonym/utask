"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { handleRevalidate } from "@actions/revalidatePathAction"

function CreateTask() {

  // Use state to store the input values
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('ongoing')
  const [todo, setTodo] = useState([{ title: '', status: false }])
  const [labels, setLabels] = useState([])
  const [collaborators, setCollaborators] = useState([])
  const [priority, setPriority] = useState('medium')
  const {data} = useSession()
  // Use router to navigate to other pages
  const router = useRouter()

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent default browser behavior
    e.preventDefault()
    // Create a new task object with the input values
    let newTask = {
      userId: data?.user.id,
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
      todo: todo,
      labels:labels,
      collaborators: collaborators,
      priority: priority,
    }
      newTask = JSON.stringify(newTask)

    // Send a post request to the backend API to create the task
    try {
      const response = await fetch("/api/tasks/new",{
        method: "POST",
        body: newTask,
        headers: { 'Content-Type': 'application/json' }
      })

      // If successful, redirect to the task details page
      if (response.status === 201) {
        toast.success('Task created successfully')
        handleRevalidate('/dashboard')
        router.push(`/dashboard/tasks/`)
      } else {
        toast.error('Failed to create task')
      }
    } catch (error) {
      alert(error)
      toast.error('Failed to create task')
    }
  }


  // Define a function to add a new todo item
  const addTodo = () => {

    // Make a copy of the todo array
    let newTodo = [...todo]
    // Push a new empty item to the end
    newTodo.push({ title: '', status: false })
    // Update the todo state with the new array
    setTodo(newTodo)
  }

  // Define a function to remove a todo item
  const removeTodo = (index) => {

    // Make a copy of the todo array
    let newTodo = [...todo]
    // Remove the item at the given index
    newTodo.splice(index, 1)
    // Update the todo state with the new array
    setTodo(newTodo)
  }

  // Define a function to handle the change of a todo item title
  const handleTodoTitleChange = (e, index) => {
    // Make a copy of the todo array
    let newTodo = [...todo]
    // Update the title of the item at the given index
    newTodo[index].title = e.target.value
    // Update the todo state with the new array
    setTodo(newTodo)
  }

  // Define a function to handle the change of a todo item status
  const handleTodoStatusChange = (e, index) => {
    // Make a copy of the todo array
    let newTodo = [...todo]
    // Update the status of the item at the given index
    newTodo[index].status = e.target.checked
    // Update the todo state with the new array
    setTodo(newTodo)
  }

  // Define a function to add a new label
  const addLabel = () => {
    // Make a copy of the labels array
    let newLabels = [...labels]
    // Push a new empty string to the end
    newLabels.push('')
    // Update the labels state with the new array
    setLabels(newLabels)
  }

  // Define a function to remove a label
  const removeLabel = (index) => {
    // Make a copy of the labels array
    let newLabels = [...labels]
    // Remove the item at the given index
    newLabels.splice(index, 1)
    // Update the labels state with the new array
    setLabels(newLabels)
  }

  // Define a function to handle the change of a label
  const handleLabelChange = (e, index) => {
    // Make a copy of the labels array
    let newLabels = [...labels]
    // Update the value of the item at the given index
    newLabels[index] = e.target.value
    // Update the labels state with the new array
    setLabels(newLabels)
  }

  // Define a function to add a new collaborator
  const addCollaborator = () => {
    // Make a copy of the collaborators array
    let newCollaborators = [...collaborators]
    // Push a new empty string to the end
    newCollaborators.push('')
    // Update the collaborators state with the new array
    setCollaborators(newCollaborators)
  }

  // Define a function to remove a collaborator
  const removeCollaborator = (index) => {
    // Make a copy of the collaborators array
    let newCollaborators = [...collaborators]
    // Remove the item at the given index
    newCollaborators.splice(index, 1)
    // Update the collaborators state with the new array
    setCollaborators(newCollaborators)
  }

  // Define a function to handle the change of a collaborator
  const handleCollaboratorChange = (e, index) => {
    // Make a copy of the collaborators array
    let newCollaborators = [...collaborators]
    // Update the value of the item at the given index
    newCollaborators[index] = e.target.value
    // Update the collaborators state with the new array
    setCollaborators(newCollaborators)
  }


  return (
    <section className="lg:container text-slate-600 mx-auto w-full h-full p-4">
      <div
        className="
        bg-slate-50 p-6 w-full lg:max-w-1/2
        ">
        <h2
          className='text-2xl p-4 flex font-bold flex-col gap-3 items-start'
        >
          Create task
          <span
            className="w-32 h-2 bg-yellow-300 rounded-full block"
          />
        </h2>
        <form
          onSubmit={handleSubmit}
          className='grid sm:grid-cols-2 gap-2 justify-items-center items-center justify-center'
        >
          <div className="mb-4 form-control w-full max-w-sm">
            <label htmlFor="title" className="label">
              <span
                className='label-text'
              >
                Title
              </span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input input-bordered input-info w-full max-w-sm"
            />
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <label
              htmlFor="description"
              className="label"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered textarea-info min-h-24 max-h-24"
            />
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <label htmlFor="dueDate" className="label">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="input input-bordered input-info w-full max-w-sm"
            />
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <label htmlFor="status" className="label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered select-info"
            >
              <option value="ongoing">Ongoing</option>
              <option value="done">Done</option>
              <option value="missed">Missed</option>
            </select>
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <label htmlFor="todo" className="label">
              Todo
            </label>
            {todo.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  id={`todo-${index}`}
                  name={`todo-${index}`}
                  value={item.title}
                  onChange={(e) => handleTodoTitleChange(e, index)}
                  className="input input-bordered input-info w-full max-w-sm"
                />
                <input
                  type="checkbox"
                  id={`status-${index}`}
                  name={`status-${index}`}
                  checked={item.status}
                  onChange={(e) => handleTodoStatusChange(e, index)}
                  className="mx-2 checkbox checkbox-info"
                />
                <button
                  type="button"
                  onClick={() => removeTodo(index)}
                  className="btn btn-error"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTodo}
              className="btn btn-accent"
            >
              Add Todo
            </button>
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <label htmlFor="labels" className="label">
              Labels
            </label>
            {labels.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  id={`label-${index}`}
                  name={`label-${index}`}
                  value={item}
                  onChange={(e) => handleLabelChange(e, index)}
                  className="mr-2 input input-bordered input-info w-full max-w-sm"
                />
                <button
                  type="button"
                  onClick={() => removeLabel(index)}
                  className="btn btn-error"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLabel}
              className="btn btn-accent"
            >
              Add Label
            </button>
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <label
              htmlFor="collaborators"
              className="label"
            >
              Collaborators
            </label>
            {collaborators.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  id={`collaborator-${index}`}
                  name={`collaborator-${index}`}
                  value={item}
                  onChange={(e) => handleCollaboratorChange(e, index)}
                  className="mr-2 input input-bordered input-info w-full max-w-sm"
                />
                <button
                  type="button"
                  onClick={() => removeCollaborator(index)}
                  className="btn btn-error"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCollaborator}
              className="btn btn-accent"
            >
              Add Collaborator
            </button>
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <label
              htmlFor="priority"
              className="label"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="select select-bordered select-info w-full max-w-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4 form-control w-full max-w-sm">
            <button
              type="submit"
              className="btn btn-neutral"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreateTask
