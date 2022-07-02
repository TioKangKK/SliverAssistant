import Card from '@/components/Card'
import { Image, View } from '@tarojs/components'
import { FC } from 'react'
import IconSearch from '@/assets/search.svg'
import { navigateTo } from '@/utils/navigator'

import './index.less'

const ElderEntry: FC = () => {
  const handleClick = () => { navigateTo('/pagesDocument/documentList/index') }
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