import React from 'react';
import style from './TextAreaTodo.module.css';
interface IProps {
  heightText: string;
  text: string;
  setText: (text: string) => void;
  update: () => void;
  setHeightText: (height: string) => void;
}
export const TextAreaTodo: React.FC<IProps> = ({
  heightText,
  text,
  setText,
  update,
  setHeightText,
}) => {
  function handler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    setHeightText(e.target.scrollHeight + 'px');
    e.target.style.height = '1px';
    e.target.style.height = 1 + e.target.scrollHeight + 'px';
  }

  return (
    <textarea
      value={text}
      className={`${style.textarea} ${style.text}`}
      style={{ height: heightText }}
      onChange={handler}
      onBlur={() => update()}
    />
  );
};
