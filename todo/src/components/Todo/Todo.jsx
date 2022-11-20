import React from "react";
import { SvgSelector } from "../SvgSelector/SvgSelector";
import style from './Todo.module.css'

export const Todo = ({ todo, toggleHandler, deleteTodo, editInput }) => {
  return (
    <li className={todo.completed ? `${style.todo_item} ${style.completed}` : style.todo_item}>
      <input
        onChange={() => toggleHandler(todo)}
        type='checkbox' checked={todo.completed} />
      <input
        type='text'
        onChange={(e) => editInput(e.target.value,todo.id)}
      className={style.input_text}
      value={todo.text}
      />
      <button onClick={() => deleteTodo(todo.id)} className={style.btn}><SvgSelector id='delete' /></button>
    </li >
  )
}