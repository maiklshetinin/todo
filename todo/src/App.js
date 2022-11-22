import './App.css';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase'
import { useEffect, useState } from 'react';
import { Todo } from './components/Todo/Todo';
import { SvgSelector } from './components/SvgSelector/SvgSelector';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";



function App() {

  const [progress, setProgress] = useState(0)
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [nameImg, setNameImg] = useState('')
  const [heightText, setHeightText] = useState('')



  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      })
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])



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

  function textAreaAdjust(e) {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight) + "px";
    setHeightText((e.target.scrollHeight) + "px")
  }

  return (
    <div className='container'>
      {progress ? <h3 className='progress'>Uploaded {progress} %</h3> : ''}
      <h3 className='title'>Todo</h3>
      <form
        onSubmit={createTodo}
        className='form'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className='input input_title' type='text' placeholder='title todo' />
        <textarea value={text}
          style={{ height: heightText }}
          onChange={(e) => {
            setText(e.target.value)
            textAreaAdjust(e)
          }}
          className='textarea' type='text' placeholder='add todo' />
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
      <ul className='todo_items'>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </div >
  );
}

export default App;
