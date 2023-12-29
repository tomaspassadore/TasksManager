/* eslint-disable react/prop-types */

import { useAuth } from '../../context/AuthContext'

import { Label, Container, InputError, Date } from './formElements'

const DateComponent = ({ state, changeState, label, id, required }) => {
  const { theme } = useAuth()

  const onChange = (e) => {
    changeState({ ...state, value: e.target.value })
  }
  const validation = () => {
    if (required) {
      (state.value === '') ? changeState({ ...state, valid: 'false' }) : changeState({ ...state, valid: 'true' })
      return
    }
  }

  return (
    <div>
      <Label htmlFor={id} $valid={state.valid}>
        {label}
      </Label>
      <Container className='border-[1px] border-borderColor dark:border-transparent'>
        <Date
          $inputColor={theme === 'dark' ? 'dark' : 'light'}
          id={id}
          value={state.value}
          onChange={onChange}
          onBlur={validation}
          $valid={state.valid}
          type='date'
        />

      </Container>
      {required === true && state.value === '' && (
        <InputError $valid={state.valid}>
          The {label.toLowerCase()} is required
        </InputError>
      )}
    </div>
  )
}

export default DateComponent
