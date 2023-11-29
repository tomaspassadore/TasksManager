import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getAllTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'
const taskRouter = Router()

taskRouter.get('/tasks', authRequired, getAllTasks)
taskRouter.get('/tasks/search/:id', authRequired, getTask)
taskRouter.post('/tasks/create', authRequired, validateSchema(createTaskSchema), createTask)
taskRouter.put('/tasks/update/:id', authRequired, updateTask)
taskRouter.delete('/tasks/delete/:id', authRequired, deleteTask)

export default taskRouter
