import React from 'react'
import style from './InputTitle.module.css'

export const InputTitle = ({ title, color,update,setTitle }) => {
  return (
    <input
      value={title}
      style={{ background: color }}
      className={style.title}
      type='text'
      onChange={(e) => { setTitle(e.target.value) }}
      onBlur={update}
    />
  )
}