import React from 'react'
import './footer.scss'

const Footer = ({ filter, handleNavClick, handleClearClick }) => {
  console.log(filter)
  return (
    <div className='footer'>
      <span
        className={filter === 'All' ? 'active' : undefined}
        onClick={handleNavClick.bind(null, 'All')}
      >
        All
      </span>
      <span
        className={filter === 'Active' ? 'active' : undefined}
        onClick={handleNavClick.bind(null, 'Active')}
      >
        Active
      </span>
      <span
        className={filter === 'Completed' ? 'active' : undefined}
        onClick={handleNavClick.bind(null, 'Completed')}
      >
        Completed
      </span>
      <span onClick={handleClearClick}>Clear Completed</span>
    </div>
  )
}

export default Footer
