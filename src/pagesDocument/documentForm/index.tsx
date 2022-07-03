import { FC, useState } from 'react'
import dayjs from 'dayjs'

import Page from '@/components/Page'

import DraftBoxEntry from '@/business/DraftBoxEntry'

import { navigateTo } from '@/utils/navigator'

import { Option } from '@/types'

import ProgressBar from './components/ProgressBar'
import StepBasicInfo from './components/StepBasicInfo'
import StepContact from './components/StepContact'
import StepPersonal from './components/StepPersonal'
import StepSpecial from './components/StepSpecial'
import StepPhoto from './components/StepPhoto'

import './index.less'

const progressOptions: Option[] = [
  { id: 0, name: '基础资料' },
  { id: 1, name: '联系方式' },
  { id: 2, name: '个人情况' },
  { id: 3, name: '特殊/分类' },
  { id: 4, name: '照片采集' },
]

const DocumentFormPage: FC = () => {
  const handleGoToDraftBox = () => { navigateTo('/pagesDocument/documentDraftBox/index') }
  
  const [step, setStep] = useState(2)

  const [data, setData] = useState<{[x: string]: any}>({
    createDate: dayjs().format('YYYY-MM-DD')
  })

  const handleChange = (v: {[x: string]: any}) => setData({ ...data, ...v })
  const handlePrevStep = () => setStep(step - 1)
  const handleNextStep = () => setStep(step + 1)
  const handleCommit = () => {
    console.log('一顿操作')
    navigateTo(`/pagesDocument/documentDetail/index?id=${'返回来的id'}`)
  }

  return (
    <Page>
      <DraftBoxEntry onClick={handleGoToDraftBox} />
      <ProgressBar options={progressOptions} step={step} />
      {step === 0 && <StepBasicInfo data={data} onChange={handleChange} onNextStep={handleNextStep} />}
      {step === 1 && <StepContact data={data} onChange={handleChange} onPrevStep={handlePrevStep} onNextStep={handleNextStep} />}
      {step === 2 && <StepPersonal data={data} onChange={handleChange} onPrevStep={handlePrevStep} onNextStep={handleNextStep} />}
      {step === 3 && <StepSpecial data={data} onChange={handleChange} onPrevStep={handlePrevStep} onNextStep={handleNextStep} />}
      {step === 4 && <StepPhoto data={data} onChange={handleChange} onPrevStep={handlePrevStep} onCommit={handleCommit} />}
    </Page>
  )
}

export default DocumentFormPage