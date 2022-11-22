import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import { deleteFile } from "./deleteFiles"

export const deleteTodo = async (todo) => {
  await deleteDoc(doc(db, 'todos', todo.id))
  if(todo.nameImage)deleteFile(todo.nameImage)
}