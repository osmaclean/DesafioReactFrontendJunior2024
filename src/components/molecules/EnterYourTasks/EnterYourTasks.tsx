import React, { useEffect, useRef, useState } from 'react'
import { EnterYourTasksProps } from '../../../@types'

const EnterYourTasks: React.FC<EnterYourTasksProps> = ({ isFocused, inputRef, handleChangeFocus }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node)) {
        setIsButtonClicked(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    setIsButtonClicked(true);
  };
  
  return (
    <div className={`toDoContainer__box1st ${isFocused ? 'isFocus' : ''}`}>
      <div ref={inputContainerRef} className={`inputContainer ${isButtonClicked ? 'isFocus' : ''}`}>
        <img 
            className={`inputContainer__buttonDown ${isButtonClicked ? 'isBrightness' : ''}`}
            src="/imgs/down.png" 
            alt="Button to complete all tasks"  
            aria-label='Button to complete all tasks'
            onClick={handleClick}
          />
      </div>
      <input
        ref={inputRef}
        onFocus={handleChangeFocus}
        className='toDoContainer__box1st--input'
        type="text" 
        placeholder='Whats needs to be done?'
      />
    </div>
  )
}

export default EnterYourTasks