import React from 'react'
import style from './InputDate.module.css'
export const InputDate = ({date,setDate}) => {

  return (
    <input
      className={style.input_date}
      type="date"
      value={date}
      onChange={(e) => {
        setDate(e.target.value)
      }}
    />
  )
}