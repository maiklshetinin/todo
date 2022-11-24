import { ITodo } from 'components/types/ITodo';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const toggleHandler = async (todo: ITodo) => {
  await updateDoc(doc(db, 'todos', todo.id), {
    completed: !todo.completed,
  });
};
