import React, { useEffect, useState } from 'react'
import { Tasks, TasksProps } from '../../../@types'
import '../../molecules/ToDo/index.scss'
import { useAtom } from 'jotai'
import { toDoListAtom } from '../../../states/toDoListAtom'
import { fetchTasks } from '../../../api/tasks.service'

const Task: React.FC<TasksProps> = ({ 
  task: initialTask, 
  index, 
  onRemove,
}) => {
  const [task, setTask] = useState<Tasks[]>(initialTask)
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isHoverImage, setIsHoverImage] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [todoList, setTodoList] = useAtom<Tasks[]>(toDoListAtom)

  useEffect(() => {
    const fetchAndSetTasks = async () => {
      try {
        const tasks: Tasks[] = await fetchTasks()
        console.log(tasks)
        setTodoList(tasks)
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
      }
    }
    fetchAndSetTasks()
  }, [])

  useEffect(() => {
    setTask(initialTask)
  }, [initialTask])
  
  const handleHover = (hover: boolean) => {
    setIsHover(hover)
  }

  const handleHoverImage = (hover: boolean) => {
    setIsHoverImage(hover)
  }
    
  const handleClickCircle = () => {
    setIsChecked(!isChecked)
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleRemove = () => {
    onRemove(task)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTask(event.currentTarget.value)
      setIsEditing(false)
    }
  }
    
  return (
    <div className={`toDoListContainer__toDoBox1st ${isEditing ? 'editing' : ''}`} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
      <div className="divCircle">
        <img
          onClick={handleClickCircle}
          className="divCircle__imgCircle"
          src={isChecked ? '/imgs/checked.png' : '/imgs/circle.png'}
          alt="Button to complete task"
          aria-label="Button to complete task"
          style={{ display: isEditing ? 'none' : 'block' }}
        />
      </div>
          {isEditing ? (
            <input
              type="text"
              defaultValue={task}
              onBlur={handleBlur}
              onChange={(event) => {
                setTask(event.target.value)
                let currentTask = task
                const indexTask = todoList.indexOf(currentTask)
                todoList[indexTask] = event.currentTarget.value
              }}
              className='toDoListContainer__toDoBox1st--input' 
              onKeyDown={handleKeyPress}
            />
          ) : (
            <div className={`toDoListContainer__toDoBox1st--inputDiv ${isChecked ? 'checked' : ''}`} onDoubleClick={handleDoubleClick}>
              {task}
            </div>
          )}
          <img
            className="toDoListContainer__toDoBox1st--imgCross"
            src={isHoverImage ? '/imgs/xRed.png' : '/imgs/x.png'}
            style={{ display: isHover && !isChecked && !isEditing ? 'block' : 'none' }}
            onMouseEnter={() => handleHoverImage(true)}
            onMouseLeave={() => handleHoverImage(false)}
            alt="Button to remove task"
            aria-label="Button to remove task"
            onClick={handleRemove}
          />
    </div>
  );
};

export default Task