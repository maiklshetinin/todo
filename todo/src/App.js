import './App.css';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { app, db, storage } from './firebase'
import { useEffect, useState } from 'react';
import { Todo } from './components/Todo/Todo';
import { SvgSelector } from './components/SvgSelector/SvgSelector';
import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";


function App() {
  const [progress, setProgress] = useState(0)
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')

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

  const toggleHandler = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  const updateTodo = async (title, text, id) => {
    await updateDoc(doc(db, 'todos', id), {
      title: title,
      text: text
    })
  }

  const createTodo = async (e) => {
    e.preventDefault(e)
    // if (!title || !text) return;
    await addDoc(collection(db, 'todos'), {
      title: title,
      text: text,
      image:url,
      completed: false
    })
    setTitle('')
    setText('')
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  const uploadFiles = async (e) => {
    const storageRef = ref(storage, `/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(prog)
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url=>setUrl(url))
      }

)
  }

return (
  <div className='container'>
    <h3>Uploaded { progress} %</h3>
    <h3 className='title'>Todo</h3>
    <form
      onSubmit={createTodo}
      className='form'>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className='input input_title' type='text' placeholder='title todo' />
      <input value={text} onChange={(e) => setText(e.target.value)} className='input input_text' type='text' placeholder='add todo' />
      <label className='input_file'>
        choose file
        <input
          // className='hidden'
          type='file'
          accept="image/*, .png,.gif,jpg,.web"
          onChange={(e) => uploadFiles(e)} />
        <SvgSelector id='clip' />
      </label>
      <button className='button'><SvgSelector id='add' /></button>
    </form>
    <ul className='todo_items'>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          toggleHandler={toggleHandler}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  </div >
);
}

export default App;
