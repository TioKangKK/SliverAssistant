import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Card from '@/components/Card'

import IconSearch from '@/assets/search.svg'

import { navigateTo } from '@/utils/navigator'

import './index.less'

const ElderEntry: FC<{ title: string }> = ({ title }) => {
  const handleClick = () => { navigateTo('/pagesDocument/documentSearch/index') }
  return (
    <Card onClick={handleClick}>
      <View className='elder-entry'>
        <Image src={IconSearch} className='icon-search' />
        {title}
      </View>
    </Card>
  )
}

export default ElderEntry