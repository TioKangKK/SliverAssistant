import { FC } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import FormContent from '@/components/Displays/FormContent'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'

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
    key: 'created_by',
    label: '建档人',
    render,
  },
  {
    key: 'gender',
    label: '性别',
    render,
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
  data: {[x: string]: any}
  onNextStep: () => void
}

const StepBasicInfo: FC<Props> = ({ data, onNextStep }) => {
  const handleNextStep = () => onNextStep()

  return (
    <>
      <Card>
        <Form
          config={formConfig}
          data={data}
        />
      </Card>
      <Footer>
        <Button onClick={handleNextStep} type='primary'>下一步</Button>
      </Footer>
    </>
  )
}

export default StepBasicInfo