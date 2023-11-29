import Task from '../models/task.model.js'

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  res.status(200).json(tasks)
}
export const getTask = async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findById(id).populate('user')
    if (!task) return res.status(404).json({ message: 'Task not found' })
    return res.status(200).send(task)
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' })
  }
}
export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body
    const now = new Date()
    const newTask = new Task({
      title,
      description,
      date: now,
      offset: now.getTimezoneOffset(),
      user: req.user.id
    })
    const savedTask = await newTask.save()
    if (!savedTask) return res.status(403).json({ message: 'Error creating task' })
    return res.status(200).send(newTask)
  } catch (error) {
    return res.status(403).json({ message: 'Error creating task' })
  }
}
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id
    const taskUpdated = await Task.findByIdAndUpdate(id, req.body, { new: true })
    if (!taskUpdated) return res.status(404).json({ message: 'Task not found' })
    return res.status(200).json(taskUpdated)
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' })
  }
}
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id
    const taskDeleted = await Task.findByIdAndDelete(id)
    if (!taskDeleted) return res.status(404).json({ message: 'Task not found' })
    return res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' })
  }
}
