import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import OverlayMenu from './OverlayMenu'
import './styles/navbar.css'
import DarkModeButton from './DarkModeButton'

function Navbar () {
  const { isAuthenticated, user, logout } = useAuth()
  const [menu, setMenu] = useState(false)
  const location = useLocation().pathname

  const viewName = () => {
    const username = user.name
    const res = username.split(' ')
    return res[0]
  }

  if (isAuthenticated) {
    return (
      <>
        <nav className='bg-backgroundColor w-full fixed top-0 border-b-[15px] border-backgroundColor z-10 lg:pt-3 lg:px-10'>
          <div className='bg-primaryColor dark:border-none border-[1px] border-neutral-200 flex justify-between items-center font-[Roboto] mx-auto lg:rounded-xl lg:w-[944px] xl:w-[1200px] 2xl:w-[1456px]'>
            <Link
              to='/tasks'
              className='p-4 font-semibold sm:pl-8 text-lg hover:text-indigo-500 duration-150'
              onClick={() => setMenu(false)}
            >
              <h1>TASKS MANAGER</h1>
            </Link>
            <FontAwesomeIcon
              icon={faBars}
              beatFade
              className='text-3xl cursor-pointer px-6 box-content py-3 min-[800px]:hidden'
              onClick={() => {
                menu === true ? setMenu(false) : setMenu(true)
              }}
            />
            <div className='hidden min-[800px]:flex md:w-fit md:mr-2 items-center justify-end'>
              <div className='hidden gap-4 min-[800px]:flex'>
                <div className='items-center flex'>
                  Welcome
                  <p className='uppercase pl-2 text-indigo-500'>
                    <Link
                      to='/profile'
                      className='hover:text-indigo-600 hover:underline'
                    >
                      {viewName()}
                    </Link>
                  </p>
                </div>
                {
                  window.innerWidth > 799 && <DarkModeButton />
                }

                <Link
                  to='/login'
                  onClick={logout}
                  className='hover:bg-[#c4c4c4] dark:hover:bg-[#46464d] duration-150 md:block bg-buttonSecondary rounded-xl shadow-sm px-6 py-2 sm:text-md'
                >
                  Logout
                </Link>
                <Link
                  to='/tasks/add-task'
                  className='hover:bg-indigo-700 duration-150 text-white button3Animation px-5 py-2 bg-indigo-600 rounded-xl sm:mr-4 sm:text-md md:mr-2 md:mx-0'
                >
                  Add Task
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className={`${menu === true ? 'block' : 'hidden'} min-[800px]:hidden`}>
          <OverlayMenu menu={menu} setMenu={setMenu} viewName={viewName} display />
        </div>
      </>
    )
  } else {
    return (
      <nav className='bg-backgroundColor w-full fixed top-0 border-b-[15px] border-backgroundColor z-10 lg:pt-3 lg:px-10'>
        <div className='bg-primaryColor dark:border-none border-[1px] border-neutral-200 flex justify-between items-center font-[Roboto] mx-auto lg:rounded-xl lg:w-[944px] xl:w-[1200px] 2xl:w-[1456px]'>
          <Link
            to='/tasks'
            className='py-4 px-2 sm:pl-8 text-md min-[380px]:text-lg hover:text-indigo-500 duration-150'
          >
            <h1>TASKS MANAGER</h1>
          </Link>
          <div className='flex gap-x-2 min-[380px]:gap-x-3 justify-center min-[380px]:mr-1 right-0'>
            <DarkModeButton />
            {location === '/login'
              ? (
                <Link
                  to='/register'
                  className='hover:bg-buttonPrimaryHover text-white duration-150 px-5 mr-4 py-2 bg-buttonPrimary sm:text-md sm:px-6 rounded-xl'
                >
                  Register
                </Link>
                )
              : (
                <Link
                  to='/login'
                  className='hover:bg-buttonPrimaryHover text-white duration-150 px-5 mr-4 py-2 bg-buttonPrimary sm:text-md sm:px-6 sm:py-2 rounded-xl'
                >
                  Login
                </Link>
                )}
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar
