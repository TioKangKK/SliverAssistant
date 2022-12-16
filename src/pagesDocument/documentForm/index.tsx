import { FC, useEffect, useRef, useState } from 'react'
import { useDidShow, useRouter, showLoading, hideLoading } from '@tarojs/taro'

import Page from '@/components/Page'

import DraftBoxEntry from '@/business/DraftBoxEntry'
import ProgressBar from '@/business/ProgressBar'

import { navigateTo } from '@/utils/navigator'

import { Option } from '@/types'

import { createDocument, editDocument, getCommunityList, getDocument, operateDocument } from '@/service'
import { Community, DocumentOperate, TDocument } from '@/service/types'
import { showToast } from '@/utils/toast'
import { delay } from '@/utils'

import StepBasicInfo from './components/StepBasicInfo'
import StepContact from './components/StepContact'
import StepPersonal from './components/StepPersonal'
import StepSpecial from './components/StepSpecial'
import StepPhoto from './components/StepPhoto'

import './index.less'
import { checkFormData } from './formConfig'

const progressOptions: Option[] = [
  { id: 0, name: '基础资料' },
  { id: 1, name: '联系方式' },
  { id: 2, name: '个人情况' },
  { id: 3, name: '特殊/分类' },
  { id: 4, name: '照片采集' },
]

const individualInfoKeys = [
  "address",
  "cleanness_condition",
  "contact",
  "diseases",
  "emergency_contact",
  "emergency_phone_number",
  "entrance_condition",
  "environment_remarks",
  "expressing",
  "family_remarks",
  "financial_remarks",
  "has_bath_chair",
  "has_crutch",
  "has_family_events",
  "has_rail_in_toilet",
  "has_wheel_chair",
  "health_remarks",
  "hearing",
  "is_cleanness",
  "is_good_neighbor",
  "is_got_supplied",
  "is_live_together",
  "is_retired_employee",
  "is_safe_entrance",
  "is_safe_utilities",
  "is_special_disease",
  "is_subsistence_allowances",
  "is_suffering_accident",
  "is_suffering_hardship",
  "living_situation",
  "mobility",
  "number_of_descendants",
  "photo_uris",
  "utilities_condition",
  "visiting_frequency",
]
const transformDataToParams = (data: {[x:string]: any}) => {
  const params = {} as {[x:string]: any}
  for (const key of Object.keys(data)) {
    if (individualInfoKeys.includes(key) || key === 'utilities') {
      if (!params.individual_info) {
        params.individual_info = {} as {[x:string]: any}
      }
      if (key === 'utilities') {
        params.individual_info.utilities_condition = data[key].utilities_condition
        params.individual_info.is_safe_utilities = data[key].is_safe_utilities
      } else {
        params.individual_info[key] = data[key]
      }
    } else {
      params[key] = data[key]
    }
  }
  return params
}

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

const computedLivingLevel = (data: {[x:string]: any}) => {
  if (data.living_level) { return 0 }
  if (+data.mobility === 3) {
    return 1
  } else if (data.living_situation === 1 && data.age > 80) {
    return 2
  } else if (data.living_situation === 1 && data.age <= 80 && data.age > 65) {
    return 3
  } else {
    return 0
  }
}

const DocumentFormPage: FC = () => {
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数
  const id = useRef(+params.id)
  
  const [communityList, setCommunityList] = useState([] as Community[])
  useDidShow(async () => {
    const list = await getCommunityList()
    setCommunityList(list)
  })

  const handleGoToDraftBox = () => { navigateTo('/pagesDocument/documentDraftBox/index') }
  
  const [step, setStep] = useState(0)
  const [showTip, setShowTip] = useState(false);

  const [data, setData] = useState<{[x: string]: any}>({
  })

  const handleChange = (v: {[x: string]: any}) => {
    const nextData = { ...data, ...v }
    const level = computedLivingLevel(nextData)
    if (level) { nextData.living_level = level }
    setData(nextData)
  }
  const handlePrevStep = () => setStep(step - 1)
  const handleNextStep = () => setStep(step + 1)
  const handleSaveDraft = async (daft: {[x: string]: any}, show = true) => {
    // 操作了就更新下数据
    const nextData = { ...data, ...daft }
    if (!nextData.name) {
      setStep(0)
      showToast('至少填写老人姓名后保存草稿');
      return;
    }
    setData(nextData)

    if (id.current) {
      await editDocument(transformDataToParams(nextData))
    } else {
      const doc = await createDocument(transformDataToParams(nextData))
      if (doc && doc.id) { 
        id.current = doc.id
        await getData()
        show && showToast('保存草稿成功')
      } else {
        show && showToast('保存草稿失败')
      }
    }
  }
  const committing = useRef(false);
  const handleCommit = async (v: {[x: string]: any}) => {
    setData(v);

    const checkRes = checkFormData(communityList, v);
    if (checkRes) {
      setStep(checkRes.step)
      setShowTip(true)
      showToast(checkRes.msg)
      return;
    }

    if (committing.current) return;
    committing.current = true;
    try {
      showLoading({ title: '正在提交' });
      await handleSaveDraft(v, false) // 先保存草稿
      await operateDocument({ id: id.current, op: DocumentOperate.SUBMIT });
      showToast('成功提交')
      await delay(1000);
      hideLoading();
      navigateTo(`/pagesDocument/documentProfile/index?id=${id.current}`)
    } catch (e) {
      showToast('提交失败')
    } finally {
      committing.current = false
    }
  }

  const getData = async () => {
    const doc = await getDocument({ id: id.current })
    setData(doc ? docToData(doc) : {})
  }

  useEffect(() => {
    id.current && getData();
  }, [])

  return (
    <Page>
      <DraftBoxEntry onClick={handleGoToDraftBox} />
      <ProgressBar options={progressOptions} step={step} />
      {step === 0 && <StepBasicInfo communityList={communityList} data={data} showTip={showTip} onChange={handleChange} onNextStep={handleNextStep} onSaveDaft={handleSaveDraft} />}
      {step === 1 && <StepContact data={data} showTip={showTip} onChange={handleChange} onPrevStep={handlePrevStep} onNextStep={handleNextStep} onSaveDaft={handleSaveDraft} />}
      {step === 2 && <StepPersonal data={data} showTip={showTip} onChange={handleChange} onPrevStep={handlePrevStep} onNextStep={handleNextStep} onSaveDaft={handleSaveDraft} />}
      {step === 3 && <StepSpecial data={data} showTip={showTip} onChange={handleChange} onPrevStep={handlePrevStep} onNextStep={handleNextStep} onSaveDaft={handleSaveDraft} />}
      {step === 4 && <StepPhoto data={data} showTip={showTip} onChange={handleChange} onPrevStep={handlePrevStep} onCommit={handleCommit} onSaveDaft={handleSaveDraft} />}
    </Page>
  )
}

export default DocumentFormPage