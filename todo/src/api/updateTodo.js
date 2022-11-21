import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateTodo = async (title, text, nameImg, url, id) => {
  await updateDoc(doc(db, 'todos', id), {
    title: title,
    text: text,
    image: url,
    nameImage: nameImg,
    completed: false
  })
}