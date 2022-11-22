import React from 'react'
import style from './TextAreaTodo.module.css'

export const TextAreaTodo = ({ heightText, text, setText, update, setHeightText }) => {

  function textAreaAdjust(e) {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight) + "px";
    setHeightText((e.target.scrollHeight) + "px")
  }

  function handler(e) {
    setText(e.target.value)
    textAreaAdjust(e)
  }

  return (
    <textarea
      value={text}
      className={`${style.textarea} ${style.text}`}
      style={{ height: heightText }}
      type='text'
      onChange={handler}
      onBlur={()=>update()}
    />
  )
}