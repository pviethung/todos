import React from 'react'
import './App.css'
import Home from './pages/home/home.jsx'
import { Switch, Route } from 'react-router-dom'
import TodoPage from './pages/todo/todo'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/todo/:id'>
          <TodoPage />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
