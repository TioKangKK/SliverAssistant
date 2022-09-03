import { FC, useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form from '@/components/Form'
import { phoneFormConfig } from '../../formConfig'

type Props = {
  data: {[x: string]: any}
  showTip?: boolean
  onChange: (value: {[x: string]: any}) => void
  onPrevStep: () => void
  onCommit: (value: {[x: string]: any}) => void
  onSaveDaft: (value: {[x: string]: any}) => void
}

const StepPhoto: FC<Props> = ({ data: outData, showTip, onChange, onPrevStep, onCommit, onSaveDaft }) => {
  const [data, setData] = useState(outData)
  useEffect(() => { setData(outData) }, [outData])

  const handleSaveDraft = () => {
    onSaveDaft(data);
  }
  const handleCommit = () => {
    onCommit(data);
  }
  const handlePrevStep = () => {
    onChange(data);
    onPrevStep();
  }

  return (
    <>
      <Card>
        <Form
          config={phoneFormConfig}
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