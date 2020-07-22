import React from 'react'
import Todo from '../../components/todo/todo'
import './todo.scss'

const TodoPage = () => (
  <div className='todo-page'>
    <h5>*Your input value has to be under 20 characters</h5>
    <h5>*Double-click the task name to edit</h5>
    <Todo />
  </div>
)

export default TodoPage
