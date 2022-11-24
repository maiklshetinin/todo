import React from 'react';
import { SvgSelector } from '../SvgSelector/SvgSelector';
import style from './InputFile.module.css';

interface IProps {
  uploadFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile: React.FC<IProps> = ({ uploadFiles }) => {
  return (
    <label className={style.input_file}>
      <input
        type="file"
        accept="image/*, .png,.gif,jpg,.web"
        className={style.hidden}
        onChange={(e) => uploadFiles(e)}
      />
      <SvgSelector id="clip" />
    </label>
  );
};
