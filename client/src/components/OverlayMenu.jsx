import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DarkModeButton from './DarkModeButton'

function OverlayMenu ({ menu, setMenu, viewName }) {
  const { logout } = useAuth()

  return (
    <div className='h-full w-screen fixed bg-black/[0.9] z-20 left-0 mt-[-35px] border-t-[2px] border-t-neutral-300 dark:border-t-zinc-600 min-[800px]:hidden'>
      <div className='bg-primaryColor w-screen h-fit flex flex-col top-0 font-[Roboto]'>
        <div className='flex py-1 justify-between'>
          <div className='flex items-center mr-10 pl-6 sm:pl-8'>
            Welcome
            <p className='uppercase px-1 text-indigo-500'>
              <Link
                to='/profile'
                onClick={() => menu === true ? setMenu(false) : setMenu(true)}
                className='hover:text-indigo-600 hover:underline'
              >
                {viewName()}
              </Link>
            </p>
          </div>
          <div className='mr-8'>
            <DarkModeButton />
          </div>
        </div>
        <Link
          to='/tasks'
          onClick={() => menu === true ? setMenu(false) : setMenu(true)}
        >
          <h1 className='hover:bg-buttonSecondaryHover hover:pl-10 hover:font-bold duration-300 p-3 pl-6 sm:pl-8 sm:hover:pl-12'>
            My Tasks
          </h1>
        </Link>
        <Link
          to='/login'
          onClick={() => {
            logout()
            menu === true ? setMenu(false) : setMenu(true)
          }}
          className='hover:bg-buttonSecondaryHover hover:pl-10 hover:font-bold duration-300 p-3 pl-6 sm:pl-8 sm:hover:pl-12'
        >
          Logout
        </Link>
      </div>
    </div>
  )
}
export default OverlayMenu
