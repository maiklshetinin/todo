import React from 'react'
import { SvgSelector } from '../../SvgSelector/SvgSelector'
import style from './InputColor.module.css'

export const InputColor = ({ setColor, color, update }) => {
  return (
    <label className={style.input_color_container}>
      <SvgSelector id="color" />
      <input
        type="color"
        className={style.input_color}
        value='#ffffff'
        onChange={(e) => setColor(e.target.value)}
        onBlur={() => update()} />
    </label>
  )
}