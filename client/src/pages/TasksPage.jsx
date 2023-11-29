import { useEffect } from 'react'
import { useTasks } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'

function TasksPage () {
  const { tasks, getAllTasks } = useTasks()

  useEffect(() => {
    getAllTasks()
  }, [])

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-[6em]'>
      {
        tasks.map(task => (
          <TaskCard
            task={task}
            key={task._id}
          />
        ))
      }
    </div>
  )
}
export default TasksPage
