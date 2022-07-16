import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Button from '@/components/Button'
import Card from '@/components/Card'

import IconDocDownload from '@/assets/doc_download.svg'

import './index.less'

const handleClick = () => { console.log('跳转到下载档案') }

const DocDownloadEntry: FC<{
  name: string; desc: string; btnName: string;
}> = ({ name, desc, btnName }) => {
  return (
    <Card>
      <View className='doc-download-entry'>
        <View className='doc-download-entry-left'>
          <Image className='icon-doc-download' src={IconDocDownload} />
          <View>
            <View className='doc-download-entry-title'>{name}</View>
            <View className='doc-download-entry-sub-title'>{desc}</View>
          </View>
        </View>
        <Button type='primary' onClick={handleClick} className='doc-download-entry-button'>{btnName}</Button>
      </View>
    </Card>
  )
}

export default DocDownloadEntry