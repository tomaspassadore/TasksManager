import { Link } from 'react-router-dom'
import { useTasks } from '../context/TasksContext'
import Modal from './Modal'
import { useState } from 'react'

function TaskCard({ task }) {
  const { deleteTask } = useTasks()
  const [modal, setModal] = useState(false)

  const viewModal = () => setModal(true)

  const getDate = () => {
    const date = task.dateTask.split('-')
    const viewDate = `${date[2]}/${date[1]}/${date[0]}`
    return viewDate
  }
  const taskDate = getDate()

  return (
    <div className='bg-primaryColor rounded-2xl flex flex-col shadow-sm h-full'>
      <div className='flex gap-x-3 rounded-t-2xl text-white w-full font-[500] justify-center bg-indigo-600 py-2'>
        {task.timeTask !== '' && <div>Time: {task.timeTask}</div>}
        <div>Day: {taskDate}</div>
      </div>
      <div className='flex flex-col justify-between border-[1px] border-borderColor rounded-b-2xl dark:border-none h-full'>
        <h1 className='py-3 font-semibold text-lg text-center'>{task.title}</h1>
        <p className='px-5'>{task.description}</p>
        <div className='flex gap-x-2 py-4 px-4 w-full justify-end'>
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
