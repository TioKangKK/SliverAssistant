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
  data: {[x: string]: any}
  onPrevStep: () => void
}

const StepPhoto: FC<Props> = ({ data, onPrevStep }) => {
  const handlePrevStep = () => onPrevStep()

  return (
    <>
      <Card>
        <Form config={formConfig} data={data} />
      </Card>
      <Footer>
        <Button onClick={handlePrevStep} type='default'>上一步</Button>
      </Footer>
    </>
  )
}

export default StepPhoto