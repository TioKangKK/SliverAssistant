import { View } from '@tarojs/components'
import { FC } from 'react'

import './Banner.less'

const Banner: FC = ({ children }) => {
  return (
    <View className='banner'>
      { children }
    </View>
  )
}

export default Banner
