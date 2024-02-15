import React, { useState, useRef, useEffect } from 'react'
import './index.scss'

const ContainerToDo: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChangeFocus = () => {
    setIsFocused(true)
  }

  return (
    <section className='toDoContainer'>
      <div className={`toDoContainer__box1st ${isFocused ? 'isFocus' : ''}`}>
        <div className='inputContainer'>
          <img 
            className='inputContainer__buttonDown'
            src="/imgs/down.png" 
            alt="Button to complete all tasks"  
            aria-label='Button to complete all tasks'
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
    </section>
  )
}

export default ContainerToDo