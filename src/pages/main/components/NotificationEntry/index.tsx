import { Image, View } from '@tarojs/components'
import { CSSProperties, FC } from 'react'

import Card from '@/components/Card'

import IconVoiced from '@/assets/voiced.svg'
import IconArrowRight from '@/assets/arrow_right.svg'

import { navigateTo } from '@/utils/navigator'

import './index.less'

type Props = {
  count: number;
  style?: string | CSSProperties;
  className?: string;
}

const NotificationEntry: FC<Props> = ({ count, style, className }) => {
  const handleClick = () => navigateTo('/pagesNotification/notificationList/index')
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