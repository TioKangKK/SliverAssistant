import { FC, useState } from 'react'
import { View } from '@tarojs/components'

import Button from "@/components/Button"
import Card from "@/components/Card"
import PageWithoutTopBar from "@/components/PageWithoutTopBar"
import Input from '@/components/Inputs/Input'

import { navigateTo } from '@/utils/navigator'
import { showToast } from '@/utils/toast'

import { getPhone, login, setPhone } from '@/service'

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
  const handleGetPhoneNumber = async (e) => {
    const cloudID = e.detail.cloudID
    // 去换手机号
    console.log(e)
    // setPhone('13858953183')
    // console.log('getPhone', getPhone)
    // await login({ phone: '13858953183' })
  }

  const [input, setInput] = useState('') 
  const handleLogin = async () => {
    if (input.length !== 11) { 
      showToast('请输入11位电话号码')
      return
    }
    await login({ phone: input })
  }

  return (
    <PageWithoutTopBar>
      <Card>
        <LoginPageTitle />
        <View style={{ display: 'flex' }}>
          <Input style={{ flex: 1 }} placeholder='请输入手机号' type='number' value={input} onChange={setInput} />
          <Button style={{ width: 'max-content' }} onClick={handleLogin}>登录</Button>          
        </View>
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