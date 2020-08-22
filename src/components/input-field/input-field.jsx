import React from 'react'
import './input-field.scss'

const InputField = ({ input, handleChange, handleClick, handleKeyDown }) => {
  return (
    <div className='input'>
      <input
        maxLength='20'
        spellCheck='false'
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type='text'
        className='input__field'
        placeholder='New label ...'
      />
      <button onClick={handleClick} className='input__btn'></button>
    </div>
  )
}

export default InputField
