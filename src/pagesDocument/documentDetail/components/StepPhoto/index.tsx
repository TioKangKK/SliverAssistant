import { FC } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import ImageList from '@/components/Displays/ImageList'

import userInfoStore from '@/store/userInfo'
import { Role } from '@/constants/user'

const formConfig: FormConfigItem[] = [
  {
    key: 'photo_uris',
    label: '老人正面照',
    render: (value) => <ImageList urls={value} />,
  },
]

type Props = {
  data: {[x: string]: any}
  onPrevStep: () => void
  onEdit: () => void
}

const StepPhoto: FC<Props> = ({ data, onEdit, onPrevStep }) => {
  const handlePrevStep = () => onPrevStep()
  const handleEdit = () => onEdit()
  const canEdit = [Role.SocialWorker, Role.SuperManager].includes(userInfoStore.get('role'))

  return (
    <>
      <Card>
        <Form config={formConfig} data={data} />
      </Card>
      <Footer className={canEdit ? 'two-buttons-group' : ''}>
        {canEdit && <Button onClick={handleEdit}>修改内容</Button>}
        <Button onClick={handlePrevStep} type='default'>上一页</Button>
      </Footer>
    </>
  )
}

export default StepPhoto