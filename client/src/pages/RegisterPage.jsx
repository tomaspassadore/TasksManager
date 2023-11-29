import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputComponent from '../components/FormLibrary/InputComponent'
import { Button } from '../components/FormLibrary/formElements'
import { regularExpressions } from '../components/FormLibrary/regularExpressions'

function RegisterPage () {
  const { signUp, isAuthenticated, errors } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState({ value: '', valid: null })
  const [email, setEmail] = useState({ value: '', valid: null })
  const [password, setPassword] = useState({ value: '', valid: null })

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  const onSubmit = () => {
    if (
      name.valid === 'true' &&
      email.valid === 'true' &&
      password.valid === 'true'
    ) {
      const data = {
        name: name.value,
        email: email.value,
        password: password.value
      }
      signUp(data)
    }
  }

  return (
    <div className='flex justify-center items-center h-[88vh] mt-10'>
      <div className='bg-formColor border-borderColor border-[1px] w-full max-w-md py-8 px-6 min-[435px]:p-12 rounded-3xl mx-auto'>
        <h1 className='text-2xl min-[435px]:text-[28px] pb-3 font-bold mb-3'>Register</h1>
        {/* En caso de haber errores, se mostraran con un cartel rojo aqui */}
        {errors.map((error, i) => (
          <div key={i} className='bg-red-600 dark:bg-red-600/75 p-2 text-white my-1 rounded-sm'>
            {error}
          </div>
        ))}
        <div>
          <InputComponent
            state={name}
            changeState={setName}
            type='text'
            label='Name'
            placeholder='Name'
            id='inputName'
            messageError='The name can contain only letters'
            regularExpressions={regularExpressions.name}
            required
          />
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
          <Button onClick={onSubmit}>Register</Button>
        </div>
        <p>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-blue-600 duration-300 hover:underline hover:text-blue-400'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
export default RegisterPage
