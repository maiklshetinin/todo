import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateTodo = async (title, color, text, date, heightText, nameImg, url, id) => {
  await updateDoc(doc(db, 'todos', id), {
    title: title,
    color: color,
    text: text,
    date,
    heightText: heightText,
    image: url,
    nameImage: nameImg,

    // completed: false
  })
}