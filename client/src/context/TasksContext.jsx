import { createContext, useContext, useState } from 'react'
import { createTaskRequest, deleteTaskRequest, getAllTasksRequest, getTaskRequest, updateTaskRequest } from '../api/tasks'

export const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be using within an TaskProvider')
  return context
}
export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState([])

  const getAllTasks = async () => {
    try {
      const res = await getAllTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async (task) => {
    const res = await createTaskRequest(task)
    if (!res) console.log('Ocurrio un error al crear la tarea')
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 204) {
        setTasks(tasks.filter(task => task._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task)
      if (!res) console.log('Error updating task')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTask,
        createTask,
        getAllTasks,
        deleteTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
