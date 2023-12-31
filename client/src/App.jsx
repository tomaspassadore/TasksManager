import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TasksContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import AddTaskPage from './pages/AddTaskPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import Navbar from './components/Navbar.jsx'
import FloatButton from './components/FloatButton.jsx'
import Footer from './components/Footer.jsx'
import UpdateProfilePage from './pages/UpdateProfilePage.jsx'

function App() {
  document.querySelector('body').classList.add('bg-backgroundColor', 'text-textColor')

  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <main className={`container px-5 min-[400px]:px-10 mx-auto`}>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/tasks/add-task' element={<AddTaskPage />} />
                <Route path='/tasks/update/:id' element={<AddTaskPage />} />
                <Route path='/profile' element={<UpdateProfilePage />} />
              </Route>
            </Routes>
            <FloatButton />
          </main>
          <Footer />
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
export default App
