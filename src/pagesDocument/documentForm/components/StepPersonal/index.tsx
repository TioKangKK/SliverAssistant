import { FC, useEffect, useState } from 'react'
import { View } from '@tarojs/components'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Input from '@/components/Inputs/Input'
import Radio from '@/components/Radio'
import Textarea from '@/components/Inputs/Textarea'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

import { showToast } from '@/utils/toast'
import { Option } from '@/types'
import PopupSelector from '@/components/Inputs/PopupSelector'


const healthFormConfig: FormConfigItem[] = [
  {
    key: 'hearing',
    label: '听力',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '正常' }, { id: 0, name: '异常' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '听力情况未填写' }
  },
  {
    key: 'expression',
    label: '表达能力',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '口齿清晰' }, { id: 0, name: '表达不清' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '表达能力未填写' }
  },
  {
    key: 'act',
    label: '行动能力',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 2, name: '行走自如' }, { id: 1, name: '下楼困难，需要拐杖支撑' }, { id: 0, name: '行动不便，需要轮椅或卧床' }]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '行动能力未填写' }
  },
  {
    key: 'disease',
    label: '疾病情况',
    render: (value, onChange) => {
      console.log('outer render')
      const options = [
        { id: 1, name: '呼吸系统', children: [{ id: 11, name: '哮喘' }, { id: 12, name: '哮喘2' }, {id:13, name: '其他病'}] },
        { id: 2, name: '消化系统', children: [{ id: 21, name: '肠炎' }, { id: 22, name: '胃炎' }] },
      ]
      return <PopupSelector placeholder='点击选择' title='疾病情况(多选)' options={options} value={value} onChange={onChange} />
    }
  },
  {
    key: 'specialDisease',
    label: '是否办理特病',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特病情况未填写' }
  },
  {
    key: 'healthOther',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他情况，请填写' />
    }
  }
]

const financialFormConfig: FormConfigItem[] = [
  {
    key: 'isRetiredWorker',
    label: '是否为退休职工',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '经济情况未填写' }
  },
  {
    key: 'isLowIncome',
    label: '是否为社区低保人员',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '经济情况未填写' }
  },
  {
    key: 'hasFinancialDifficult',
    label: '是否存在衣食住行医方面的困难',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '经济情况未填写' }
  },
  {
    key: 'financialOther',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他经济情况，请填写' />
    }
  }
]

const livingFormConfig: FormConfigItem[] = [
  {
    key: 'hasCrutch',
    label: '是否备有拐杖',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'hasWheelchair',
    label: '是否备有轮椅',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'hasArmrest',
    label: '厕所是否有扶手',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'hasBathChair',
    label: '是否有助浴椅',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'isDoorsOk',
    label: '门窗是否完好',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'isWaterNotSafe',
    label: '水电气是否存在安全隐患',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'isClear',
    label: '居住环境是否整洁',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'livingOther',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他情况，请填写' />
    }
  }
]

const familyFormConfig: FormConfigItem[] = [
  {
    key: 'childrenAmount',
    label: '有几个子女',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={onChange} placeholder='请输入几个子女' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '子女未填写' }
      } else if (typeof +value !== 'number' || +value < 0 || +value > 20) {
        return { tip: '0 ~ 20 名', msg: '子女数量应在 0 ~ 20 名之间' }
      }
      return null
    }
  },
  {
    key: 'hasChildrenNext',
    label: '子女是否在同小区居住',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '家庭情况未填写' }
  },
  {
    key: 'hasChildrenNext',
    label: '子女前来看望的频率',
    render: (value, onChange) => {
      const options: Option[] = [
        { id: 5, name: '每天' },
        { id: 4, name: '一周三四次' },
        { id: 3, name: '一周一次' },
        { id: 2, name: '半月一次' },
        { id: 1, name: '一月一次' },
        { id: 0, name: '半年一次' },
      ]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '家庭情况未填写' }
  },
  {
    key: 'familyOther',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他情况，请填写' />
    }
  }
]

type Props = {
  data: {[x: string]: any}
  onChange: (value: {[x: string]: any}) => void
  onPrevStep: () => void
  onNextStep: () => void
}

const StepPersonal: FC<Props> = ({ data: outData, onChange, onPrevStep, onNextStep }) => {
  const [data, setData] = useState(outData)
  useEffect(() => { setData(outData) }, [outData])

  const [showTip, setShowTip] = useState(false);
  const isValidate = () => {
    const formConfig = [...healthFormConfig, ...financialFormConfig, ...livingFormConfig, ...familyFormConfig]
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