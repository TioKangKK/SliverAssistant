import { FC, useMemo, useState } from 'react';
import { Image, View } from '@tarojs/components';
import { useDidShow, getMenuButtonBoundingClientRect } from '@tarojs/taro';

import BackgroundPng from '@/assets/background.png'

import './index.less';

type Props = {
  title?: string; // 页面标题
}

const PageWithoutTopBar: FC<Props> = ({ title, children }) => {  
  const [style, setStyle] = useState({
    safeTop: 98,
    titleTop: 50,
    titleHeight: 32,
  })

  const safeTopStyle = useMemo(() => ({ height: style.safeTop + 'px' }), [style])
  const titleStyle = useMemo(() => ({ top: style.titleTop + 'px', lineHeight: style.titleHeight + 'px' }), [style])

  useDidShow(() => {
    const menuRect = getMenuButtonBoundingClientRect()
    setStyle({ 
      safeTop: menuRect.bottom + 18,
      titleTop: menuRect.top,
      titleHeight: menuRect.height
    })
  })
  
  return (
    <View className='page-without-top-bar'>
      <Image className='page-background' src={BackgroundPng} />
      { title && <View className='page-title' style={titleStyle}>{title}</View> }
      <View className='safe-top' style={safeTopStyle} />
      <View className='page-container'>
        {children}
      </View>
      <View className='safe-bottom' />
    </View>
  )
}

export default PageWithoutTopBar