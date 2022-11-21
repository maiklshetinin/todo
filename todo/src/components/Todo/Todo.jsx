import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { deleteFile } from "../../api/deleteFiles";
import { updateTodo } from "../../api/updateTodo";
import { storage } from "../../firebase";
import { SvgSelector } from "../SvgSelector/SvgSelector";
import style from './Todo.module.css'

export const Todo = ({ todo, toggleHandler, deleteTodo }) => {
  const [title, setTitle] = useState(todo.title)
  const [text, setText] = useState(todo.text)
  const [nameImage, setNameImg] = useState(todo.nameImage)
  const [url, setUrl] = useState(todo.image)

  const uploadFiles = (e) => {
    setNameImg(e.target.files[0].name)
    const storageRef = ref(storage, `/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      // setProgress(prog)
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            setUrl(url)
            updateTodo(title, text, e.target.files[0].name, url, todo.id)
          })
      }
    )
  }

  const update = (e) => {
    updateTodo(title, text, nameImage, url, todo.id)
  }

  function textAreaAdjust(e) {
    e.target.style.height = "1px";
    e.target.style.height = (25 + e.target.scrollHeight) + "px";
  }

  const handler = () => {
    deleteFile(nameImage)
    setNameImg('')
    setUrl('')
    updateTodo(title, text, '', '', todo.id)
  }

  const upload = (e) => {
    uploadFiles(e, todo.id, title, text,)
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
        <div
          onClick={handler}
          className={style.img_container} >
          <img className={style.img} alt='img' src={url} />
        </div>
        <input
          className={style.input_completed}
          onChange={() => toggleHandler(todo)}
          type='checkbox' checked={todo.completed} />
        <label className={style.input_file}>
          <input type='file'
             className='hidden'
            onChange={upload}
          />
          <SvgSelector id='clip' />
        </label>
        <button onClick={() => deleteTodo(todo.id)} className={style.btn}><SvgSelector id='delete' /></button>
      </div>

    </li >
  )
}