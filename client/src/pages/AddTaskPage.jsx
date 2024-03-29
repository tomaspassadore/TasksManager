import { useTasks } from '../context/TasksContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import InputComponent from '../components/FormLibrary/InputComponent'
import { Button } from '../components/FormLibrary/formElements'
import TextareaComponent from '../components/FormLibrary/TextareaComponent'
import DateComponent from '../components/FormLibrary/DateComponent'
import TimeComponent from '../components/FormLibrary/TimeComponent'

function AddTaskPage() {
  const { createTask, getTask, updateTask } = useTasks()
  const [title, setTitle] = useState({ value: '', valid: null })
  const [description, setDescription] = useState({ value: '', valid: null })
  const [date, setDate] = useState({ value: '', valid: null })
  const [time, setTime] = useState({ value: '', valid: null })


  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)
        setTitle({ value: task.title, valid: 'true' })
        setDescription({ value: task.description, valid: 'true' })
        setDate({ value: task.date, valid: 'true' })
      }
    }
    loadTask()
  }, [])

  const onSubmit = async () => {
    if (title.valid !== 'true' || date.valid !== 'true') return
    const data = { title: title.value, description: description.value, dateTask: date.value, timeTask: time.value }

    if (params.id) {
      await updateTask(params.id, data)
      navigate('/tasks')
    } else {
      await createTask(data)
      navigate('/tasks')
    }
  }
  return (
    <div className='flex justify-center items-center mx-auto h-screen mt-[-2.5rem]'>
      <div className='bg-formColor shadow-md border-[1px] border-neutral-200 dark:border-none w-full max-w-sm py-8 px-6 min-[430px]:p-12 rounded-2xl mt-[6rem]'>
        <h1 className='text-2xl font-semibold mb-3'>New Task</h1>
        <div>
          <InputComponent
            state={title}
            changeState={setTitle}
            type='text'
            label='Title'
            placeholder='Title'
            id='inputTitle'
            required
            hideIcon
          />

          <TextareaComponent
            state={description}
            changeState={setDescription}
            label='Description'
            placeholder='Description'
            id='textareaDescription'
            rows='12'
            hideIcon
          />
          <div className='flex flex-col min-[450px]:flex-row w-full justify-between'>
            <DateComponent
              state={date}
              changeState={setDate}
              label='Date'
              id='date'
              required
            />
            <TimeComponent
              state={time}
              changeState={setTime}
              label='Time'
              id='time'
            />
          </div>

          <Button onClick={onSubmit}>Add Task</Button>
        </div>
      </div>
    </div>
  )
}
export default AddTaskPage
