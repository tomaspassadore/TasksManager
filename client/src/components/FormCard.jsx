import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function FormCard ({ title, inputType, value, changePassword }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { updateProfile } = useAuth()
  const params = useParams()
  const id = params.id

  console.log(errors)

  useEffect(() => {
    setValue(title, value)
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfile(id, data)
      if (!res) console.log('Error al actualizar su perfil')
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className='text-sm min-[435px]:text-base'>
      <div className='bg-zinc-800 w-full max-w-md py-8 px-6 min-[435px]:p-12 rounded-md mx-auto'>
        <h1 className='text-xl min-[435px]:text-2xl font-bold mb-5 lowercase first-letter:uppercase'>
          {title}
        </h1>
        <form onSubmit={onSubmit}>
          {errors == title && (
            <p className='text-red-500 first-letter:uppercase'>
              {title} is required
            </p>
          )}
          <label>
            <input
              type={inputType}
              {...register(title, { required: true })}
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
              placeholder={title}
              autoComplete='true'
              required={false}
              id={title}
            />
          </label>
          <button
            type='submit'
            className='hover:bg-indigo-800 duration-300 bg-indigo-600 px-4 py-2 rounded-md my-2 text-[0.9rem]'
          >
            <p className='lowercase first-letter:uppercase'>{`Change ${title}`}</p>
          </button>
        </form>
      </div>
    </div>
  )
}
export default FormCard
