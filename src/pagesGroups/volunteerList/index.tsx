import Card from '@/components/Card'
import Split from '@/components/Split'
import { getVolunteerList } from '@/service'
import { Volunteer } from '@/service/types'
import { View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { FC, useState } from 'react'

import './index.less'

const VolunteerListPage: FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  useDidShow(async () => {
    const list = await getVolunteerList()
    setVolunteers(list)
  })

  return (
    <View className='volunteer-list'>
      {volunteers.map(item => (
        <Card key={item.id} className='volunteer-card'>
          <View className='volunteer-card-header'>
            <View className='volunteer-card-name'>{item.name}</View>
            <View className='volunteer-card-phone'>{item.phone}</View>
          </View>
          <Split style={{ marginTop: '10px' }} />
          <View className='volunteer-card-content'>
            <View className='volunteer-card-content-item'>本月观护: {item.monthCount || 0}次</View>
            <View className='volunteer-card-content-item'>累计观护: {item.totalCount || 0}次</View>
          </View>
        </Card>
      ))}
    </View>
  )
}

export default VolunteerListPage
