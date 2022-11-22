import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateTodo = async (title, text, heightText, nameImg, url, id) => {
  await updateDoc(doc(db, 'todos', id), {
    title: title,
    text: text,
    heightText: heightText,
    image: url,
    nameImage: nameImg,
    // completed: false
  })
}