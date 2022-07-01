import Card from '@/components/Card'
import { Image, View } from '@tarojs/components'
import { CSSProperties, FC } from 'react'
import IconVoiced from '@/assets/voiced.svg'
import IconArrowRight from '@/assets/arrow_right.svg'

import './index.less'

type Props = {
  count: number;
  style?: string | CSSProperties;
  className?: string;
}

const handleClick = () => {
  console.log('跳到消息通知去')
}

const NotificationEntry: FC<Props> = ({ count, style, className }) => {
  return (
    <Card style={style} className={className} onClick={handleClick}>
      <View className='notification-entry'>
        <View className='notification-entry-left'>
          <Image className='icon-voiced' src={IconVoiced} />
          消息通知
        </View>
        <View className='notification-entry-right'>
          {Boolean(count) && `${count}条新消息`}
          <Image className='icon-arrow-right' src={IconArrowRight} />
        </View>
      </View>
    </Card>
  )
}

export default NotificationEntry