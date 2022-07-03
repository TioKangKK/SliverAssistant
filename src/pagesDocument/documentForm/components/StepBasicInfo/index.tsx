import { FC, useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import FormContent from '@/components/Displays/FormContent'
import Input from '@/components/Inputs/Input'
import RegionPicker from '@/components/Inputs/RegionPicker'
import Selector from '@/components/Inputs/Selector'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

import { showToast } from '@/utils/toast'

const formConfig: FormConfigItem[] = [
  {
    key: 'name',
    label: '姓名',
    render: (value, onChange) => {
      return <Input value={value} onChange={onChange} placeholder='填写姓名' />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '老人姓名未填写' }
  },
  {
    key: 'community',
    label: '所属社区',
    render: (value, onChange) => {
      const range = ['社区1', '社区2']
      return <Selector range={range} value={value} onChange={onChange} placeholder='请选择社区' />
    },
    checker: (value: number) => value ? null : { tip: '必填', msg: '社区未选择' }
  },
  {
    key: 'idcard',
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
    }
  },
  {
    key: 'createDate',
    label: '建档日期',
    render: (value) => {
      return <FormContent>{value}</FormContent>
    }
  },
  {
    key: 'creator',
    label: '建档人',
    render: (value, onChange) => {
      return <Input value={value} onChange={onChange} placeholder='请输入建档人' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '建档人未填写' }
  },
  {
    key: 'gender',
    label: '性别',
    render: (value, onChange) => {
      const range = ['男', '女']
      return <Selector range={range} value={value} onChange={onChange} placeholder='请选择性别' />
    },
    checker: (value: number) => value ? null : { tip: '必填', msg: '性别未填写' }
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
    }
  },
  {
    key: 'hometown',
    label: '籍贯',
    render: (value, onChange) => {
      return <RegionPicker value={value} onChange={onChange} placeholder='请选择籍贯' />
    },
    checker: (value: string[]) => value && value.length ? null : { tip: '必填', msg: '籍贯未选择' }
  }
]

type Props = {
  data: {[x: string]: any}
  onChange: (value: {[x: string]: any}) => void
  onNextStep: () => void
}

const StepBasicInfo: FC<Props> = ({ data: outData, onChange, onNextStep }) => {
  const [data, setData] = useState(outData)
  useEffect(() => { setData(outData) }, [outData])

  const [showTip, setShowTip] = useState(false);
  const isValidate = () => {
    for (const item of formConfig) {
      if (!item.checker) { continue }
      const msg = item.checker(data[item.key])?.msg
      if (msg) {
        showToast(msg);
        setShowTip(true);
        return false;
      }
    }
    return true
  }
  const handleSaveDraft = () => {
    if (!isValidate()) { return }
    console.log('保存草稿')
    onChange(data);
  }
  const handleNextStep = () => {
    if (!isValidate()) { return }
    console.log('下一步')
    onChange(data);
    onNextStep();
  }

  return (
    <>
      <Card>
        <Form
          config={formConfig}
          data={data}
          showTip={showTip}
          onChange={(key, value) => setData({ ...data, [key]: value })}
        />
      </Card>
      <Footer className='two-buttons-group'>
        <Button onClick={handleSaveDraft} type='default'>保存草稿</Button>
        <Button onClick={handleNextStep} type='primary'>下一步</Button>
      </Footer>
    </>
  )
}

export default StepBasicInfo