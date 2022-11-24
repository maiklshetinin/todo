import React from 'react';
import style from './InputTitle.module.css';

interface IProps {
  title: string;
  color: string;
  update: () => void;
  setTitle: (title: string) => void;
}

export const InputTitle: React.FC<IProps> = ({ title, color, update, setTitle }) => {
  return (
    <input
      value={title}
      style={{ background: color }}
      className={style.title}
      type="text"
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onBlur={update}
    />
  );
};
