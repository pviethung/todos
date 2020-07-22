import React from 'react'
import './item.scss'
import { Link } from 'react-router-dom'

class Item extends React.Component {
  inputRef = React.createRef()
  state = {
    input: this.props.title,
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  renderItem = () => {
    const {
      id,
      title,
      handleDeleteItem,
      handleDoubleClick,
      handleBlur,
      handleCheckClick,
      isEditing,
      isComplete,
    } = this.props

    return (
      <div
        className={`item ${isEditing ? 'edit' : ''} ${
          isComplete ? 'hide' : ''
        }`}
      >
        <div
          className='item__show'
          onDoubleClick={(e) => {
            handleDoubleClick(id, this.inputRef)
          }}
        >
          {title}
        </div>
        <input
          maxLength='20'
          spellCheck='false'
          ref={this.inputRef}
          value={this.state.input}
          onChange={this.handleChange}
          type='text'
          className='item__edit-field'
          onBlur={() => {
            handleBlur(this.state.input)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleBlur(this.state.input)
          }}
        />

        <button
          onClick={(e) => {
            handleDeleteItem(e, id)
          }}
          className='item__delete-btn'
        ></button>

        {handleCheckClick && (
          <>
            <input
              onChange={() => {
                handleCheckClick(id)
              }}
              checked={isComplete ? true : false}
              className='checkbox'
              type='checkbox'
              id={id}
            ></input>
            <label htmlFor={id} className='item__check-btn'></label>
          </>
        )}
      </div>
    )
  }

  render() {
    return this.props.handleDoubleClick ? (
      this.renderItem()
    ) : (
      <Link to={`/todo/${this.props.id}`}>{this.renderItem()}</Link>
    )
  }
}

export default Item
