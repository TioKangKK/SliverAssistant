import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Button from '@/components/Button'
import Card from '@/components/Card'

import IconDocDownload from '@/assets/doc_download.png'
import { navigateTo } from '@/utils/navigator'

import './index.less'

const DocDownloadEntry: FC<{
  name: string; desc: string; btnName: string;
}> = ({ name, desc, btnName }) => {
  const handleClick = () => { navigateTo('/pagesDocument/documentList/index?type=download') }
  
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