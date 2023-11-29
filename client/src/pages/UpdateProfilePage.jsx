import { useAuth } from '../context/AuthContext'
import InputComponent from '../components/FormLibrary/InputComponent'
import { useState } from 'react'
import { Button, DeleteButton } from '../components/FormLibrary/formElements'
import { regularExpressions } from '../components/FormLibrary/regularExpressions'
import Modal from '../components/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

function UpdateProfilePage () {
  const { user, logout, deleteProfile, updateProfile } = useAuth()
  const [modal, setModal] = useState({ valid: 'false', value: '' })
  const [name, setName] = useState({ value: user.name, valid: null })
  const [email, setEmail] = useState({ value: user.email, valid: null })
  const [newPassword, setNewPassword] = useState({ value: '', valid: null })
  const [currentPassword, setCurrentPassword] = useState({
    value: '',
    valid: null
  })

  const changeName = async () => {
    if (name.valid === 'true') {
      try {
        await updateProfile(user.id, 'name', { name: name.value })
        setModal({ valid: 'true', value: 'Your name was successfully updated.' })
      } catch (error) {
        setModal({ valid: 'true', value: 'Error updating your name. Please try again.' })
      }
    }
  }
  const changeEmail = async () => {
    if (email.valid === 'true') {
      try {
        await updateProfile(user.id, 'email', { email: email.value })
        setModal({ valid: 'true', value: 'Your email was successfully updated.' })
      } catch (error) {
        setModal({ valid: 'true', value: 'Error updating your email. Please try again.' })
      }
    }
  }
  const changePassword = async () => {
    try {
      if (newPassword.valid === 'true' && currentPassword.valid === 'true') {
        const data = { currentPassword: currentPassword.value, newPassword: newPassword.value }
        const newPass = await updateProfile(user.id, 'password', data)
        if (newPass) setModal({ valid: 'true', value: 'Your password was successfully updated.' })
        else throw new Error()
      }
    } catch (error) {
      setModal({ valid: 'true', value: 'Error updating your password. Please try again.' })
    }
  }

  return (
    <div className=' flex flex-col justify-center items-center gap-y-5 w-full h-full mt-[5.9rem] mx-auto'>
      <div className='flex flex-col items-center w-full bg-formColor border-[1px] border-neutral-200 dark:border-none py-12 sm:p-12 rounded-3xl'>
        {
          modal.valid === 'true' &&
            <Modal
              setState={setModal}
              modalText={modal.value}
              buttonText='OK'
              oneButton
              toDo1={() => window.location.reload()}
            />
        }
        <h1 className='font-bold text-2xl pb-5'>Your Profile</h1>
        <div className='py-6 sm:my-5 px-10 flex flex-col rounded-3xl sm:shadow-sm sm:border-[1px] border-borderColor items-center'>
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
          <Button onClick={changeName}>Change name</Button>
        </div>

        <div className='py-6 sm:my-5 px-10 flex flex-col rounded-3xl sm:shadow-sm sm:border-[1px] border-borderColor items-center'>
          <InputComponent
            state={email}
            changeState={setEmail}
            type='text'
            label='Email'
            placeholder='juanperez@hotmail.com'
            id='inputEmail'
            messageError='The entered email is not correct'
            regularExpressions={regularExpressions.email}
            required
          />
          <Button onClick={changeEmail}>Change email</Button>
        </div>
        <div className='py-6 sm:my-5 px-10 flex flex-col rounded-3xl sm:shadow-sm sm:border-[1px] border-borderColor items-center'>
          <InputComponent
            state={currentPassword}
            changeState={setCurrentPassword}
            type='password'
            label='Current password'
            placeholder='Password'
            id='inputCurrentPassword'
            messageError='The entered password is not correct'
            required
          />
          <InputComponent
            state={newPassword}
            changeState={setNewPassword}
            type='password'
            label='New password'
            placeholder='Password'
            id='inputNewPassword'
            messageError='The password must be between 4 and 12 characters'
            regularExpressions={regularExpressions.password}
            required
          />
          <Button onClick={changePassword}>Change password</Button>
        </div>
        <div>
          <DeleteButton onClick={() => setModal({ valid: 'delete' })}>
            <FontAwesomeIcon icon={faTrashCan} className='pr-2' />
            Delete profile
          </DeleteButton>
        </div>
        {modal.valid === 'delete' && (
          <Modal
            setState={setModal}
            toDo1={deleteProfile}
            toDo1Arg1={user.id}
            toDo2={logout}
            modalText='Are you sure you want to delete your profile?'
            buttonText='Delete'
          />
        )}
      </div>
    </div>
  )
}
export default UpdateProfilePage
