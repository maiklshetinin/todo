import React from 'react';
import './App.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { useEffect, useState } from 'react';
import { Todo } from './components/Todo/Todo';
import { Form } from './components/Form/Form';
import { ITodo } from 'components/types/ITodo';

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const todosArr: any = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <h3 className="title">Todo</h3>
      <Form />
      <ul className="todo_items">
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
