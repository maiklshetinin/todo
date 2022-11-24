import { ITodo } from 'components/types/ITodo';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const updateTodo = async (todo: ITodo) => {
  await updateDoc(doc(db, 'todos', todo.id), {
    title: todo.title,
    color: todo.color,
    text: todo.text,
    date: todo.date,
    heightText: todo.heightText,
    url: todo.url,
    nameImage: todo.nameImage,
    id: todo.id,
    completed: todo.completed,
  });
};
