import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 *тоглит переключатель чекбокса на todo
 * @param {todo} todo обьект todo
 */
export const toggleHandler = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id), {
    completed: !todo.completed,
  });
};
