import React from 'react'
import TodoList from '../../components/todolist/todolist'
import myImg from '../../assets/img1.svg'
import './home.scss'

const HomePage = () => (
  <div className='home'>
    <h1>ToDos</h1>
    <img src={myImg} alt='home' />
    <TodoList />
    <blockquote>
      <p>
        " It takes many good deeds to build a good reputation, and only one bad
        one to lose it. "
      </p>
      <cite>- Benjamin Franklin</cite>
    </blockquote>
    <h5>*Click to a item for editing details</h5>
  </div>
)

export default HomePage
