import { FC } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import ImageList from '@/components/Displays/ImageList'

const formConfig: FormConfigItem[] = [
  {
    key: 'photo_uris',
    label: '老人正面照',
    render: (value) => <ImageList urls={value} />,
  },
]

type Props = {
  canOperate: boolean;
  data: {[x: string]: any}
  onPrevStep: () => void
  onReject: () => void
  onConfirm: () => void
}

const StepPhoto: FC<Props> = ({ data, canOperate, onPrevStep, onReject, onConfirm }) => {
  const handlePrevStep = () => onPrevStep()
  const handleReject = () => onReject()
  const handleConfirm = () => onConfirm()

  return (
    <>
      <Card>
        <Form config={formConfig} data={data} />
      </Card>
      <Footer className={canOperate ? 'three-buttons-group' : ''}>
        {canOperate && <Button onClick={handleReject} type='default'>拒绝</Button>}
        <Button onClick={handlePrevStep} type='default'>上一页</Button>
        {canOperate && <Button onClick={handleConfirm} type='default'>通过</Button>}
      </Footer>
    </>
  )
}

export default StepPhoto