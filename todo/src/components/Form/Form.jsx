import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../firebase";
import { SvgSelector } from "../SvgSelector/SvgSelector";
import { TextAreaForm } from "./TextareaForm/TextAreaForm";
export const Form = () => {
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [nameImg, setNameImg] = useState('')
  const [heightText, setHeightText] = useState('')

  const createTodo = async (e) => {
    e.preventDefault(e)
    // if (!url || !nameImg ) return;
    await addDoc(collection(db, 'todos'), {
      title: title ? title : 'title',
      text: text ? text : 'text',
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
    <form
      onSubmit={createTodo}
      className='form'>
      {progress ? <h3 className='progress'>Uploaded {progress} %</h3> : ''}
      <input value={title} onChange={(e) => setTitle(e.target.value)} className='input input_title' type='text' placeholder='title todo' />
      <TextAreaForm
        heightText={heightText}
        text={text}
        setText={setText}
        setHeightText={setHeightText}
      />
      <label className='input_file'>
        <div className='container_img'> <img className='img' src={url} alt='url' /></div>
        choose file
        <input
          className='hidden'
          type='file'
          accept="image/*, .png,.gif,jpg,.web"
          onChange={(e) => uploadFiles(e)} />
        <SvgSelector id='clip' />
      </label>
      <button
        className='button'><SvgSelector id='add' /></button>
    </form>
  )
}