import { FC } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import FormContent from '@/components/Displays/FormContent'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import { Gender } from '@/constants/user'

const render = (value) => <FormContent>{value ?? '-'}</FormContent>

const formConfig: FormConfigItem[] = [
  {
    key: 'name',
    label: '姓名',
    render,
  },
  {
    key: 'community',
    label: '所属社区',
    render,
  },
  {
    key: 'code',
    label: '身份证号码',
    render,
  },
  {
    key: 'created_at',
    label: '建档日期',
    render: (value) => render((value || '').slice(0, 10)),
  },
  {
    key: 'created_by_name',
    label: '建档人',
    render,
  },
  {
    key: 'gender',
    label: '性别',
    render: value => render(value === Gender.Male ? '男' : '女'),
  },
  {
    key: 'age',
    label: '年龄',
    render,
  },
  {
    key: 'native_place',
    label: '籍贯',
    render,
  }
]

type Props = {
  canOperate: boolean;
  data: {[x: string]: any}
  onNextStep: () => void
  onReject: () => void
}

const StepBasicInfo: FC<Props> = ({ data, canOperate, onNextStep, onReject }) => {
  const handleNextStep = () => onNextStep()
  const handleReject = () => onReject()

  return (
    <>
      <Card>
        <Form
          config={formConfig}
          data={data}
        />
      </Card>
      <Footer className={canOperate ? `two-buttons-group` : ''}>
        {canOperate && <Button onClick={handleReject}>拒绝</Button>}
        <Button onClick={handleNextStep} type='primary'>下一页</Button>
      </Footer>
    </>
  )
}

export default StepBasicInfo