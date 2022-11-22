import React from 'react'
import { SvgSelector } from '../SvgSelector/SvgSelector'

import style from './InputFile.module.css'

export const InputFile = ({ uploadFiles }) => {
  return (
    <label className={style.input_file}>
      <input
        type='file'
        accept="image/*, .png,.gif,jpg,.web"
        className={style.hidden}
        onChange={(e)=>uploadFiles(e)}
      />
      <SvgSelector id='clip' />
    </label>
  )
}