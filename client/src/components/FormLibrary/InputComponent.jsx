/* eslint-disable react/prop-types */

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '../../context/AuthContext'

import { Input, Label, Container, InputError, ValidationIcon } from './formElements'

const InputComponent = ({ state, changeState, type, label, placeholder, id, messageError, regularExpressions, toDo, hideIcon, required }) => {
  const { theme } = useAuth()

  const onChange = (e) => {
    changeState({ ...state, value: e.target.value })
  }

  const validation = () => {
    if (toDo) toDo()
    if (!regularExpressions && required === true) {
      (state.value === '') ? changeState({ ...state, valid: 'false' }) : changeState({ ...state, valid: 'true' })
      return
    }
    if (regularExpressions) {
      if (regularExpressions.test(state.value)) {
        changeState({ ...state, valid: 'true' })
      } else {
        changeState({ ...state, valid: 'false' })
      }
    }
  }

  return (
    <div>
      <Label htmlFor={id} $valid={state.valid}>
        {label}
      </Label>
      <Container className='border-[1px] border-borderColor dark:border-transparent'>
        <Input
          $inputColor={theme === 'dark' ? 'dark' : 'light'}
          type={type}
          placeholder={placeholder}
          id={id}
          value={state.value}
          onChange={onChange}
          onKeyUp={validation}
          onBlur={validation}
          $valid={state.valid}
        />
        <ValidationIcon
          icon={state.valid === 'true' ? faCircleCheck : faCircleXmark}
          $valid={state.valid}
          hidden={hideIcon}
        />
      </Container>
      {required === true && state.value === '' && (
        <InputError $valid={state.valid}>
          The {label.toLowerCase()} is required
        </InputError>
      )}
      {state.value !== '' && (
        <InputError $valid={state.valid}>{messageError}</InputError>
      )}
    </div>
  )
}

export default InputComponent
