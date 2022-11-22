import React from 'react'
import style from './TextAreaForm.module.css'

export const TextAreaForm = ({ heightText, text, setText, setHeightText }) => {
  
  function textAreaAdjust(e) {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight) + "px";
    setHeightText((e.target.scrollHeight) + "px")
  }

  return (
    <textarea value={text}
      className={style.textarea} type='text' placeholder='add todo'
      style={{ height: heightText }}
      onChange={(e) => {
        setText(e.target.value)
        textAreaAdjust(e)
      }}
    />
  )
}