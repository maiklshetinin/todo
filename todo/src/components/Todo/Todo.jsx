import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { deleteFile } from "../../api/deleteFiles";
import { deleteTodo } from "../../api/deleteTodo";
import { toggleHandler } from "../../api/toggleHandler";
import { updateTodo } from "../../api/updateTodo";
import { storage } from "../../firebase";
import { SvgSelector } from "../SvgSelector/SvgSelector";
import { Checkbox } from "./Checkbox/Checkbox";
import { FileTodo } from "./FileTodo/FileTodo";
import { TextAreaTodo } from "./TextAreaTodo/TextAreaTodo";
import style from './Todo.module.css'

export const Todo = ({ todo }) => {
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState(todo.title)
  const [text, setText] = useState(todo.text)
  const [nameImage, setNameImg] = useState(todo.nameImage)
  const [url, setUrl] = useState(todo.image)
  const [heightText, setHeightText] = useState(todo.heightText)

  const uploadFiles = (e) => {
    setNameImg(e.target.files[0].name)
    const storageRef = ref(storage, `/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(prog)
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            setUrl(url)
            setProgress(0)
            updateTodo(title, text, heightText, e.target.files[0].name, url, todo.id)
          })
      }
    )
  }

  const update = () => {
    updateTodo(title, text, heightText, nameImage, url, todo.id)
  }


  const handler = () => {
    if (nameImage) {
      deleteFile(nameImage)
      setNameImg('')
      setUrl('')
      updateTodo(title, text, heightText, '', '', todo.id)
    }
  }

  // const upload = (e) => {
  //   uploadFiles(e, todo.id, title, text,)
  // }

  return (
    <li className={todo.completed ? `${style.todo_item} ${style.completed}` : style.todo_item}>
      <input
        value={title}
        className={`${style.input} ${style.title}`}
        type='text'
        onChange={(e) => { setTitle(e.target.value) }}
      />
      <TextAreaTodo
        text={text}
        setHeightText={setHeightText}
        heightText={heightText}
        update={update}
        setText={setText}
      />

      <div className={style.container}>

        <div className={style.img_container} >
          {/* onClick={handler} */}
          <button></button>
          <img className={style.img} alt='img' src={url} />
          {progress ? <h3>Uploaded {progress} %</h3> : ''}
        </div>

        <Checkbox todo={todo} />
        <FileTodo uploadFiles={uploadFiles } />
        <button onClick={() => deleteTodo(todo)} className={style.btn}><SvgSelector id='delete' /></button>
      </div>
    </li >
  )
}