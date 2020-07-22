import React from 'react'
import './todolist.scss'
import InputField from '../input-field/input-field'
import Item from '../item/item'

class TodoList extends React.Component {
  state = {
    input: '',
    items: [],
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  handleClick = () => {
    let title = this.state.input
    if (!title.trim()) return

    let id = Date.now().toString()
    let newItem = { id, title, items: [] }

    this.setState((preState) => ({
      items: [...preState.items, newItem],
      input: '',
    }))
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleClick(e)
    }
  }

  handleDeleteItem = (e, itemId) => {
    e.preventDefault()
    e.stopPropagation()

    let items = this.state.items.filter(({ id }) => id !== itemId)
    this.setState({ items })
  }

  componentDidMount() {
    let items = JSON.parse(localStorage.getItem('todos'))
    if (!items) return
    this.setState({ items })
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.items))
  }

  renderItems() {
    if (!this.state.items) return
    return this.state.items.map(({ title, id }) => (
      <Item
        handleDeleteItem={this.handleDeleteItem}
        title={title}
        key={id}
        id={id}
      />
    ))
  }

  render() {
    return (
      <div className='todolist'>
        <InputField
          input={this.state.input}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleKeyDown={this.handleKeyDown}
        />
        {this.renderItems()}
      </div>
    )
  }
}

export default TodoList
