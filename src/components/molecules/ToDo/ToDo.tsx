import React, { useState } from 'react'
import './index.scss'

const ToDo: React.FC = () => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const [showCross, setShowCross] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleHoverCross = () => {
    setIsHover(!isHover)
  } 

  const handleMouseEnter = () => {
    setShowCross(true)
  }

  const handleMouseLeave = () => {
    setShowCross(false)
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  };

  const handleBlur = () => {
    setIsEditing(false)
  };

  const handleClickCircle = () => {
    setIsChecked(!isChecked)
  };

  return (
    <section className='toDoListContainer'>
      <div className={`toDoListContainer__toDoBox1st ${isEditing ? 'editing' : ''}`}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className='divCircle'>
          <img 
            style={{ display: isEditing ? 'none' : 'block' }} 
            onClick={handleClickCircle} 
            className='divCircle__imgCircle' 
            src={isChecked ? "/imgs/checked.png" : "/imgs/circle.png"}
            alt="Button to complete task" 
            aria-label='Button to complete task'/>
        </div>
        {isEditing ? (
          <input 
            type="text" 
            defaultValue='Olá' 
            className='toDoListContainer__toDoBox1st--input' 
            onBlur={handleBlur} 
            autoFocus 
          />
        ) : (
          <div 
          className={`toDoListContainer__toDoBox1st--inputDiv ${isChecked ? 'checked' : ''}`} 
            onDoubleClick={handleDoubleClick}
          >
            Olá
          </div>
        )}
        <img 
          className='toDoListContainer__toDoBox1st--imgCross' 
          onMouseEnter={handleHoverCross} 
          onMouseLeave={handleHoverCross} 
          src={isHover ? "/imgs/xRed.png" : "/imgs/x.png"}
          style={{ display: isEditing ? 'none' : showCross ? 'block' : 'none' }} 
          alt="Button to remove task" 
          aria-label='Button to remove task'
        />
      </div>
      <div className='divisor'></div>
      <div className='toDoListContainer__toDoBox2nd'>
        <h3 className='toDoListContainer__toDoBox2nd--count'>1 item left!</h3>
        <nav className='toDoListContainer__toDoBox2nd--nav'>
          <ul>
            <li>All</li>
            <li>Active</li>
            <li>Completed</li>
          </ul>
        </nav>
        <a className='toDoListContainer__toDoBox2nd--clearLink' href="#">Clear completed</a>
      </div>
    </section>
  )
}

export default ToDo