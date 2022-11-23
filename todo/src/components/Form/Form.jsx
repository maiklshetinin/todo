import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../firebase";
import { InputFile } from "../InputFile/InputFile";
import { SvgSelector } from "../SvgSelector/SvgSelector";
import { TextAreaForm } from "./TextareaForm/TextAreaForm";
import style from './Form.module.css'
import { InputTitleForm } from "./InputTitleForm/InputTitleForm";
import 'dayjs/locale/es'
import dayjs from "dayjs";
import { InputDate } from "./InputDate/InputDate";


export const Form = () => {
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [nameImg, setNameImg] = useState('')
  const [heightText, setHeightText] = useState('')
  // const [dateNow, setDateNow] = useState('')
  const [date, setDate] = useState('')

  const createTodo = async (e) => {
    e.preventDefault(e)
    await addDoc(collection(db, 'todos'), {
      title: title,
      color: '#ffffff',
      text: text,
      date: date,
      heightText: heightText,
      image: url,
      nameImage: nameImg,
      completed: false
    })
    setTitle('')
    setText('')
    setUrl('')
    setNameImg('')
    setHeightText('22px')
  }

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
            setProgress(0)
            setUrl(url)
          })
      }
    )
  }

  return (
    <form onSubmit={createTodo} className={style.form}>
      {progress ? <h3 className={style.progress}>Uploaded {progress} %</h3> : ''}
      <InputTitleForm title={title} setTitle={setTitle} />

      <TextAreaForm
        heightText={heightText}
        text={text}
        setText={setText}
        setHeightText={setHeightText}
      />

      {url && <div className={style.container_img}><img className={style.img} src={url} alt='url' /></div>}

      <InputDate date={date} setDate={setDate} />

      <InputFile uploadFiles={uploadFiles} />

      <button className={style.button}><SvgSelector id='add' /></button>
    </form>
  )
}