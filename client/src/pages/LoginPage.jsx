import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import InputComponent from '../components/FormLibrary/InputComponent'
import { regularExpressions } from '../components/FormLibrary/regularExpressions'
import { Button } from '../components/FormLibrary/formElements'

function LoginPage() {
  const { signIn, errors, isAuthenticated } = useAuth()
  const [email, setEmail] = useState({ value: '', valid: null })
  const [password, setPassword] = useState({ value: '', valid: null })

  const onSubmit = () => {
    if (email.valid === 'true' && password.valid === 'true') {
      const data = { email: email.value, password: password.value }
      signIn(data)
    }
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className='flex justify-center items-center h-[88vh] mt-10'>
      <div className='bg-formColor border-borderColor border-[1px] w-full max-w-sm py-8 px-6 min-[435px]:p-12 rounded-3xl mx-auto'>
        <h1 className='text-2xl min-[435px]:text-[28px] pb-3 font-bold mb-3'>Login</h1>

        {errors.map((error, i) => (
          <div key={i} className='bg-red-600 dark:bg-red-600/75 p-2 my-1 text-white rounded-sm'>
            {error}
          </div>
        ))}
        <div>
          <InputComponent
            state={email}
            changeState={setEmail}
            type='text'
            label='Email'
            placeholder='Email'
            id='inputEmail'
            messageError='The entered email is not correct'
            regularExpressions={regularExpressions.email}
            required
          />

          <InputComponent
            state={password}
            changeState={setPassword}
            type='password'
            label='Password'
            placeholder='Password'
            id='inputPassword'
            messageError='The password must be between 4 and 12 characters'
            regularExpressions={regularExpressions.password}
            required
          />

          <Button onClick={onSubmit}>Login</Button>
        </div>
        <p className='mt-3'>
          Don´t have an account?
          <Link
            to='/register'
            className='text-blue-600 pl-1 duration-150 hover:underline hover:text-blue-400'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
export default LoginPage
