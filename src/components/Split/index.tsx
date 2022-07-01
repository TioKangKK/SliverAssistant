import { CSSProperties, FC } from 'react'
import { View } from '@tarojs/components'
import './index.less'

type Props = {
  type?: 'horizontal' | 'vertical';
  className?: string;
  style?: string | CSSProperties;
}

const Split: FC<Props> = ({ type = 'horizontal', className = '', style }) => {
  return <View className={`split-${type} ${className}`} style={style} />
}

export default Split