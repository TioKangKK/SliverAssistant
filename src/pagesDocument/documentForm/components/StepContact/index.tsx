import { FC, useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Input from '@/components/Inputs/Input'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

import { showToast } from '@/utils/toast'
import Radio from '@/components/Radio'
import Textarea from '@/components/Inputs/Textarea'

const formConfig: FormConfigItem[] = [
  {
    key: 'phone',
    label: '联系方式',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={onChange} placeholder='填写联系方式' />
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
    key: 'livingSituation',
    label: '居住情况（单选）',
    render: (value, onChange) => {
      const options = [{ id: 1, name: '独居(一个人住)' },{ id: 2, name: '空巢(夫妻同住，子女不在身边)' },{ id: 3, name: '其他(与保姆或护工同住)' }]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必选', msg: '居住情况未选择' }
  },
  {
    key: 'emergencyContact',
    label: '紧急联系人',
    render: (value, onChange) => {
      return <Input value={value} onChange={onChange} placeholder='请输入紧急联系人' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '紧急联系人未填写' }
  },
  {
    key: 'emergencyPhone',
    label: '紧急联系电话',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={onChange} placeholder='填写联系方式' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '紧急联系电话' }
      } else if (value.length !== 11) {
        return { tip: '11位', msg: '手机号应为11位' }
      }
      return null
    }
  },
  {
    key: 'address',
    label: '家庭住址',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='请输入家庭住址' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '家庭住址未填写' }
  },
]

type Props = {
  data: {[x: string]: any}
  onChange: (value: {[x: string]: any}) => void
  onPrevStep: () => void
  onNextStep: () => void
}

const StepContact: FC<Props> = ({ data: outData, onChange, onPrevStep, onNextStep }) => {
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
  const handlePrevStep = () => {
    if (!isValidate()) { return }
    console.log('上一步')
    onChange(data);
    onPrevStep();
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
      <Footer className='three-buttons-group'>
        <Button onClick={handleSaveDraft} type='default'>保存草稿</Button>
        <Button onClick={handlePrevStep} type='default'>上一步</Button>
        <Button onClick={handleNextStep} type='primary'>下一步</Button>
      </Footer>
    </>
  )
}

export default StepContact