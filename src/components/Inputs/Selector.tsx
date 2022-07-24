import { Image, Picker, View } from '@tarojs/components'
import { CSSProperties, FC } from 'react'
import IconPolygon from '@/assets/polygon.svg'
import './Selector.less'

type Props = {
  style?: string | CSSProperties;
  className?: string;
  range: string[]
  value: number;
  onChange?: (value) => void;
  placeholder?: string;
}

const Selector: FC<Props> = ({ style, className, range, value, onChange = () => {}, placeholder }) => {
  const handleChange = (e) => { onChange(e.detail.value) }

  return (
    <Picker
      mode='selector'
      range={range}
      value={value}
      onChange={handleChange}
    >
      <View style={style} className={`selector-fake-input ${className || ''}`}>
        {range[value]
          ? <View className='selector-fake-input-text'>{range[value]}</View>
          : <View className='selector-fake-input-text selector-fake-input-tip'>{placeholder}</View>
        }
        <Image src={IconPolygon} className='icon-polygon' />
      </View>
    </Picker>
  )
}

export default Selector