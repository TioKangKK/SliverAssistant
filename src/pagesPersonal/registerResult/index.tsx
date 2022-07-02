import { FC } from 'react'
import Card from "@/components/Card"
import Page from "@/components/Page"
import { View } from '@tarojs/components'

import './index.less'

const RegisterResultPage: FC = () => {
  return (
    <Page>
      <Card>
        <View className='register-result-page-title'>
          <View className='register-result-page-title-main'>注册完成</View>
          <View className='register-result-page-title-tip'>请等待审批</View>
        </View>
      </Card>
    </Page>
  )
}

export default RegisterResultPage