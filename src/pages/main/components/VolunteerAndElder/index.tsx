import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import IconArrowRight from '@/assets/arrow_right.svg'

import { navigateTo } from '@/utils/navigator'

import './index.less'

const config = [
  {
    key: 'volunteer',
    onClick: () => { navigateTo('/pagesGroups/volunteerList/index') },
    label: '志愿者数量',
  },
  {
    key: 'elder',
    onClick: () => { navigateTo('/pagesDocument/documentList/index') },
    label: '老人数量'
  }
]

const VolunteerAndElder: FC<{ count: { [x :string]: number } }> = ({ count }) => {
  return (
    <View className='volunteer-and-elder'>
      {config.map(item => (
        <View className='volunteer-and-elder-item' key={item.key} onClick={item.onClick}>
          <View className='volunteer-and-elder-item-label'>{item.label}<Image className='icon-arrow-right' src={IconArrowRight} /></View>
          <View className='volunteer-and-elder-item-value'>{count[item.key] || '-'}</View>
        </View>
      ))}
    </View>
  )
}

export default VolunteerAndElder;