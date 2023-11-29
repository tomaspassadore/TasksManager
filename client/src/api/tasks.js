import axios from './axios'

export const getAllTasksRequest = () => axios.get('/tasks')
export const getTaskRequest = id => axios.get(`/tasks/search/${id}`)
export const createTaskRequest = task => axios.post('/tasks/create', task)
export const updateTaskRequest = (id, task) => axios.put(`/tasks/update/${id}`, task)
export const deleteTaskRequest = id => axios.delete(`/tasks/delete/${id}`)
