import { FC } from 'react'
import { View } from '@tarojs/components'

import Card from '@/components/Card'
import Banner from '@/components/Displays/Banner'
import FormContent from '@/components/Displays/FormContent'
import ImageList from '@/components/Displays/ImageList'
import Form, { FormConfigItem } from '@/components/Form'
import Page from '@/components/Page'

import './index.less'

const render = value => <FormContent>{value}</FormContent>
const getFormConfig = (data: { [x: string]: any }): FormConfigItem[] => [
  { key: 'date', render: (value) => <Banner>观护日期: {value}</Banner> },
  { key: 'name', label: '姓名', render, },
  { key: 'health', label: '身体情况', render },
  ...(data.health === 0 ? [
    { key: 'healthAbnormal', label: '身体情况异常记录', render },
    { key: 'healthFollowUp', label: '身体情况跟进记录', render }
  ] : []),
  { key: 'diet', label: '饮食情况', render, },
  ...(data.diet === 0 ? [
    { key: 'dietAbnormal', label: '饮食情况异常记录', render, },
    { key: 'dietFollowUp', label: '饮食情况跟进记录', render }
  ] : []),
]

const image = 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
const mockData = {
  id: 1,
  date: '2022-06-06',
  name: '康康康',
  health: 1,
  diet: 0,
  dietAbnormal: '???',
  dietFollowUp: '???',
  images: new Array(5).fill(image)
}

const WatchOverDetailPage: FC = () => {
  const formConfig = getFormConfig(mockData)

  return (
    <Page>
      <Card>
        <Form config={formConfig} data={mockData} />
      </Card>
      <Card>
        <View className='watch-over-photo-title'>照片</View>
        <ImageList urls={mockData.images} />
      </Card>
    </Page>
  )
}

export default WatchOverDetailPage
