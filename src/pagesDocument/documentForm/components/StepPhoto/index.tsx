import { FC, useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import ImageUploader from '@/components/Inputs/ImageUploader'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

import { showToast } from '@/utils/toast'

const formConfig: FormConfigItem[] = [
  {
    key: 'photos',
    label: '老人正面照',
    render: (value, onChange) => {
      return <ImageUploader files={value} onChange={onChange} />
    },
    checker: (value: string[]) => value && value.length ? null : { tip: '必传', msg: '请上传照片' }
  },
]

type Props = {
  data: {[x: string]: any}
  onChange: (value: {[x: string]: any}) => void
  onPrevStep: () => void
  onCommit: () => void
}

const StepPhoto: FC<Props> = ({ data: outData, onChange, onPrevStep, onCommit }) => {
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
  const handleCommit = () => {
    if (!isValidate()) { return }
    console.log('下一步')
    onChange(data);
    onCommit();
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
        <Button onClick={handleCommit} type='primary'>提交</Button>
      </Footer>
    </>
  )
}

export default StepPhoto