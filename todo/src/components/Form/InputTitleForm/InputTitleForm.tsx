import React from 'react';
import style from './InputTitleForm.module.css';

interface IProps {
  title: string;
  setTitle: (title: string) => void;
}

export const InputTitleForm: React.FC<IProps> = ({ title, setTitle }) => {
  return (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className={style.input}
      type="text"
      placeholder="title todo"
    />
  );
};
