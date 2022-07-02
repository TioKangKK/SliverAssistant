import { View } from '@tarojs/components'
import { FC } from 'react'
import './index.less'

const Footer: FC = ({children}) => {
  return (
    <View className='footer'>
      {children}
    </View>
  )
}

export default Footer