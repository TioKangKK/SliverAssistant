import { FC } from 'react'
import { navigateTo } from '@/utils/navigator'
import { Image, View } from '@tarojs/components'
import IconArrowRight from '@/assets/arrow_right.svg'

import './index.less'

const data = [
  {
    id: '1',
    text: '志愿者李某某提交了张某某的个人档案，请尽快审核',
    isChecked: false,
    isUrged: false,
  },
  {
    id: '2',
    text: '志愿者李某某提交了张某某的个人档案，请尽快审核',
    isChecked: false,
    isUrged: true,
  },
  {
    id: '3',
    text: '志愿者李某某提交了张某某的个人档案，请尽快审核',
    isChecked: true,
    isUrged: false,
  },
]

const NotificationItem: FC<{
  text: string;
  isChecked: boolean;
  isUrged: boolean;
  onClick: () => void;
}> = ({ text, isChecked, isUrged, onClick }) => {
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
  const handleClick = (id) => navigateTo(`/pagesNotification/notificationDetail/index?id=${id}`)
  return (
    <View className='notification-list'>
      {data.map(item => (
        <NotificationItem
          key={item.id}
          {...item}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </View>
  )
}

export default NotificationListPage