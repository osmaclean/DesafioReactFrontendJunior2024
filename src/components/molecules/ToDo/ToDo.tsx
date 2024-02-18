import React, { useEffect, useState } from 'react'
import './index.scss'
import { useAtom } from 'jotai'
import { toDoListAtom } from '../../../states/toDoListAtom'
import Task from '../../atoms/Task/Task'
import { Tasks, ToDoProps } from '../../../@types'

const ToDo: React.FC<ToDoProps> = ({isSecondBoxVisible, setIsSecondBoxVisible}) => {
  const [todoList, setTodoList] = useAtom(toDoListAtom)
  
  const handleAddTask = (newTask: Tasks) => {
    if (newTask && !todoList.includes(newTask)) setTodoList([...todoList, newTask])
  }

  const handleRemoveTask = (taskToRemove: Tasks) => {
      setTodoList(todoList.filter((task) => task !== taskToRemove))      
  }

  useEffect(() => {
    if (todoList.length === 0) {
      setIsSecondBoxVisible(false);
    }
  }, [todoList, isSecondBoxVisible])

  useEffect(() => {
  }, [todoList])

  const sortedTodoList = [...todoList].reverse()
  const taskCount = todoList.length

  return (
    <section className='toDoListContainer'>
      {sortedTodoList.map((task, index) => ( 
          <Task 
            key={index} 
            index={index}
            task={task} 
            onRemove={handleRemoveTask}
            onChange={(event) => handleAddTask(event.target.value)}
          />
      ))}
      <div className='divisor'></div>
      <div className='toDoListContainer__toDoBox2nd' style={{display: isSecondBoxVisible ? 'flex' : 'none'}}>
        <h3 className='toDoListContainer__toDoBox2nd--count'>
          {taskCount} item{taskCount === 1 ? '' : 's'} left!
        </h3>
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