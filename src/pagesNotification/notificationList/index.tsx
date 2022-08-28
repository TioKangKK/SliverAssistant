import { FC, useState } from 'react'
import { Image, View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'

import IconArrowRight from '@/assets/arrow_right.svg'

import { navigateTo } from '@/utils/navigator'

import { getNoticeList } from '@/service'
import { NoticeItem, NoticeType } from '@/service/types'

import './index.less'


const NotificationItem: FC<{
  text: string;
  isChecked?: boolean;
  isUrged?: boolean;
  onClick: () => void;
}> = ({ text, isChecked = false, isUrged= false, onClick }) => {
  return (
    <View className='notification-item'>
      <View className={`notification-item-text ${isChecked ? 'notification-item-checked' : ''}`}>
        {text}
      </View>
      <View onClick={onClick} className='notification-item-btn'>
        {isUrged && <View className='red-point' />}
        <View>查看</View>
        <Image src={IconArrowRight} className='icon-arrow-right' />
      </View>
    </View>
  )
}

const NotificationListPage: FC = () => {
  const [data, setData] = useState<NoticeItem[]>([])
  useDidShow(async () => {
    const list = await getNoticeList({ offset: 0, limit: 1000 });
    setData(list)
  })
  const handleClick = (detail: NoticeItem['detail'], noticeType: NoticeType) => {
    if (noticeType === NoticeType.VolunteerRegister) {
      const id = detail.user_id, text = detail.text;
      navigateTo(`/pagesNotification/notificationRegister/index?id=${id}&text=${text}`)
    } else if (noticeType === NoticeType.SubmitDoc) {
      const id = detail.doc_id
      navigateTo(`/pagesNotification/notificationDocument/index?id=${id}`)
    } else if (noticeType === NoticeType.SubmitRiskCare) {
      // ..
      const id = detail.user_id
      navigateTo(`/pagesNotification/notificationWatchOver/index?id=${id}`)
    }
  }
  return (
    <View className='notification-list'>
      {data.map(item => (
        <NotificationItem
          key={item.id}
          text={item.detail.text}
          onClick={() => handleClick(item.detail, item.notice_type)}
        />
      ))}
    </View>
  )
}

export default NotificationListPage