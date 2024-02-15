"use client"
import React, { useState, useEffect } from 'react';

function SearchTask({ tasks, collectionId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = () => {
    setFilteredTasks(tasks);
  };

  const handleSearch = () => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleTaskClick = async () => {
    if (selectedTask) {
      alert(selectedTask._id)
      // You may want to show a confirmation message or update the UI here
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasks]); // Fetch tasks when tasks prop changes

  return (
    <div className="container mx-auto mt-8 text-slate-600 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Task Collection</h1>

      <input
        type="text"
        placeholder="Search by Title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered input-info w-full max-w-sm p-2 mb-4 mr-2"
      />
      <button onClick={handleSearch} className="bg-indigo-500 btn px-6 text-white p-2 rounded">
        Search
      </button>

      <h2 className="menu-title">Tasks</h2>
      <ul className="flex flex-wrap gap-4 pl-4 mb-4 w-full items-center justify-center">

        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className='flex w-48 h-48 p-4 bg-slate-100 flex-row gap-2 items-center'
          >
            <input
              id={task._id}
              type='radio'
              name='task'
              value={task._id}
              onClick={() => setSelectedTask(task)}
              className="radio radio-info" />
            <label
              htmlFor={task._id}
            >
              {task.title}
            </label>
          </li>

        ))}
      </ul>

      <button
        onClick={handleTaskClick}
        disabled={!selectedTask}
        className={`bg-indigo-500 text-white p-2 rounded ${selectedTask ? '' : 'opacity-50 cursor-not-allowed'}`}
      >
        Add to Collection
      </button>
    </div>
  );
}

export default SearchTask;
