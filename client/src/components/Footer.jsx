import { useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation().pathname
  if (location === '/login' || location === '/register' || location === '/') {
    return (
      <div className={`h-14 sm:h-16 w-screen flex border-t-[1px] relative min-[435px]:absolute ${location === '/register' ? 'mt-20' : ''} bottom-0 left-0 border-borderColor dark:border-[#27272a] bg-backgroundColor justify-center items-center`}>
        <div className='text-zinc-400 dark:text-zinc-700 text-sm sm:text-base italic'>
          <p>© Copyright 2024</p>
        </div>
      </div>
    )
  }
}
export default Footer
