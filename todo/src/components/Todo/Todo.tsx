import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { deleteFile } from '../../api/deleteFiles';
import { deleteTodo } from '../../api/deleteTodo';
import { updateTodo } from '../../api/updateTodo';
import { storage } from '../../firebase';
import { SvgSelector } from '../SvgSelector/SvgSelector';
import { Checkbox } from './Checkbox/Checkbox';
import { InputColor } from './InputColor/InputColor';
import { TextAreaTodo } from './TextAreaTodo/TextAreaTodo';
import { InputTitle } from './InputTitle/InputTitle';
import style from './Todo.module.css';
import { InputFile } from '../InputFile/InputFile';
import { Img } from './Img/Img';
import { InputDateTodo } from './InputDateTodo/InputDateTodo';
import { ITodo } from 'components/types/ITodo';

interface IProps {
  todo: ITodo;
  key: number;
}

export const Todo: React.FC<IProps> = ({ todo }) => {
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [nameImage, setNameImg] = useState('');
  const [url, setUrl] = useState('');
  const [heightText, setHeightText] = useState('');
  const [color, setColor] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setTitle(todo.title);
    setText(todo.text);
    setNameImg(todo.nameImage);
    setUrl(todo.url);
    setHeightText(todo.heightText);
    setColor(todo.color);
    setDate(todo.date);
  }, [todo]);

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNameImg(e.target.files[0].name);
      const storageRef = ref(storage, `/${e.target.files[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(prog);
        },
        // eslint-disable-next-line no-console
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrl(url);
            setProgress(0);
            if (e.target.files)
              updateTodo({
                title: title,
                color: color,
                text: text,
                date: date,
                heightText: heightText,
                nameImage: e.target.files[0].name,
                url: url,
                id: todo.id,
                completed: todo.completed,
              });
          });
        }
      );
    }
  };

  const update = () => {
    updateTodo({
      title: title,
      color: color,
      text: text,
      date: date,
      heightText: heightText,
      nameImage: nameImage,
      url: url,
      id: todo.id,
      completed: todo.completed,
    });
  };

  const handler = () => {
    if (nameImage) {
      deleteFile(nameImage);
      setNameImg('');
      setUrl('');
      updateTodo({
        title,
        color,
        text,
        date,
        heightText,
        nameImage: '',
        url: '',
        id: todo.id,
        completed: todo.completed,
      });
    }
  };

  return (
    <li className={todo.completed ? `${style.todo_item} ${style.completed}` : style.todo_item}>
      <InputColor color={color} setColor={setColor} update={update} />
      <Checkbox todo={todo} />
      <InputTitle color={color} title={title} setTitle={setTitle} update={update} />
      <TextAreaTodo
        text={text}
        setHeightText={setHeightText}
        heightText={heightText}
        update={update}
        setText={setText}
      />

      <div className={style.container}>
        {progress ? <h3>Uploaded {progress} %</h3> : ''}

        {url && <Img handler={handler} url={url} />}

        {!url && <InputFile uploadFiles={uploadFiles} />}

        <InputDateTodo date={date} setDate={setDate} update={update} />

        <button onClick={() => deleteTodo(todo)} className={style.btn}>
          <SvgSelector id="delete" />
        </button>
      </div>
    </li>
  );
};
