import { FC, useState } from 'react'
import { Image, Picker, Text, View } from '@tarojs/components'
import { useDidShow, useRouter } from '@tarojs/taro'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Page from '@/components/Page'
import Split from '@/components/Split'

import { navigateTo } from '@/utils/navigator'

import { getDocument } from '@/service'
import { TDocument } from '@/service/types'
import { livingLevelToName } from '@/constants/user'

import IconPolygon from '@/assets/polygon.svg'
import IconArrowRight from '@/assets/arrow_right.svg'

import './index.less'

const DocumentProfileCard: FC<{ info: TDocument }> = ({ info }) => {
  const handleCheckDoc = () => navigateTo(`/pagesDocument/documentDetail/index?id=${info.id}`)
  const handleAddWatchOver = () => navigateTo(`/pagesWatchOver/watchOverForm/index?id=${null}`)
  return (
    <Card className='document-profile-card'>
      <Button onClick={handleCheckDoc} className='document-profile-card-btn'>查看档案 &gt;</Button>
      <Image className='document-profile-card-avatar' src={info.individual_info.photo_uris[0]} />
      <View className='document-profile-card-basic'>
        <View className='document-profile-card-basic-1'>
          <View className='document-profile-card-name'>{info.name}</View>
          {info.age}岁
        </View>
        <View className='document-profile-card-basic-2'>{info.individual_info.contact}</View>
      </View>
      <View className='document-profile-card-second'>
        <View className='document-profile-card-second-item'>{livingLevelToName[info.living_level]}</View>
        <Split type='vertical' />
        <View className='document-profile-card-second-item'>{info.individual_info.address}</View>
      </View>
      <View className='document-profile-card-third'>
        <View className='document-profile-card-third-item'>
          <View className='document-profile-card-third-item-left'>观护志愿者</View>
          <View className='document-profile-card-third-item-right'>{info.volunteer_id}</View>
        </View>
        <View className='document-profile-card-third-item'>
          <View className='document-profile-card-third-item-left'>建档者</View>
          <View className='document-profile-card-third-item-right'>{info.created_by}</View>
        </View>
        <View className='document-profile-card-third-item'>
          <View className='document-profile-card-third-item-left'>建档日期</View>
          <View className='document-profile-card-third-item-right'>{(info.created_at || '').slice(0, 10)}</View>
        </View>
      </View>
      {info.need_probation && <Button className='document-profile-card-last-btn' type='default' onClick={handleAddWatchOver}>添加观护记录</Button>}
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
  const handleCheckWatchOver = id => navigateTo(`/pagesWatchOver/watchOverDetail/index?id=${id}`)
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
              <View onClick={() => handleCheckWatchOver(item.id)} className='watch-over-log-card-header-right'>
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

const DocumentProfilePage: FC = () => {
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数

  const [doc, setDoc] = useState<TDocument | undefined>()

  const getData = async () => {
    const nextDoc = await getDocument({ id: params.id })
    setDoc(nextDoc)
  }

  useDidShow(async () => {
    await getData();
  })

  return (
    <Page>
      {doc && <DocumentProfileCard info={doc} />}
      {doc?.need_probation && <WatchOverLogs />}
    </Page>
  )
}

export default DocumentProfilePage