import { FC, useMemo, useState } from 'react';
import { Image, View } from '@tarojs/components';
import { useDidShow, getMenuButtonBoundingClientRect } from '@tarojs/taro';

import BackgroundPng from '@/assets/background.png'

import './index.less';

const Page: FC = ({ children }) => {
  
  const [style, setStyle] = useState({
    backgroundOffset: -50,
  })

  const backgroundOffsetStyle = useMemo(() => ({ top: style.backgroundOffset + 'px' }), [style])

  useDidShow(() => {
    const menuRect = getMenuButtonBoundingClientRect()
    setStyle({ 
      backgroundOffset: -menuRect.bottom
    })
  })
  
  return (
    <View className='page'>
      <Image className='page-background' style={backgroundOffsetStyle} src={BackgroundPng} />
      <View className='safe-top' />
      <View className='page-container'>
        {children}
      </View>
      <View className='safe-bottom' />
    </View>
  )
}

export default Page