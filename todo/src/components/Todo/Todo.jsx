import React from "react";
import { SvgSelector } from "../SvgSelector/SvgSelector";
import style from './Todo.module.css'

export const Todo = ({ todo, toggleHandler, deleteTodo }) => {
  return (
    <li className={todo.completed ? `${style.todo_item} ${style.completed}` : style.todo_item}>
      <input
        onChange={() => toggleHandler(todo)}
        type='checkbox' checked={todo.completed} />
      <p
        onClick={() => toggleHandler(todo)}
        className={style.text}>{todo.text}</p>
      <button
        onClick={() => deleteTodo(todo.id)}
        className={style.btn}><SvgSelector id='delete' /></button>
    </li >
  )
}