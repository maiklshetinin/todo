import React from 'react';
import style from './Checkbox.module.css';
import { toggleHandler } from '../../../api/toggleHandler';
import { ITodo } from 'components/types/ITodo';

interface IProps {
  todo: ITodo;
}

export const Checkbox: React.FC<IProps> = ({ todo }) => {
  return (
    <input
      className={style.input_completed}
      onChange={() => toggleHandler(todo)}
      type="checkbox"
      checked={todo.completed}
    />
  );
};
