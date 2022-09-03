import { FC, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Image, ScrollView, View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'

import IconArrowRight from '@/assets/arrow_right.svg'

import { navigateTo } from '@/utils/navigator'

import { getNoticeList } from '@/service'
import { NoticeItem, NoticeType } from '@/service/types'

import './index.less'

const NotificationItem: FC<{
  text: string;
  createTime: string;
  isChecked?: boolean;
  isUrged?: boolean;
  onClick: () => void;
}> = ({ text, createTime, isChecked = false, isUrged= false, onClick }) => {
  return (
    <View className='notification-item'>
      <View className={`notification-item-text ${isChecked ? 'notification-item-checked' : ''}`}>
        {text}
        <View className='notification-item-create-time'>发起时间：{createTime}</View>
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

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  })
  const [loading, setLoading] = useState(false)
  const hasMore = useMemo(() => pagination.current * pagination.pageSize < pagination.total, [pagination])

  const getList = async (current = pagination.current) => {
    if (loading) { return; }
    setLoading(true)
    try {
      const offset = (current - 1) * pagination.pageSize
      const { list, total } = await getNoticeList({ offset, limit: pagination.pageSize });
      setData(pre => [...pre, ...list])
      setPagination(pre => ({ ...pre, current, total }))
    } finally {
      setLoading(false)
    }
  }

  const handleScrollToLower = () => {
    if (loading) { return; }
    if (!hasMore) { return; }
    getList(pagination.current + 1)
  }
  
  useDidShow(() => getList(1))

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
      <ScrollView className='notification-list-scroll' scrollY onScrollToLower={handleScrollToLower}>
        {data.map(item => (
          <NotificationItem
            key={item.id}
            text={item.detail.text}
            createTime={dayjs(item.create_time).format('YYYY-MM-DD hh:mm:ss')}
            onClick={() => handleClick(item.detail, item.notice_type)}
          />
        ))}
        <View className='notification-list-scroll-footer'>
          {loading ? '正在加载~' : hasMore ? '下滑加载更多' : '没有更多了~'}
        </View>
      </ScrollView>
    </View>
  )
}

export default NotificationListPage