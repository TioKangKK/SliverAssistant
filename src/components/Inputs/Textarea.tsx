import { Textarea as TaroTextarea } from '@tarojs/components'
import { CSSProperties, FC } from 'react'
import './Textarea.less'

type Props = {
  style?: string | CSSProperties;
  className?: string;
  value: string;
  onChange?: (value) => void;
  placeholder?: string;
}

const Textarea: FC<Props> = ({ style, className, value, onChange = () => {}, placeholder }) => {
  const handleInput = (e) => { onChange(e.detail.value) }

  return (
    <TaroTextarea
      style={style}
      className={`textarea ${className || ''}`}
      value={value}
      onInput={handleInput}
      placeholder={placeholder}
    />
  )
}

export default Textarea