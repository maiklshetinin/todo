import './App.css';
import {  collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase'
import { useEffect, useState } from 'react';
import { Todo } from './components/Todo/Todo';
import { Form } from './components/Form/Form';

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      })
      console.log(' console.log(todosArr)',todosArr);
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className='container'>
      <h3 className='title'>Todo</h3>
      <Form/>
      <ul className='todo_items'>
        {todos.map((todo, index) => (<Todo key={index} todo={todo} />))}
      </ul>
    </div >
  );
}

export default App;
