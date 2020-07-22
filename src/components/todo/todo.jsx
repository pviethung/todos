import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import InputField from '../input-field/input-field'
import Item from '../item/item'
import './todo.scss'
import Header from './header/header'
import Footer from './footer/footer'

class Todo extends React.Component {
  state = {
    id: '',
    title: '',
    items: [],
    input: '',
    isValidUrl: true,
    editingItem: '',
    filter: 'All',
  }

  allItems = []

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  handleClick = () => {
    if (!this.state.input.trim()) return
    if (this.state.input.length > 30) return

    let id = Date.now().toString()
    let taskName = this.state.input
    let date = new Intl.DateTimeFormat('en-GB').format(Date.now())

    let item = { id, taskName, date, isComplete: false }
    this.setState((preState) => ({
      items: [item, ...preState.items],
      input: '',
    }))
  }

  handleDoubleClick = (id, ref) => {
    let item = this.state.items.find((item) => item.id === id)
    if (item.isComplete) return

    this.setState({ editingItem: id }, () => {
      ref.current.focus()
    })
  }

  handleBlur = (newTask) => {
    if (!newTask.trim()) return
    if (newTask.length > 30) return
    let items = this.state.items.map((item) =>
      item.id === this.state.editingItem ? { ...item, taskName: newTask } : item
    )

    this.setState({ items, editingItem: '' })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') this.handleClick()
  }

  handleDeleteItem = (e, itemId) => {
    let items = this.state.items.filter(({ id }) => id !== itemId)

    this.setState({ items })
  }

  handleCheckClick = (itemId) => {
    let items = this.state.items.map((item) =>
      item.id === itemId ? { ...item, isComplete: !item.isComplete } : item
    )
    this.setState({ items })
  }

  handleNavClick = (filter) => {
    this.setState({ filter })
  }

  handleClearClick = () => {
    let items = this.state.items.filter(
      ({ isComplete }) => isComplete === false
    )

    this.setState({ items })
  }

  componentDidMount() {
    this.allItems = JSON.parse(localStorage.getItem('todos'))
    if (!this.allItems) return

    let item = this.allItems.find(({ id }) => id === this.props.match.params.id)
    if (!item) this.setState({ isValidUrl: false })
    else this.setState({ id: item.id, title: item.title, items: item.items })
  }

  componentDidUpdate() {
    let id = this.state.id
    let title = this.state.title
    let items = this.state.items

    let allItems = this.allItems.map((item) =>
      item.id === id ? { ...item, title, items } : item
    )

    localStorage.setItem('todos', JSON.stringify(allItems))
  }

  renderItems = () => {
    let items = this.state.items
    let filteredItems = []
    switch (this.state.filter) {
      case 'All':
        filteredItems = items
        break
      case 'Completed':
        filteredItems = items.filter(({ isComplete }) => isComplete === true)
        break
      case 'Active':
        filteredItems = items.filter(({ isComplete }) => isComplete === false)
        break
      default:
        break
    }

    return filteredItems.map(({ id, taskName, date, isComplete }) => (
      <div key={id} className='todo__item'>
        <Item
          key={id}
          id={id}
          title={taskName}
          handleDoubleClick={this.handleDoubleClick}
          handleBlur={this.handleBlur}
          handleDeleteItem={this.handleDeleteItem}
          handleCheckClick={this.handleCheckClick}
          isEditing={id === this.state.editingItem}
          isComplete={isComplete}
        />
        <span className='todo__date'>{date}</span>
      </div>
    ))
  }

  render() {
    return this.state.isValidUrl ? (
      <div className='todo'>
        <Header title={this.state.title} items={this.state.items} />
        <div className='todo__input-field'>
          <InputField
            input={this.state.input}
            handleClick={this.handleClick}
            handleChange={this.handleChange}
            handleKeyDown={this.handleKeyDown}
          />
        </div>
        {this.renderItems()}

        <Footer
          filter={this.state.filter}
          handleNavClick={this.handleNavClick}
          handleClearClick={this.handleClearClick}
        />
      </div>
    ) : (
      <Redirect to='/' />
    )
  }
}

export default withRouter(Todo)
