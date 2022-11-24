import React from 'react';
import style from './InputDate.module.css';

interface IProps {
  date: string;
  setDate: (date: string) => void;
}
export const InputDate: React.FC<IProps> = ({ date, setDate }) => {
  return (
    <input
      className={style.input_date}
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  );
};
