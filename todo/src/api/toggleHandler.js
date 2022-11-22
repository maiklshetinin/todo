import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const toggleHandler = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id), {
    completed: !todo.completed
  })
}