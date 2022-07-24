import { Image, View } from "@tarojs/components"
import { CSSProperties, FC } from "react"

import IconEmpty from '@/assets/empty.svg'

import './index.less'

type Props = {
  className?: string;
  style?: CSSProperties;
}

const EmptyBox: FC<Props> = ({ children, style = {}, className = '' }) => {
  return (
    <View className={`empty-box ${className}`} style={style}>
      <Image className='empty-icon' src={IconEmpty} />
      <View>{children}</View>
    </View>
  )
}

export default EmptyBox