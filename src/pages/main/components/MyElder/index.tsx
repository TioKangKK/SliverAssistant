import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Split from '@/components/Split'

import IconArrowRight from '@/assets/arrow_right.svg'
import { navigateTo } from '@/utils/navigator'

import './index.less'

type Props = {
  count: number
}

const MyElder: FC<Props> = ({ count }) => {
  const handleClick = () => { navigateTo('/pagesDocument/documentList/index') }
  return (
    <>
      <Split style={{ marginTop: '16px', marginBottom: '16px' }} />
      <View className='my-elder'>
        <View className='my-elder-left'>
          我负责的老人共{count}人
        </View>
        <View className='my-elder-right' onClick={handleClick}>
          查看
          <Image src={IconArrowRight} className='icon-arrow-right' />
        </View>
      </View>
    </>
  )
}

export default MyElder