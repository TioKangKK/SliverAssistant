import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Split from '@/components/Split'
import { downloadFile, exportVolunteer, getVolunteerList } from '@/service'
import { Volunteer } from '@/service/types'
import { showToast } from '@/utils/toast'
import { View } from '@tarojs/components'
import { useDidShow, showLoading, openDocument, hideLoading } from '@tarojs/taro'
import { FC, useState } from 'react'

import './index.less'

const VolunteerListPage: FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  useDidShow(async () => {
    const list = await getVolunteerList({ limit: 100, offset: 0 })
    setVolunteers(list)
  })

  const handleVolunteerExport = async () => {
    showLoading({ title: '下载中' })
    try {
      const res = await exportVolunteer();
      if (res?.data) {
        const fileID = res.data.file_id
        const file = await downloadFile({ fileID });
        showToast('志愿者下载成功')
        openDocument({ filePath: file.tempFilePath, showMenu: true });
      } else {
        showToast(res?.prompts)
      }
    } catch(e) {
      showToast(typeof e === 'string' ? e : e?.errMsg || '下载失败')
    } finally {
      hideLoading()
    }
  }

  return (
    <View className='volunteer-list'>
      {volunteers.map(item => (
        <Card key={item.id} className='volunteer-card'>
          <View className='volunteer-card-header'>
            <View className='volunteer-card-name'>{item.name}</View>
            <View className='volunteer-card-phone'>{item.phone}</View>
          </View>
          <Split style={{ marginTop: '10px' }} />
          <View className='volunteer-card-content'>
            <View className='volunteer-card-content-item'>本月观护: {item.monthCount || 0}次</View>
            <View className='volunteer-card-content-item'>累计观护: {item.totalCount || 0}次</View>
          </View>
        </Card>
      ))}
      <Footer>
        <Button disabled={volunteers.length === 0} onClick={handleVolunteerExport}>导出全部志愿者</Button>
      </Footer>
    </View>
  )
}

export default VolunteerListPage
