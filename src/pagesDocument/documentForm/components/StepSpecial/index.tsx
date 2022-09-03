import { FC, useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Radio from '@/components/Radio'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

import { showToast } from '@/utils/toast'

import { Option } from '@/types'
import { View } from '@tarojs/components'
import { specialFormConfig, typifyFormConfig } from '../../formConfig'

type Props = {
  data: {[x: string]: any}
  showTip?: boolean
  onChange: (value: {[x: string]: any}) => void
  onPrevStep: () => void
  onNextStep: () => void
  onSaveDaft: (value: {[x: string]: any}) => void
}

const StepSpecial: FC<Props> = ({ data: outData, showTip, onChange, onPrevStep, onNextStep, onSaveDaft }) => {
  const [data, setData] = useState(outData)
  useEffect(() => { setData(outData) }, [outData])

  const handleSaveDraft = () => {
    onSaveDaft(data);
  }
  const handleNextStep = () => {
    onChange(data);
    onNextStep();
  }
  const handlePrevStep = () => {
    onChange(data);
    onPrevStep();
  }

  return (
    <>
      <Card>
        <Form
          config={specialFormConfig}
          data={data}
          showTip={showTip}
          onChange={(key, value) => setData({ ...data, [key]: value })}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 分类情况 ———</View>
        <Form
          config={typifyFormConfig}
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

export default StepSpecial