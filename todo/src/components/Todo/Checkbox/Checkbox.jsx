import React from 'react'
import style from './Checkbox.module.css'
import { toggleHandler } from '../../../api/toggleHandler'

export const Checkbox = ({ todo }) => {
  return (
    <input
      className={style.input_completed}
      onChange={() => toggleHandler(todo)}
      type='checkbox'
      checked={todo.completed}
    />
  )
}