import React from 'react'
import { SvgSelector } from '../../SvgSelector/SvgSelector'
import style from './FileTodo.module.css'

export const FileTodo = ({ uploadFiles }) => {
  return (
    <label className={style.input_file}>
      <input type='file'
        className='hidden'
        onChange={(e)=>uploadFiles(e)}
      />
      <SvgSelector id='clip' />
    </label>
  )
}