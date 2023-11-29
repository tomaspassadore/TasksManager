import { useLocation } from 'react-router-dom'

function Footer () {
  const location = useLocation().pathname
  if (location === '/login' || location === '/register' || location === '/') {
    return (
      <div className='h-16 w-screen flex left-0 absolute bottom-0 border-t-[1px] border-borderColor dark:border-[#27272a] bg-backgroundColor justify-center items-center'>
        <div className='text-zinc-600 italic'>
          <p>© Copyright 2023</p>
        </div>
      </div>
    )
  }
}
export default Footer
