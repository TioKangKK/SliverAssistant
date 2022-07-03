import { FC } from 'react'
import { View } from '@tarojs/components'

import './Banner.less'

const Banner: FC = ({ children }) => {
  return (
    <View className='banner'>
      { children }
    </View>
  )
}

export default Banner
