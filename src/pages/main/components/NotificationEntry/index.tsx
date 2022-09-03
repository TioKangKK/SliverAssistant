import { Image, View } from '@tarojs/components'
import { CSSProperties, FC } from 'react'
// import { requestSubscribeMessage } from '@tarojs/taro'

import Card from '@/components/Card'

import IconVoiced from '@/assets/voiced.svg'
import IconArrowRight from '@/assets/arrow_right.svg'

import { navigateTo } from '@/utils/navigator'

import './index.less'

type Props = {
  title: string;
  msg: string;
  style?: string | CSSProperties;
  className?: string;
}

const NotificationEntry: FC<Props> = ({ title, msg, style, className }) => {
  const handleClick = () => {
    // requestSubscribeMessage({
    //   tmplIds: ['47pxYHTBwTZVWHFVMU4UDctpvM0MoMNldcbnLySmLJs'],
    //   success: (res) => {
    //     console.log(res);
    //   }
    // })
    navigateTo('/pagesNotification/notificationList/index')
  }
  return (
    <Card style={style} className={className} onClick={handleClick}>
      <View className='notification-entry'>
        <View className='notification-entry-left'>
          <Image className='icon-voiced' src={IconVoiced} />
          {title}
        </View>
        <View className='notification-entry-right'>
          {msg}
          <Image className='icon-arrow-right' src={IconArrowRight} />
        </View>
      </View>
    </Card>
  )
}

export default NotificationEntry