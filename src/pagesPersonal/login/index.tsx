import { FC, useState } from 'react'
import { Image, Picker, View } from '@tarojs/components'

import Button from "@/components/Button"
import Card from "@/components/Card"
import PageWithoutTopBar from "@/components/PageWithoutTopBar"
import { orgList } from '@/constants/org'

import { navigateTo } from '@/utils/navigator'

import { login } from '@/service'

import IconPolygon from '@/assets/polygon.svg'

import './index.less'

const title = { main: '益助银龄', tip: '老人居家观护小程序' }
const LoginPageTitle: FC = () => {
  return (
    <View className='login-page-title'>
      <View className='login-page-title-main'>{title.main}</View>
      <View className='login-page-title-tip'>{title.tip}</View>
    </View>
  )
}

const handleGotoRegister = () => { navigateTo('/pagesPersonal/register/index') }
const RegisterEntry: FC = () => {
  return (
    <View className='login-page-register-entry'>
      <View className='login-page-register-entry-tip'>
        <View className='login-page-register-entry-tip-line' />
        <View className='login-page-register-entry-tip-text'>志愿者需先注册</View>
      </View>
      <Button type='default' onClick={handleGotoRegister}>志愿者注册</Button>
    </View>
  )
}

const LoginPage: FC = () => {
  const [org, setOrg] = useState(1);

  const handleGetPhoneNumber = async (e) => {
    const cloudID = e.detail.cloudID
    await login({ cloudId: cloudID, orgId: orgList[org].id })
  }

  return (
    <PageWithoutTopBar>
      <Card style={{ position: 'relative' }}>
        <Picker mode='selector' range={orgList.map(item => item.name)} value={org} onChange={(e) => setOrg(e.detail.value as number)}>
          <View className='org-selector'>
            <View>{orgList[org].name || '选择所属机构'}</View>
            <Image className='icon-polygon' src={IconPolygon} />
          </View>
        </Picker>
        <LoginPageTitle />
        <Button
          openType='getPhoneNumber'
          onGetPhoneNumber={handleGetPhoneNumber}
          className='login-btn'
          type='primary'
        >
          微信手机号登录
        </Button>
        <RegisterEntry />
      </Card>
    </PageWithoutTopBar>
  )
}

export default LoginPage