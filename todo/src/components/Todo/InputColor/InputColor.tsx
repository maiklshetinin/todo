import React from 'react';
import { SvgSelector } from '../../SvgSelector/SvgSelector';
import style from './InputColor.module.css';

interface IProps {
  setColor: (str: string) => void;
  color: string;
  update: () => void;
}

export const InputColor: React.FC<IProps> = ({ setColor, color, update }) => {
  return (
    <label className={style.input_color_container}>
      <SvgSelector id="color" />
      <input
        type="color"
        className={style.input_color}
        value={color}
        onChange={(e) => setColor(e.target.value)}
        onBlur={() => update()}
      />
    </label>
  );
};
