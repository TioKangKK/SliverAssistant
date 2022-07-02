import { Input as TaroInput } from '@tarojs/components'
import { CSSProperties, FC } from 'react'
import './Input.less'

type Props = {
  style?: string | CSSProperties;
  className?: string;
  value: string;
  placeholder?: string;
  onChange?: (value) => void;
  type?: "number" | "text" | "idcard" | "digit" | "safe-password" | "nickname"
}

const Input: FC<Props> = ({ style, className, value, onChange = () => {}, placeholder, type }) => {
  const handleInput = (e) => { onChange(e.detail.value) }

  return (
    <TaroInput
      type={type}
      style={style}
      className={`input ${className || ''}`}
      value={value}
      onInput={handleInput}
      placeholder={placeholder}
    />
  )
}

export default Input;