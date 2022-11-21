import React, { useState } from "react";
import { SvgSelector } from "../SvgSelector/SvgSelector";
import style from './Todo.module.css'

export const Todo = ({ todo, toggleHandler, deleteTodo, updateTodo }) => {
  const [title, setTitle] = useState(todo.title)
  const [text, setText] = useState(todo.text)


  const update = (e) => {
    updateTodo(title, text, todo.id)
  }

  function textAreaAdjust(e) {
    e.target.style.height = "1px";
    e.target.style.height = (25 + e.target.scrollHeight) + "px";
  }

  return (
    <li className={todo.completed ? `${style.todo_item} ${style.completed}` : style.todo_item}>
      <input
        className={`${style.input} ${style.title}`}
        type='text'
        onChange={(e) => { setTitle(e.target.value) }}
        value={title}
      />
      <textarea
        className={`${style.input} ${style.text}`}
        type='text'
        onChange={(e) => { setText(e.target.value) }}
        onBlur={(e) => {
          update()
          textAreaAdjust(e)
        }
        }
        value={text}
      />
      <div className={style.container}>
        <div className={style.img_container}>
          <img className={style.img} alt='img' src={todo.image} />
        </div>
        <input
          className={style.input_completed}
          onChange={() => toggleHandler(todo)}
          type='checkbox' checked={todo.completed} />
        <label className={style.input_file}>
          <input type='file' />
          <SvgSelector id='clip' />
        </label>
        <button onClick={() => deleteTodo(todo.id)} className={style.btn}><SvgSelector id='delete' /></button>
      </div>

    </li >
  )
}