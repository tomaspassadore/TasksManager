/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import { useTasks } from '../context/TasksContext'
import Modal from './Modal'
import { useState } from 'react'

function TaskCard ({ task }) {
  const { deleteTask } = useTasks()
  const [modal, setModal] = useState(false)

  const viewModal = () => setModal(true)

  const getDate = () => {
    if (task.updatedAt !== task.createdAt) {
      const date = new Date(task.updatedAt)
      return date
    }
    const date = new Date(task.createdAt)
    return date
  }

  const checkDate = (taskDate) => {
    const now = new Date()
    const date = taskDate.toLocaleDateString()
    let hours = taskDate.getHours()
    let minutes = taskDate.getMinutes()
    if (hours.toString().length < 2) {
      hours = '0' + hours
    }
    if (minutes.toString().length < 2) {
      minutes = '0' + minutes
    }
    if (
      now.getDate() === taskDate.getDate() &&
      now.getMonth() === taskDate.getMonth() &&
      now.getFullYear() === taskDate.getFullYear()
    ) {
      const viewDate = `${hours}:${minutes}`
      return viewDate
    }
    const viewDate = `${date}`
    return viewDate
  }

  const taskDate = getDate()
  const viewDate = checkDate(taskDate)
  return (
    <div className='bg-primaryColor p-5 rounded-2xl flex flex-col shadow-md border-[1px] border-neutral-200 dark:border-none'>
      <h1 className='font-semibold text-lg text-center mb-3'>{task.title}</h1>
      <p>{task.description}</p>
      <div className='flex mt-auto pt-6'>
        <p className='mt-auto mr-auto text-gray-400'>{viewDate}</p>
        <div className='flex gap-x-2 w-min'>
          <button className='text-red-500 hover:underline' onClick={viewModal}>
            Delete
          </button>
          {modal === true && (
            <Modal
              setState={setModal}
              toDo1={deleteTask}
              toDo1Arg1={task._id}
              modalText='Are you sure you want to delete this task?'
              buttonText='Delete'
            />
          )}
          <Link
            className='text-blue-500 hover:underline'
            to={`/tasks/update/${task._id}`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
