import Card from '@/components/Card'
import { Image, View } from '@tarojs/components'
import { FC } from 'react'
import { navigateTo } from '@/utils/navigator'

import IconWatchOver from '@/assets/watch_over.svg'
import IconDoc from '@/assets/doc.svg'
import IconSavedDoc from '@/assets/saved_docs.svg'

import './index.less'

const config = [
  {
    key: 'watch_over',
    title: '添加观护',
    subTitle: '填写日常观护',
    icon: IconWatchOver,
    onClick: () => { console.log('跳转添加观护页') },
  },
  {
    key: 'add_doc',
    title: '添加档案',
    subTitle: '添加新的档案',
    icon: IconDoc,
    iconClassName: 'special-icon',
    onClick: () => { console.log('跳转添加档案页') },
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
          <Image className={`cards-entry-item-icon ${item.iconClassName || ''}`} src={item.icon} />
        </Card>
      ))}
    </View>
  )
}

export default CardsEntry