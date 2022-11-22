import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateTodo = async (title, color, text, heightText, nameImg, url, id) => {
  await updateDoc(doc(db, 'todos', id), {
    title: title,
    color: color,
    text: text,
    heightText: heightText,
    image: url,
    nameImage: nameImg,

    // completed: false
  })
}