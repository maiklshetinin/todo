import React from 'react'
import style from './InputTitleForm.module.css'

export const InputTitleForm = ({ title, setTitle }) => {
  return (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className={style.input}
      type='text'
      placeholder='title todo'
    />

  )
}