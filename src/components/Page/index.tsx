import { Image, View } from '@tarojs/components';
import { useDidShow, getMenuButtonBoundingClientRect } from '@tarojs/taro';
import { FC, useMemo, useState } from 'react';
import BackgroundPng from '../../assets/background.png'
import './index.less';

type Props = {
  withTopBar?: boolean; // 是否展示原生顶栏
  title?: string; // 页面标题
}

const Page: FC<Props> = ({ withTopBar = false, title, children }) => {
  const wrapperClass = withTopBar ? 'page page-with-top-bar' : 'page'
  
  const [style, setStyle] = useState({
    safeTop: 18,
    titleTop: 50,
    titleHeight: 32,
  })

  const safeTopStyle = useMemo(() => ({ height: style.safeTop + 'px' }), [style])
  const titleStyle = useMemo(() => ({ top: style.titleTop + 'px', lineHeight: style.titleHeight + 'px' }), [style])

  useDidShow(() => {
    console.log('show??', withTopBar)
    const menuRect = getMenuButtonBoundingClientRect()
    !withTopBar && setStyle({ 
      safeTop: menuRect.bottom + 18,
      titleTop: menuRect.top,
      titleHeight: menuRect.height
    })
  })
  
  return (
    <View className={wrapperClass}>
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

export default Page