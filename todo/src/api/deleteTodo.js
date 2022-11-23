import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { deleteFile } from './deleteFiles';

/**
 * удаляет обьект из firebase и файл из storage(если есть в обьекте)
 * @param {*} todo обьект todo
 */
export const deleteTodo = async (todo) => {
  await deleteDoc(doc(db, 'todos', todo.id));
  if (todo.nameImage) deleteFile(todo.nameImage);
};
