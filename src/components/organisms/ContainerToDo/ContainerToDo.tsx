import React, { useState, useRef, useEffect } from 'react'
import './index.scss'
import EnterYourTasks from '../../molecules/EnterYourTasks/EnterYourTasks'

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
      <EnterYourTasks
        isFocused={isFocused}
        inputRef={inputRef}
        handleChangeFocus={handleChangeFocus}
      />
    </section>
  )
}

export default ContainerToDo