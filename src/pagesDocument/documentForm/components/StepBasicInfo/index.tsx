import { FC, useEffect, useMemo, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form from '@/components/Form'

import { Community } from '@/service/types'
import { genBasicFormConfig } from '../../formConfig'

type Props = {
  data: {[x: string]: any}
  showTip?: boolean
  communityList: Community[]
  onChange: (value: {[x: string]: any}) => void
  onNextStep: () => void,
  onSaveDaft: (value: {[x: string]: any}) => void
}

const StepBasicInfo: FC<Props> = ({ data: outData, showTip, communityList, onChange, onNextStep, onSaveDaft }) => {
  const [data, setData] = useState(outData)
  useEffect(() => { setData(outData) }, [outData])

  const formConfig = useMemo(() => genBasicFormConfig(communityList), [communityList])

  const handleSaveDraft = () => {
    onSaveDaft(data);
  }
  const handleNextStep = () => {
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