import { Image, View } from '@tarojs/components'
import { FC, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Split from '@/components/Split'
import Footer from '@/components/Footer'

import { navigateTo } from '@/utils/navigator'

import IconEmpty from '@/assets/empty.svg'
import IconArrowRight from '@/assets/arrow_right.svg'
import { useDidShow } from '@tarojs/taro'
import { getGroupList } from '@/service'

import './index.less'

const data = [
  {
    id: '1',
    name: '分组1',
    volunteers: ['李雪', '韩梅梅', '李华'],
    elders: ['李朝阳', '李钊', '李昭', '李兆', '李召', '李照'],
  },
  {
    id: '1',
    name: '分组1',
    volunteers: ['李雪', '韩梅梅', '李华'],
    elders: ['李朝阳', '李钊', '李昭', '李兆', '李召', '李照'],
  },
]

const GroupListPage: FC = () => {
  const handleGoToForm = (id?: string | number) => navigateTo(`/pagesGroups/groupForm/index${id ? '?id=' + id : ''}`)

  const [list, setList] = useState([])
  useDidShow(async () => {
    const groupList = await getGroupList()
    setList(groupList)
  })

  return (
    <View className='group-list'>
      {data.length 
        ? (data.map(item => (
          <Card key={item.id} className='group-card'>
            <View className='group-card-header'>
              <View className='group-card-header-left'>{item.name}</View>
              <View onClick={() => handleGoToForm(item.id)} className='group-card-header-right'>
                管理<Image src={IconArrowRight} className='icon-arrow-right' />
              </View>
            </View>
            <Split style={{ marginTop: '10px' }} />
            <View className='group-card-content'>
              <View className='group-card-content-item'>志愿者{item.volunteers.length}人: {item.volunteers.join(',')}</View>
              <View className='group-card-content-item'>老人{item.elders.length}人: {item.elders.join(',')}人</View>
            </View>
          </Card>
        )))
        : (
          <View className='group-list-empty'>
            <View className='group-list-empty-wrapper'>
              <Image className='group-list-empty-icon' src={IconEmpty} />
              <View className='group-list-empty-text'>暂未分组</View>
            </View>  
            <Button className='group-list-empty-btn' type='primary' onClick={() => navigateTo('/pagesGroups/groupForm/index')}>立即创建</Button>
          </View>
        )
      }
      {Boolean(data.length) && (
        <Footer>
          <Button onClick={() => handleGoToForm()}>新建</Button>
        </Footer>
      )}
    </View>
  )
}

export default GroupListPage
