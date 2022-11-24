import React from 'react';
import { SvgSelector } from '../../SvgSelector/SvgSelector';
import style from './Img.module.css';

interface IProps {
  handler: () => void;
  url: string;
}

export const Img: React.FC<IProps> = ({ handler, url }) => {
  return (
    <div className={style.img_container}>
      <button onClick={handler} className={style.remove_img}>
        <SvgSelector id="remove" />
      </button>
      <img className={style.img} alt="img" src={url} />
    </div>
  );
};
