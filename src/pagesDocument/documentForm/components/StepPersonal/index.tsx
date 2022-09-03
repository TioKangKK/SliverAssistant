import { FC, useEffect, useState } from 'react'
import { View } from '@tarojs/components'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form from '@/components/Form'

import { familyFormConfig, financialFormConfig, healthFormConfig, livingFormConfig } from '../../formConfig'

type Props = {
  data: {[x: string]: any}
  showTip?: boolean
  onChange: (value: {[x: string]: any}) => void
  onPrevStep: () => void
  onNextStep: () => void
  onSaveDaft: (value: {[x: string]: any}) => void
}

const StepPersonal: FC<Props> = ({ data: outData, showTip, onChange, onPrevStep, onNextStep, onSaveDaft }) => {
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
        <View className='card-title'>——— 健康情况 ———</View>
        <Form
          config={healthFormConfig}
          data={data}
          showTip={showTip}
          onChange={(key, value) => setData({ ...data, [key]: value })}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 经济情况 ———</View>
        <Form
          config={financialFormConfig}
          data={data}
          showTip={showTip}
          onChange={(key, value) => setData({ ...data, [key]: value })}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 居住及安全 ———</View>
        <Form
          config={livingFormConfig}
          data={data}
          showTip={showTip}
          onChange={(key, value) => setData({ ...data, [key]: value })}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 家庭情况 ———</View>
        <Form
          config={familyFormConfig}
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

export default StepPersonal