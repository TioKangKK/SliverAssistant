import { FC } from 'react'
import { View } from '@tarojs/components'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

import FormContent from '@/components/Displays/FormContent'
import { Option } from '@/types'

const render = (value) => <FormContent>{value ?? '-'}</FormContent>
const renderOption = (value, options: Option[]) => render(options.find(item => item.id === +value)?.name)
const renderYesOrNo = (value) => renderOption(value, [{ id: 1, name: '是' }, { id: 0, name: '否' }])

const healthFormConfig: FormConfigItem[] = [
  {
    key: 'hearing',
    label: '听力',
    render: (value) => renderOption(value, [{ id: 1, name: '正常' }, { id: 2, name: '听力欠佳' }]),
  },
  {
    key: 'expression',
    label: '表达能力',
    render: (value) => renderOption(value, [{ id: 1, name: '口齿清晰' }, { id: 2, name: '表达不清' }]),
  },
  {
    key: 'mobility',
    label: '行动能力',
    render: (value) => renderOption(value, [{ id: 1, name: '行走自如' }, { id: 2, name: '下楼困难，需要拐杖支撑' }, { id: 3, name: '行动不便，需要轮椅或卧床' }]),
  },
  {
    key: 'diseases',
    label: '疾病情况',
    render: (value) => render(value.join(',')),
  },
  {
    key: 'is_special_disease',
    label: '是否办理特病',
    render: renderYesOrNo,
  },
  {
    key: 'health_remarks',
    label: '其他情况（选填）',
    render,
  }
]

const financialFormConfig: FormConfigItem[] = [
  {
    key: 'is_retired_employee',
    label: '是否为退休职工',
    render: renderYesOrNo,
  },
  {
    key: 'is_subsistence_allowances',
    label: '是否为社区低保人员',
    render: renderYesOrNo,
  },
  {
    key: 'is_suffering_hardship',
    label: '是否存在衣食住行医方面的困难',
    render: renderYesOrNo,
  },
  {
    key: 'financial_remarks',
    label: '其他情况（选填）',
    render,
  }
]

const livingFormConfig: FormConfigItem[] = [
  {
    key: 'has_crutch',
    label: '是否备有拐杖',
    render: renderYesOrNo,
  },
  {
    key: 'has_wheel_chair',
    label: '是否备有轮椅',
    render: renderYesOrNo,
  },
  {
    key: 'has_rail_in_toilet',
    label: '厕所是否有扶手',
    render: renderYesOrNo,
  },
  {
    key: 'has_bath_chair',
    label: '是否有助浴椅',
    render: renderYesOrNo,
  },
  {
    key: 'is_safe_entrance',
    label: '门窗是否完好',
    render: renderYesOrNo,
  },
  {
    key: 'is_safe_utilities',
    label: '水电气是否完好',
    render: (value) => {
      const { is_safe_utilities, utilities_condition } = value
      return (
        <>
          {renderYesOrNo(is_safe_utilities)}
          <View style={{ marginTop: '10px' }} />
          {is_safe_utilities === false && render(utilities_condition)}
        </>
      )
    },
  },
  {
    key: 'is_cleanness',
    label: '居住环境是否整洁',
    render: renderYesOrNo,
  },
  {
    key: 'environment_remarks',
    label: '其他情况（选填）',
    render,
  }
]

const familyFormConfig: FormConfigItem[] = [
  {
    key: 'number_of_descendants',
    label: '有几个子女',
    render,
  },
  {
    key: 'is_live_together',
    label: '子女是否在同小区居住',
    render: renderYesOrNo,
  },
  {
    key: 'visiting_frequency',
    label: '子女前来看望的频率',
    render: value => renderOption(value, [
      { id: 1, name: '每天' },
      { id: 2, name: '一周三四次' },
      { id: 3, name: '一周一次' },
      { id: 4, name: '半月一次' },
      { id: 5, name: '一月一次' },
      { id: 6, name: '半年一次' },
    ]),
  },
  {
    key: 'family_remarks',
    label: '其他情况（选填）',
    render,
  }
]

type Props = {
  data: {[x: string]: any}
  onPrevStep: () => void
  onNextStep: () => void
  onReject: () => void
}

const StepPersonal: FC<Props> = ({ data, onPrevStep, onNextStep, onReject }) => {
  const handleNextStep = () => onNextStep()
  const handlePrevStep = () => onPrevStep()
  const handleReject = () => onReject()

  return (
    <>
      <Card>
        <View className='card-title'>——— 健康情况 ———</View>
        <Form
          config={healthFormConfig}
          data={data}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 经济情况 ———</View>
        <Form
          config={financialFormConfig}
          data={data}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 居住及安全 ———</View>
        <Form
          config={livingFormConfig}
          data={data}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 家庭情况 ———</View>
        <Form
          config={familyFormConfig}
          data={data}
        />
      </Card>
      <Footer className='three-buttons-group'>
        <Button onClick={handleReject} type='default'>拒绝</Button>
        <Button onClick={handlePrevStep} type='default'>上一页</Button>
        <Button onClick={handleNextStep} type='primary'>下一页</Button>
      </Footer>
    </>
  )
}

export default StepPersonal