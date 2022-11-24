import dayjs from 'dayjs';
import React from 'react';
import style from './InputDateTodo.module.css';

interface IProps {
  date: string;
  setDate: (date: string) => void;
  update: () => void;
}

export const InputDateTodo: React.FC<IProps> = ({ date, setDate, update }) => {
  return (
    <input
      className={
        dayjs().isAfter(date) ? `${style.input_date} ${style.expired_date}` : `${style.input_date}`
      }
      type="date"
      value={date}
      onBlur={() => update()}
      onChange={(e) => {
        setDate(e.target.value);
      }}
    />
  );
};
