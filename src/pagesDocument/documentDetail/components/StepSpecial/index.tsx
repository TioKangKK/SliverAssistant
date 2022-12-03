import { FC } from 'react'
import { View } from '@tarojs/components'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import FormContent from '@/components/Displays/FormContent'
import { Option } from '@/types'

import userInfoStore from '@/store/userInfo'
import { Role } from '@/constants/user'

const render = (value) => <FormContent>{value ?? '-'}</FormContent>
const renderOption = (value, options: Option[]) => render(options.find(item => item.id === +value)?.name)
const renderYesOrNo = (value) => renderOption(value, [{ id: 1, name: '是' }, { id: 0, name: '否' }])

const specialForm: FormConfigItem[] = [
  {
    key: 'is_good_neighbor',
    label: '独居老人居住环境是否睦邻',
    render: renderYesOrNo,
  },
  {
    key: 'has_family_events',
    label: '是否发生重大家庭变故',
    render: renderYesOrNo,
  },
  {
    key: 'is_suffering_accident',
    label: '是否因突发自然灾害、公共卫生等事件造成生活困难',
    render: renderYesOrNo,
  },
  {
    key: 'is_got_supplied',
    label: '是否落实相应救助措施',
    render: renderYesOrNo,
  },
]

/**
 * 自动计算规则
 *  1级 -> 选择“行动不便，需要轮椅或卧床”
 *  2级 -> 独居 & 80及以上
 *  3级 -> 独居 & 65->80
 * */

const typifyForm: FormConfigItem[] = [
  {
    key: 'living_level',
    label: '老人类型',
    render: (value) => renderOption(value, [
      { id: 1, name: '一级：行动不便，需要轮椅或卧床' },
      { id: 2, name: '二级：高龄独居等需要重点关注的老年人' },
      { id: 3, name: '三级：自理活力行独居老年人' },
    ]),
  },
  {
    key: 'need_probation',
    label: '需要观护',
    render: renderYesOrNo,
  }
]

type Props = {
  data: {[x: string]: any}
  onPrevStep: () => void
  onNextStep: () => void
  onEdit: () => void
}

const StepSpecial: FC<Props> = ({ data, onEdit, onPrevStep, onNextStep }) => {
  const handleNextStep = () => onNextStep()
  const handlePrevStep = () => onPrevStep()
  const handleEdit = () => onEdit()

  const canEdit = [Role.SocialWorker, Role.SuperManager].includes(userInfoStore.get('role'))

  return (
    <>
      <Card>
        <Form config={specialForm} data={data} />
      </Card>
      <Card>
        <View className='card-title'>——— 分类情况 ———</View>
        <Form
          config={typifyForm}
          data={data}
        />
      </Card>
      <Footer className={canEdit ? 'three-buttons-group' : 'two-buttons-group'}>
        {canEdit && <Button onClick={handleEdit}>修改内容</Button>}
        <Button onClick={handlePrevStep} type='default'>上一页</Button>
        <Button onClick={handleNextStep} type='primary'>下一页</Button>
      </Footer>
    </>
  )
}

export default StepSpecial