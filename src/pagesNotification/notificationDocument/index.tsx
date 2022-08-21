import { Option } from "@/types"
import { FC, useState } from "react"
import { useDidShow, useRouter } from "@tarojs/taro"

import Page from "@/components/Page"

import { getDocument, operateDocument } from "@/service"
import { DocumentOperate, TDocument } from "@/service/types"
import { showToast } from "@/utils/toast"
import { delay } from "@/utils"
import { navigateBack } from "@/utils/navigator"

import ProgressBar from "@/business/ProgressBar"
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

const docToData = (doc: TDocument) => {
  const data = {
    ...doc,
    ...doc.individual_info
  } as {[x:string]: any}
  delete data.individual_info
  data.utilities = {
    utilities_condition: data.utilities_condition,
    is_safe_utilities: data.is_safe_utilities,
  }
  return data
}

const NotificationDocumentPage: FC = () => {
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数
  
  const [step, setStep] = useState(0)
  const handlePrevStep = () => setStep(step - 1)
  const handleNextStep = () => setStep(step + 1)

  const [data, setData] = useState<{[x: string]: any}>({})
  const getData = async () => {
    const doc = await getDocument({ id: params.id })
    setData(doc ? docToData(doc) : {})
  }
  useDidShow(async () => {
    await getData();
  })

  const handleReject = async () => {
    await operateDocument({ id: Number(params.id), op: DocumentOperate.REJECT });
    showToast('已拒绝')
    await delay(1000);
    navigateBack({ delta: 2 });
  }
  const handleConfirm = async () => {
    await operateDocument({ id: Number(params.id), op: DocumentOperate.APPROVED });
    showToast('已通过')
    await delay(1000);
    navigateBack({ delta: 2 });
  }
  
  return (
    <Page>
      <ProgressBar options={progressOptions} step={step} />
      {step === 0 && <StepBasicInfo data={data} onNextStep={handleNextStep} onReject={handleReject} />}
      {step === 1 && <StepContact data={data} onPrevStep={handlePrevStep} onNextStep={handleNextStep} onReject={handleReject} />}
      {step === 2 && <StepPersonal data={data} onPrevStep={handlePrevStep} onNextStep={handleNextStep} onReject={handleReject} />}
      {step === 3 && <StepSpecial data={data} onPrevStep={handlePrevStep} onNextStep={handleNextStep} onReject={handleReject} />}
      {step === 4 && <StepPhoto data={data} onPrevStep={handlePrevStep} onReject={handleReject} onConfirm={handleConfirm} />}
    </Page>
  )
}

export default NotificationDocumentPage