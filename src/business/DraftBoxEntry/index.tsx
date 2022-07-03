import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Card from '@/components/Card'
import Split from '@/components/Split'

import IconEdit from '@/assets/edit.svg'
import IconArrowRight from '@/assets/arrow_right.svg'

import './index.less'

const DraftBoxEntry: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Card onClick={onClick} className='draft-box-entry'>
      <View className='draft-box-entry-left'>
        <Image src={IconEdit} className='icon-edit' />
        <View className='draft-box-entry-main'>草稿箱</View>
        <Split type='vertical'  />
        <View className='draft-box-entry-tip'>未提交文档可继续填写</View>
      </View>
      <Image src={IconArrowRight} className='icon-arrow-right' />
    </Card>
  )
}

export default DraftBoxEntry