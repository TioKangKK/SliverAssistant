import { FC, useMemo, useState } from 'react'
import { useDidShow, showLoading, hideLoading } from '@tarojs/taro'
import { Image, Button as TaroBtn } from '@tarojs/components'

import { orgList } from '@/constants/org'

import Button from "@/components/Button"
import Card from "@/components/Card"
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import Input from '@/components/Inputs/Input'
import Selector from '@/components/Inputs/Selector'
import Textarea from '@/components/Inputs/Textarea'
import Page from "@/components/Page"

import { showToast } from '@/utils/toast'
import { redirectTo } from '@/utils/navigator'
import { getCheckMsg, getParamsFromForm } from '@/utils/form'
import { getCommunityList, register, uploadFile } from '@/service'
import { Community } from '@/service/types'
import { delay } from '@/utils'

import './index.less'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const genFormConfig = (communityList: Community[]): FormConfigItem[] => [
  {
    key: 'name',
    label: '姓名',
    render: (value, onChange) => {
      return <Input value={value} onChange={onChange} placeholder='请输入姓名' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '姓名未填写' }
  },
  {
    key: 'avatar',
    label: '头像',
    render: (value, onChange) => {
      const handleChooseAvatar = async ({ detail }) => {
        const avatar = detail.avatarUrl
        // console.log(avatar)
        showLoading({ title: '图片上传中' });
        try {
          const res = await uploadFile({ type: "image", path: avatar })
          onChange(res.fileID)
        } finally {
          hideLoading()
        }
      } 
      return (
        <TaroBtn className='form-avatar-btn' openType='chooseAvatar' onChooseAvatar={handleChooseAvatar}>
          <Image className='form-avatar-img' src={value || defaultAvatarUrl} />
        </TaroBtn>
      )
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '未上传头像' }
  },
  {
    key: 'gender',
    label: '性别',
    render: (value, onChange) => {
      const range = ['男', '女']
      return <Selector range={range} value={value} onChange={onChange} placeholder='请选择性别' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '性别未填写' },
    transfer: (value: string) => +value + 1,
  },
  {
    key: 'age',
    label: '年龄',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={onChange} placeholder='请填写年龄' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '年龄未填写' }
      } else if (+value < 0 || +value > 120) {
        return { tip: '0 ~ 120 岁', msg: '年龄范围在 0 ~ 120岁之间' }
      }
      return null
    },
    transfer: (value: string) => +value,
  },
  {
    key: 'id_number',
    label: '身份证号码',
    render: (value, onChange) => {
      return <Input type='idcard' value={value} onChange={onChange} placeholder='请填写身份证号码' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '身份证未填写' }
      } else if (value.length !== 18) {
        return { tip: '18位', msg: '身份号应为18位' }
      }
      return null
    },
  },
  {
    key: 'org_id',
    label: '所属机构',
    render: (value, onChange) => {
      const range = orgList.map(item => item.name)
      return <Selector range={range} value={value} onChange={onChange} placeholder='请选择机构' />
    },
    checker: (value: number) => value !== undefined ? null : { tip: '必填', msg: '社区未选择' },
    transfer: (value: number) => orgList[value].id,
  },
  {
    key: 'community_id',
    label: '所属社区',
    render: (value, onChange) => {
      const range = communityList.map(item => item.name)
      return <Selector range={range} value={value} onChange={onChange} placeholder='请选择社区' />
    },
    checker: (value: number) => value !== undefined ? null : { tip: '必填', msg: '社区未选择' },
    transfer: (value: number) => communityList[value].id,
  },
  {
    key: 'address',
    label: '家庭住址',
    render: (value, onChange) => {
      return <Textarea  value={value} onChange={onChange} placeholder='请输入家庭住址' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '家庭住址未填写' }
  },
]

const RegisterPage: FC = () => {
  const [data, setData] = useState({});
  const [showTip, setShowTip] = useState(false);
  const handleChange = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const [communityList, setCommunityList] = useState([] as Community[])
  useDidShow(async () => {
    const list = await getCommunityList()
    setCommunityList(list)
  })

  const formConfig = useMemo(() => genFormConfig(communityList), [communityList])

  const handleRegister = async () => {
    // 校验
    const msg = getCheckMsg(formConfig, data)
    if (msg) {
      showToast(msg);
      setShowTip(true);
      return;
    }
  }
  const handleGetPhoneNumber = async (e) => {
    // 注册
    const cloudID = e.detail.cloudID
    const res = await register({ ...getParamsFromForm(formConfig, { ...data }), cloud_id: cloudID})
    const codeStr = String(res?.code)
    if (codeStr.startsWith('4')) {
      showToast(`注册失败，${res?.msg || res?.prompts}`)
    }
    showToast('注册成功')
    await delay(1000)
    redirectTo('/pagesPersonal/registerResult/index')
  }

  const buttonProps = getCheckMsg(formConfig, data)
    ? {
      onClick: handleRegister
    } as const : {
      openType: 'getPhoneNumber',
      onGetPhoneNumber: handleGetPhoneNumber,
    } as const

  return (
    <Page>
      <Card>
        <Form config={formConfig} data={data} showTip={showTip} onChange={handleChange} />
      </Card>
      <Footer>
        <Button
          type='primary'
          {...buttonProps}
        >
          注册
        </Button>
      </Footer>
    </Page>
  )
}

export default RegisterPage