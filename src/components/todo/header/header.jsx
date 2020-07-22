import React from 'react'
import './header.scss'

const Header = ({ title, items }) => (
  <div className='header'>
    <h1 className='heading'>{title}</h1>
    <p className='sub-heading'>
      {`${
        items.filter(({ isComplete }) => isComplete === false).length
      } tasks left`}
    </p>
  </div>
)

export default Header
