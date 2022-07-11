import Card from '@/components/Card'
import Split from '@/components/Split'
import { View } from '@tarojs/components'
import { FC } from 'react'

import './index.less'

const data = [
  { id: '1', name: '李梅', phone: '13888888888', monthCount: 3, totalCount: 100 },
  { id: '2', name: '李兰', phone: '13888888888', monthCount: 30, totalCount: 1000 },
]

const VolunteerListPage: FC = () => {
  return (
    <View className='volunteer-list'>
      {data.map(item => (
        <Card key={item.id} className='volunteer-card'>
          <View className='volunteer-card-header'>
            <View className='volunteer-card-name'>{item.name}</View>
            <View className='volunteer-card-phone'>{item.phone}</View>
          </View>
          <Split style={{ marginTop: '10px' }} />
          <View className='volunteer-card-content'>
            <View className='volunteer-card-content-item'>本月观护: {item.monthCount}次</View>
            <View className='volunteer-card-content-item'>累计观护: {item.totalCount}次</View>
          </View>
        </Card>
      ))}
    </View>
  )
}

export default VolunteerListPage
