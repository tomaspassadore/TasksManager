/* eslint-disable react/prop-types */

import { Button } from './FormLibrary/formElements'

// Para que el modal solo tenga un boton de confimacion, usar la prop oneButton={true}

function Modal ({
  setState,
  buttonText,
  oneButton,
  modalText,
  toDo1,
  toDo1Arg1,
  toDo1Arg2,
  toDo1Arg3,
  toDo2,
  toDo2Arg1,
  toDo2Arg2,
  toDo2Arg3
}) {
  const exit = () => setState(false)

  return (
    <div className='h-screen w-screen m-0 p-0 flex bg-black/[0.9] fixed z-10 top-0 left-0'>
      <div className='bg-primaryColor m-auto flex flex-col rounded-md py-4 px-5 sm:py-7 sm:px-8'>
        <p className='text-center sm:text-lg'>{modalText}</p>
        {
          oneButton === true
            ? (
              <div className='flex flex-col justify-center items-center w-[70%] mt-2 m-auto sm:w-full sm:flex-row'>
                <Button
                  $modal
                  onClick={() => {
                    if (toDo1) toDo1(toDo1Arg1, toDo1Arg2, toDo1Arg3)
                    if (toDo2) toDo2(toDo2Arg1, toDo2Arg2, toDo2Arg3)
                    exit()
                  }}
                >
                  {buttonText}
                </Button>
              </div>
              )
            : (
              <div className='flex flex-col justify-center items-center w-[70%] mt-2 m-auto sm:w-full sm:flex-row'>
                <button
                  className='hover:bg-[#93211e] text-white duration-200 bg-[#b32821] py-2 px-3 w-full max-w-[160px] sm:max-w-[140px] rounded-md m-1'
                  onClick={() => {
                    toDo1(toDo1Arg1, toDo1Arg2, toDo1Arg3)
                    if (toDo2) toDo2(toDo2Arg1, toDo2Arg2, toDo2Arg3)
                    exit()
                  }}
                >
                  {buttonText}
                </button>
                <button
                  onClick={exit}
                  className='hover:bg-buttonSecondaryHover duration-200 bg-buttonSecondary py-2 px-3 w-full max-w-[160px] sm:max-w-[140px] rounded-md m-1'
                >
                  Cancel
                </button>
              </div>
              )
        }
      </div>
    </div>
  )
}
export default Modal
