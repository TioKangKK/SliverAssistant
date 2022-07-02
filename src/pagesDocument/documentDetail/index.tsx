import Button from '@/components/Button'
import Card from '@/components/Card'
import Page from '@/components/Page'
import Split from '@/components/Split'
import { Image, Picker, Text, View } from '@tarojs/components'
import { FC, useState } from 'react'
import IconPolygon from '@/assets/polygon.svg'
import IconArrowRight from '@/assets/arrow_right.svg'

import './index.less'

const mockInfo = {
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
  name: '周建',
  age: '75',
  phone: '13267778899',
  level: 1, // 观护等级
  levelName: '一级',
  address: '幸福里小区',
  volunteer: '小荷',
  documentCreator: '望江',
  documentCreateDate: '2021-01-01',
}
const DocumentDetailCard: FC<{ info: typeof mockInfo }> = ({ info }) => {
  const handleCheckDoc = () => { console.log('查看档案') }
  const handleAddWatchOver = () => { console.log('添加观护记录') }
  return (
    <Card className='document-detail-card'>
      <Button onClick={handleCheckDoc} className='document-detail-card-btn'>查看档案 &gt;</Button>
      <Image className='document-detail-card-avatar' src={info.avatar} />
      <View className='document-detail-card-basic'>
        <View className='document-detail-card-basic-1'>
          <View className='document-detail-card-name'>{info.name}</View>
          {info.age}岁
        </View>
        <View className='document-detail-card-basic-2'>{info.phone}</View>
      </View>
      <View className='document-detail-card-second'>
        <View className='document-detail-card-second-item'>{info.levelName}</View>
        <Split type='vertical' />
        <View className='document-detail-card-second-item'>{info.address}</View>
      </View>
      <View className='document-detail-card-third'>
        <View className='document-detail-card-third-item'>
          <View className='document-detail-card-third-item-left'>观护志愿者</View>
          <View className='document-detail-card-third-item-right'>{info.volunteer}</View>
        </View>
        <View className='document-detail-card-third-item'>
          <View className='document-detail-card-third-item-left'>建档者</View>
          <View className='document-detail-card-third-item-right'>{info.documentCreator}</View>
        </View>
        <View className='document-detail-card-third-item'>
          <View className='document-detail-card-third-item-left'>建档日期</View>
          <View className='document-detail-card-third-item-right'>{info.documentCreateDate}</View>
        </View>
      </View>
      {info.level < 3 && <Button className='document-detail-card-last-btn' type='default' onClick={handleAddWatchOver}>添加观护记录</Button>}
    </Card>
  )
}

const mockLogs = [
  {
    id: 1,
    date: '2022-05-05',
    volunteer: '禾小荷',
    status: '正常',
    statusType: 1,
  },
  {
    id: 1,
    date: '2022-05-05',
    volunteer: '禾小荷',
    status: '异常',
    statusType: 0,
    statusDescription: '慢性病发作，身体不适；进食状态不佳'
  },
]
const WatchOverLogs: FC = () => {
  const [date, setDate] = useState('')
  const handleCheckWatchOver = (item) => { console.log('watch over', item) }
  return (
    <View className='watch-over-logs'>
      <View className='watch-over-logs-header'>
        <View className='watch-over-logs-header-left'>帮扶记录</View>
        <View className='watch-over-logs-header-right'>
          <Picker mode='date' value={date} onChange={(e) => setDate(e.detail.value)}>
            <View className='watch-over-logs-filter'>
              <View>{date || '日期筛选'}</View>
              <Image className='icon-polygon' src={IconPolygon} />
            </View>
          </Picker>
        </View>
      </View>
      <View className='watch-over-logs-content'>
        {mockLogs.map(item => (
          <Card key={item.id} className='watch-over-log-card'>
            <View className='watch-over-log-card-header'>
              <View className='watch-over-log-card-header-left'>{item.date}</View>
              <View onClick={() => handleCheckWatchOver(item)} className='watch-over-log-card-header-right'>
                查看<Image src={IconArrowRight} className='icon-arrow-right' />
              </View>
            </View>
            <View className='watch-over-log-card-content'>
              <View className='watch-over-log-card-content-item'>观护志愿者：{item.volunteer}</View>
              <View className='watch-over-log-card-content-item'>
                观护情况：<Text style={{color: item.statusType ? '#219653' : '#F2994A'}}>{item.status}</Text>
              </View>
            </View>
            {item.statusDescription &&<View className='watch-over-log-card-footer'>
              {item.statusDescription}
            </View>}
          </Card>
        ))}
      </View>
    </View>
  )
}

const DocumentDetailPage: FC = () => {
  return (
    <Page>
      <DocumentDetailCard info={mockInfo} />
      {mockInfo.level < 3 && <WatchOverLogs />}
    </Page>
  )
}

export default DocumentDetailPage