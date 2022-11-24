import React from 'react';
import style from './TextAreaForm.module.css';

interface IProps {
  heightText: string;
  text: string;
  setText: (text: string) => void;
  setHeightText: (height: string) => void;
}

export const TextAreaForm: React.FC<IProps> = ({ heightText, text, setText, setHeightText }) => {
  const handler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setHeightText(e.target.scrollHeight + 'px');
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <textarea
      value={text}
      className={style.textarea}
      placeholder="add todo"
      style={{ height: heightText }}
      onChange={(e) => handler(e)}
    />
  );
};
