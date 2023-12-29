import { useEffect } from 'react'
import { useTasks } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'
import { Button } from '../components/FormLibrary/formElements'
import { useNavigate } from 'react-router-dom'

function TasksPage() {
  const { tasks, getAllTasks } = useTasks()
  const navigate = useNavigate()

  useEffect(() => {
    getAllTasks()
  }, [])
  console.log(tasks)
  if (tasks.length === 0) {
    console.log('MARTIN')
    return (
      <div className='flex flex-col h-screen justify-center items-center'>
        <h2>You have not created any tasks yet</h2>
        <Button className='hidden min-[800px]:block' onClick={() => navigate('/tasks/add-task')}>Create task</Button>
      </div>
    )
  } else {
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
}
export default TasksPage
