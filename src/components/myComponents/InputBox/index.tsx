import React, { useState } from 'react'
import styles from './index.less'
import { Input } from 'antd'
interface Props {
  label: string;
  value: any;
  onChange: (value: any) => any;
  placeholder?: string;
  suffix?: any; // 单位
}
function InputBox ({label, value, onChange, placeholder, suffix}: Props ){
  const inputChange = ( e: any ) =>{
    onChange(e.target.value)
  }

  return (
    <div className={styles.inputBox}>
      <div className={styles.inputLabel}>{label}：</div>
      <Input
        value={value}
        style={{width: '600px'}}
        // size='small'
        onChange={inputChange}
        placeholder={placeholder}
        suffix={suffix}
      />
    </div>
  )
}
export default InputBox
