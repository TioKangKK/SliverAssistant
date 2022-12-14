import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Card from '@/components/Card'

import IconWatchOver from '@/assets/watch_over.png'
import IconDoc from '@/assets/doc.png'
import IconSavedDoc from '@/assets/saved_docs.png'

import { navigateTo } from '@/utils/navigator'

import './index.less'

const config = [
  {
    key: 'watch_over',
    title: '添加观护',
    subTitle: '填写日常观护',
    icon: IconWatchOver,
    onClick: () => { navigateTo(`/pagesWatchOver/watchOverForm/index?id=${null}`) },
  },
  {
    key: 'add_doc',
    title: '添加档案',
    subTitle: '添加新的档案',
    icon: IconDoc,
    onClick: () => { navigateTo(`/pagesDocument/documentForm/index?id=${null}`) },
  },
  {
    key: 'doc_list',
    title: '信息列表',
    subTitle: '查看已存档案',
    icon: IconSavedDoc,
    onClick: () => { navigateTo('/pagesDocument/documentList/index') },
  },
]

const CardsEntry: FC = () => {
  return (
    <View className='cards-entry'>
      {config.map(item => (
        <Card key={item.key} onClick={item.onClick}>
          <View className='cards-entry-item-title'>{item.title}</View>
          <View className='cards-entry-item-sub-title'>{item.subTitle}</View>
          <Image className='cards-entry-item-icon' src={item.icon} />
        </Card>
      ))}
    </View>
  )
}

export default CardsEntry