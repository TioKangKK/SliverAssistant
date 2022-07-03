import { Image, Picker, View } from '@tarojs/components'
import { CSSProperties, FC } from 'react'
import IconPolygon from '@/assets/polygon.svg'
import './Selector.less'

type Props = {
  style?: string | CSSProperties;
  className?: string;
  value: string[];
  onChange?: (value) => void;
  placeholder?: string;
}

const RegionPicker: FC<Props> = ({ style, className, value, onChange = () => {}, placeholder }) => {
  const handleChange = (e) => { onChange(e.detail.value); }

  return (
    <Picker
      mode='region'
      value={value}
      onChange={handleChange}
    >
      <View style={style} className={`selector-fake-input ${className || ''}`}>
        {value && value.length
          ? <View className='selector-fake-input-text'>{value.join('-')}</View>
          : <View className='selector-fake-input-text selector-fake-input-tip'>{placeholder}</View>
        }
        <Image src={IconPolygon} className='icon-polygon' />
      </View>
    </Picker>
  )
}

export default RegionPicker