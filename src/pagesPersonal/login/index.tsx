import { FC } from 'react'
import { View } from '@tarojs/components'

import Button from "@/components/Button"
import Card from "@/components/Card"
import PageWithoutTopBar from "@/components/PageWithoutTopBar"

import { navigateTo } from '@/utils/navigator'

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

const handleLogin = () => { console.log('登录一下') }
const LoginPage: FC = () => {
  return (
    <PageWithoutTopBar>
      <Card>
        <LoginPageTitle />
        <Button onClick={handleLogin} className='login-btn' type='primary'>微信手机号登录</Button>
        <RegisterEntry />
      </Card>
    </PageWithoutTopBar>
  )
}

export default LoginPage