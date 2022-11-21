import './App.css';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase'
import { useEffect, useState } from 'react';
import { Todo } from './components/Todo/Todo';
import { SvgSelector } from './components/SvgSelector/SvgSelector';

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

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
    if (!title || !text) return;

    await addDoc(collection(db, 'todos'), {
      title: title,
      text: text,
      completed: false
    })
    setTitle('')
    setText('')
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className='container'>
      <h3 className='title'>Todo</h3>
      <form
        onSubmit={createTodo}
        className='form'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className='input input_title' type='text' placeholder='title todo' />
        <input value={text} onChange={(e) => setText(e.target.value)} className='input input_text' type='text' placeholder='add todo' />

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
