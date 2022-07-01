import Button from '@/components/Button'
import Card from '@/components/Card'
import { Image, View } from '@tarojs/components'
import { FC } from 'react'
import IconDocDownload from '@/assets/doc_download.svg'
import './index.less'

const handleClick = () => { console.log('跳转到下载档案') }

const DocDownloadEntry: FC = () => {
  return (
    <Card>
      <View className='doc-download-entry'>
        <View className='doc-download-entry-left'>
          <Image className='icon-doc-download' src={IconDocDownload} />
          <View>
            <View className='doc-download-entry-title'>下载档案</View>
            <View className='doc-download-entry-sub-title'>下载老人档案</View>
          </View>
        </View>
        <Button type='primary' onClick={handleClick} className='doc-download-entry-button'>去下载</Button>
      </View>
    </Card>
  )
}

export default DocDownloadEntry