import { Link, useLocation } from 'react-router-dom'

function FloatButton () {
  const location = useLocation().pathname

  if (location === '/tasks') {
    return (
      <div className='text-white'>
        <Link to='/tasks/add-task' className='fixed z-10 bottom-8 left-5 hover:bg-indigo-700 duration-300 shadow-zinc-800 shadow-sm text-md px-6 py-3 button3Animation bg-indigo-600 rounded-xl sm:mr-10 min-[495px]:text-lg min-[800px]:hidden'>Add Task</Link>
      </div>
    )
  }
}
export default FloatButton
