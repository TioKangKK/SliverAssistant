import { FC } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import FormContent from '@/components/Displays/FormContent'

const render = (value) => <FormContent>{value ?? '-'}</FormContent>
const formConfig: FormConfigItem[] = [
  {
    key: 'contact',
    label: '联系方式',
    render,
  },
  {
    key: 'living_situation',
    label: '居住情况（单选）',
    render: (value) => {
      const options = [{ id: 1, name: '独居(一个人住)' },{ id: 2, name: '空巢(夫妻同住，子女不在身边)' },{ id:3, name: '家人同住(与子女、孙辈共同居住)' },{ id: 4, name: '其他(与保姆或护工同住)' }]
      return render(options.find(item => item.id === +value)?.name)
    },
  },
  {
    key: 'emergency_contact',
    label: '紧急联系人',
    render,
  },
  {
    key: 'emergency_phone_number',
    label: '紧急联系电话',
    render,
  },
  {
    key: 'address',
    label: '家庭住址',
    render,
  },
]

type Props = {
  data: {[x: string]: any}
  onPrevStep: () => void
  onNextStep: () => void
  onEdit: () => void
}

const StepContact: FC<Props> = ({ data, onPrevStep, onNextStep, onEdit }) => {
  const handleNextStep = () => onNextStep()
  const handlePrevStep = () => onPrevStep()
  const handleEdit = () => onEdit()

  return (
    <>
      <Card>
        <Form
          config={formConfig}
          data={data}
        />
      </Card>
      <Footer className='three-buttons-group'>
        <Button onClick={handleEdit}>修改内容</Button>
        <Button onClick={handlePrevStep} type='default'>上一页</Button>
        <Button onClick={handleNextStep} type='primary'>下一页</Button>
      </Footer>
    </>
  )
}

export default StepContact