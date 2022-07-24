import { FC, useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Radio from '@/components/Radio'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

import { showToast } from '@/utils/toast'

import { Option } from '@/types'
import { View } from '@tarojs/components'

const renderYesOrNo = (value, onChange) => {
  const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
  return <Radio options={options} value={+value} onChange={(v) => onChange(!!v)} />
}

const specialForm: FormConfigItem[] = [
  {
    key: 'is_good_neighbor',
    label: '独居老人居住环境是否睦邻',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
  {
    key: 'has_family_events',
    label: '是否发生重大家庭变故',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
  {
    key: 'is_suffering_accident',
    label: '是否因突发自然灾害、公共卫生等事件造成生活困难',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
  {
    key: 'is_got_supplied',
    label: '是否落实相应救助措施',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
]

/**
 * TODO 自动计算规则
 *  1级 -> 选择“行动不便，需要轮椅或卧床”
 *  2级 -> 独居 & 80及以上
 *  3级 -> 独居 & 65->80
 * */

const typifyForm: FormConfigItem[] = [
  {
    key: 'living_level',
    label: '老人类型',
    tip: '以下为系统帮您判断的类型，可根据真实情况修改',
    render: (value, onChange) => {
      const options: Option[] = [
        { id: 1, name: '一级：行动不便，需要轮椅或卧床' },
        { id: 2, name: '二级：高龄独居等需要重点关注的老年人' },
        { id: 3, name: '三级：自理活力行独居老年人' },
      ]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '老人类型未选择' }
  },
  {
    key: 'need_probation',
    label: '需要观护',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '未选择是否需要观护' }
  }
]

type Props = {
  data: {[x: string]: any}
  onChange: (value: {[x: string]: any}) => void
  onPrevStep: () => void
  onNextStep: () => void
  onSaveDaft: (value: {[x: string]: any}) => void
}

const StepSpecial: FC<Props> = ({ data: outData, onChange, onPrevStep, onNextStep, onSaveDaft }) => {
  const [data, setData] = useState(outData)
  useEffect(() => { setData(outData) }, [outData])

  const [showTip, setShowTip] = useState(false);
  const isValidate = () => {
    const formConfig = [...specialForm, ...typifyForm]
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
    onSaveDaft(data);
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
          config={specialForm}
          data={data}
          showTip={showTip}
          onChange={(key, value) => setData({ ...data, [key]: value })}
        />
      </Card>
      <Card>
        <View className='card-title'>——— 分类情况 ———</View>
        <Form
          config={typifyForm}
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