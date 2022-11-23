import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * отправляет запрос на обновление документа с полями:
 * @param {string} title
 * @param {string} color
 * @param {string} text
 * @param {string} date
 * @param {string} heightText
 * @param {string} nameImg
 * @param {string} url
 * @param {string} id
 */

export const updateTodo = async (title, color, text, date, heightText, nameImg, url, id) => {
  await updateDoc(doc(db, 'todos', id), {
    title: title,
    color: color,
    text: text,
    date: date,
    heightText: heightText,
    image: url,
    nameImage: nameImg,
    id: id,
  });
};
