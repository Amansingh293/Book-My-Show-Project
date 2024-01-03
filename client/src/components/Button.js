import React from 'react'

const Button = ({customClass , title}) => {

    console.log(customClass)
  return (
    <div className={customClass}>{title}</div>
  )
}

export default Button