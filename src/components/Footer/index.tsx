import { View } from '@tarojs/components'
import { FC } from 'react'
import './index.less'

type Props = {
  className?: string;
}

const Footer: FC<Props> = ({ children, className }) => {
  return (
    <View className={`footer ${className || ''}`}>
      {children}
    </View>
  )
}

export default Footer