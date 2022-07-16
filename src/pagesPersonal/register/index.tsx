import { FC, useMemo, useState } from 'react'

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
import { useDidShow } from '@tarojs/taro'
import { getCommunityList, register } from '@/service'

const genFormConfig = (communityList: {id: number, name: string}[]): FormConfigItem[] => {
  return [
    {
      key: 'name',
      label: '姓名',
      render: (value, onChange) => {
        return <Input value={value} onChange={onChange} placeholder='请输入姓名' />
      },
      checker: (value: string) => value ? null : { tip: '必填', msg: '姓名未填写' }
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
      key: 'phone',
      label: '联系电话',
      render: (value, onChange) => {
        return <Input type='number' value={value} onChange={onChange} placeholder='请输入联系电话' />
      },
      checker: (value: string) => {
        if (!value) {
          return { tip: '必填', msg: '联系电话未填写' }
        } else if (value.length !== 11) {
          return { tip: '11位', msg: '手机号应为11位' }
        }
        return null
      }
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
}

const getParams = (formConfig: FormConfigItem[], data: {[x: string]: any}) => {
  let params: {[x: string]: any} = {}
  for (const item of formConfig) {
    if (data[item.key] === undefined) { continue }
    params[item.key] = item.transfer ? item.transfer(data[item.key]) : data[item.key]
  }
  return params
}

const RegisterPage: FC = () => {
  const [data, setData] = useState({});
  const [showTip, setShowTip] = useState(false);
  const handleChange = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const [communityList, setCommunityList] = useState([] as {id: number, name: string}[])
  useDidShow(async () => {
    const res = await getCommunityList()
    setCommunityList(res.data.item_list || [])
  })

  const formConfig = useMemo(() => genFormConfig(communityList), [communityList])

  const handleRegister = async () => {
    // 校验
    for (const item of formConfig) {
      if (!item.checker) { continue }
      const msg = item.checker(data[item.key])?.msg
      if (msg) {
        showToast(msg);
        setShowTip(true);
        return;
      }
    }
    // 注册
    await register(getParams(formConfig, data))
    redirectTo('/pagesPersonal/registerResult/index')
  }

  return (
    <Page>
      <Card>
        <Form config={formConfig} data={data} showTip={showTip} onChange={handleChange} />
      </Card>
      <Footer>
        <Button type='primary' onClick={handleRegister}>注册</Button>
      </Footer>
    </Page>
  )
}

export default RegisterPage