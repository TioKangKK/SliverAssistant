import Card from '@/components/Card'
import { Image, View } from '@tarojs/components'
import { FC } from 'react'
import IconSearch from '@/assets/search.svg'

import './index.less'

const handleClick = () => { console.log('跳到老人列表页') }

const ElderEntry: FC = () => {
  return (
    <Card onClick={handleClick}>
      <View className='elder-entry'>
        <Image src={IconSearch} className='icon-search' />
        搜索老人
      </View>
    </Card>
  )
}

export default ElderEntry