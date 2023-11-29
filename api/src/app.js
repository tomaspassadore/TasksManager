import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import taskRouter from './routes/tasks.routes.js'
import cors from 'cors'

const app = express()

const URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({
  origin: URL,
  credentials: true
}))

app.use(express.json())
app.use(express.text())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', taskRouter)

export default app
