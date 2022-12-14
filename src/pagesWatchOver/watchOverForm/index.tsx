import { FC, useEffect, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { useRouter, setNavigationBarTitle } from '@tarojs/taro'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Banner from '@/components/Displays/Banner'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import ImageUploader from '@/components/Inputs/ImageUploader'
import Selector from '@/components/Inputs/Selector'
import Textarea from '@/components/Inputs/Textarea'
import Page from '@/components/Page'
import Radio from '@/components/Radio'

import DraftBoxEntry from '@/business/DraftBoxEntry'

import { Option } from '@/types'

import { navigateBack, navigateTo } from '@/utils/navigator'
import { showToast } from '@/utils/toast'
import { getParamsFromForm } from '@/utils/form'
import { delay } from '@/utils'

import { createWatchOver, getDocumentList, getWatchOverDetail, updateWatchOver } from '@/service'
import { DocumentStatus, WatchOverDetail, WatchOverDetailStatus, WatchOverSituationStatus } from '@/service/types'

import { Role } from '@/constants/user'
import userInfoStore from '@/store/userInfo'

import './index.less'

const renderNormalOrAbnormal = (value: number, onChange: (number) => void) => {
  const options: Option[] = [{ id: 1, name: '正常' }, { id: 2, name: '异常' }]
  return <Radio options={options} value={value} onChange={onChange} />
};

const getFormConfig = (data: { [x: string]: any }, elders: {id: string, name: string}[], canFollow: boolean): FormConfigItem[] => [
  {
    key: 'care_time',
    render: (value) => value && <Banner>观护日期: {dayjs(value * 1000).format('YYYY-MM-DD')}</Banner>
  },
  {
    key: 'user_id',
    label: '姓名',
    render: (value, onChange) => {
      const range = elders.map(item => item.name);
      return <Selector range={range} value={value} onChange={onChange} placeholder='点击选择' />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '老人姓名未选择' },
    transfer: (index) => elders[index].id,
  },
  {
    key: 'health_situation',
    label: '身体情况',
    render: renderNormalOrAbnormal,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '身体情况未填写' },
  },
  ...(data.health_situation === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'health_situation_reason',
      label: '身体情况异常记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的异常情况' />
      },
      checker: (value) => value ? null : { tip: '必填', msg: '身体情况异常记录未填写' }
    },
  ] : []),
  ...(data.health_situation === WatchOverSituationStatus.ABNORMAL && canFollow ? [
    {
      key: 'health_situation_follow',
      label: '身体情况跟进记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的跟进记录' />
      },
    }
  ] : []),
  {
    key: 'daily_diet',
    label: '饮食情况',
    render: renderNormalOrAbnormal,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '饮食情况未填写' }
  },
  ...(data.daily_diet === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'daily_diet_reason',
      label: '饮食情况异常记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的异常情况' />
      },
      checker: (value) => value ? null : { tip: '必填', msg: '饮食情况异常记录未填写' }
    },
  ] : []),
  ...(data.daily_diet === WatchOverSituationStatus.ABNORMAL && canFollow ? [
    {
      key: 'daily_diet_follow',
      label: '饮食情况跟进记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的跟进记录' />
      },
    }
  ] : []),
  {
    key: 'emotion_situation',
    label: '情绪状态',
    render: renderNormalOrAbnormal,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '情绪状态未填写' }
  },
  ...(data.emotion_situation === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'emotion_situation_reason',
      label: '情绪状态异常记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的异常情况' />
      },
      checker: (value) => value ? null : { tip: '必填', msg: '情绪情况异常记录未填写' }
    },
  ] : []),
  ...(data.emotion_situation === WatchOverSituationStatus.ABNORMAL && canFollow ? [
    {
      key: 'emotion_situation_follow',
      label: '情绪状态跟进记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的跟进记录' />
      },
    }
  ] : []),
  {
    key: 'housing_security',
    label: '住房安全',
    render: renderNormalOrAbnormal,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '住房安全未填写' }
  },
  ...(data.housing_security === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'housing_security_reason',
      label: '住房安全异常记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的异常情况' />
      },
      checker: (value) => value ? null : { tip: '必填', msg: '住房安全异常记录未填写' }
    },
  ] : []),
  ...(data.housing_security === WatchOverSituationStatus.ABNORMAL && canFollow ? [
    {
      key: 'housing_security_follow',
      label: '住房安全跟进记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的跟进记录' />
      },
    }
  ] : []),
  {
    key: 'family_relation',
    label: '家庭关系',
    render: renderNormalOrAbnormal,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '家庭关系未填写' }
  },
  ...(data.family_relation === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'family_relation_reason',
      label: '家庭关系异常记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的异常情况' />
      },
      checker: (value) => value ? null : { tip: '必填', msg: '家庭关系异常记录未填写' }
    },
  ] : []),
  ...(data.family_relation === WatchOverSituationStatus.ABNORMAL && canFollow ? [
    {
      key: 'family_relation_follow',
      label: '家庭关系跟进记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的跟进记录' />
      },
    }
  ] : []),
]

const getElders = async () => {
  const { list } = await getDocumentList({ params: {} })
  return list.filter(item => item.status === DocumentStatus.APPROVED && item.need_probation).map(item => ({ id: '' + item.id, name: item.name }))
}

const defaultKeys = ['health_situation', 'daily_diet', 'emotion_situation', 'housing_security', 'family_relation']
const transformDataToParams = (formConfig: FormConfigItem[], data: {[x: string]: any}, imageList: string[]) => {
  const params = getParamsFromForm(formConfig, data);
  for (const key of defaultKeys) {
    params[key] = params[key] || WatchOverSituationStatus.DEFAULT
  }
  if (imageList.length) {
    params.pictures = imageList;
  }
  return params
}

const transformDetailToData = (detail: WatchOverDetail, elders: { id: string; name:string }[]): { [x: string]: any } => {
  const data: Partial<WatchOverDetail> = { ...detail }
  data.user_id = elders.findIndex(item => String(item.id) === String(detail.user_id))
  delete data.pictures
  delete data.status
  return data
}

const WatchOverFormPage: FC = () => {
  const { params } = useRouter<Required<{ id: string; type?: 'edit' }>>(); // 路由上的参数
  const id = useRef(+params.id)
  const canFollow = [Role.SocialWorker, Role.SuperManager].includes(userInfoStore.get('role')) && Boolean(id.current) && params.type === 'edit';

  const [images, setImages] = useState<string[]>([]);

  const [elders, setElders] = useState<{ id:string, name: string }[]>([]);

  const [showTip, setShowTip] = useState(false);
  const [formData, setFormData] = useState<{ [x: string]: any }>({
    care_time: dayjs().valueOf() / 1000
  })
  const [canSaveDraft, setCanSaveDraft] = useState(true);
  
  const init = async () => {
    const elderList = await getElders()
    setElders(elderList);
    if (id.current) {
      const detail = await getWatchOverDetail(id.current);
      if (!detail) return;
      if (detail.pictures) {
        setImages(detail.pictures.split(','))
      }
      if (detail.status === WatchOverDetailStatus.SUBMITTED) {
        setCanSaveDraft(false)
      }
      setFormData(transformDetailToData(detail, elderList))
    }
  }

  useEffect(() => { init() }, [])
  useEffect(() => {
    if (params.type === 'edit') {
      setNavigationBarTitle({ title: '编辑观护' });
    }
  }, [params.type])

  const formConfig = getFormConfig(formData, elders, canFollow);
  const handleFormChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }
  const isValidate = () => {
    for (const item of formConfig) {
      if (!item.checker) { continue }
      const msg = item.checker(formData[item.key])?.msg
      if (msg) {
        showToast(msg);
        setShowTip(true);
        return false;
      }
    }
    return true
  }
  const handleSaveDraft = async () => {
    const p = transformDataToParams(formConfig, formData, images);
    if (!p.user_id) {
      showToast("选择老人后才能保存草稿");
      return
    }
    try {
      if (!id.current) {
        const newId = await createWatchOver({ ...p, status: WatchOverDetailStatus.DRAFT })
        if (newId) { id.current = newId }
      } else {
        await updateWatchOver({ id: id.current, ...p, status: WatchOverDetailStatus.DRAFT })
      }
      showToast('保存成功')
      await delay(1000)
      // 提交
      navigateBack();
    } catch (e) {
      showToast(e.msg || e.errMsg);
    }
  }
  const handleCommit = async () => {
    if (!isValidate()) { return }
    try {
      if (!id.current) {
        const newId = await createWatchOver({ ...transformDataToParams(formConfig, formData, images), status: WatchOverDetailStatus.SUBMITTED })
        if (newId) { id.current = newId }
      } else {
        await updateWatchOver({ id: id.current, ...transformDataToParams(formConfig, formData, images), status: WatchOverDetailStatus.SUBMITTED })
      }
      showToast('提交成功')
      await delay(1000)
      // 提交
      navigateBack();
    } catch (e) {
      showToast(e.msg || e.errMsg);
    }
  }
  const handleGoToDraftBox = () => { navigateTo('/pagesWatchOver/watchOverDraftBox/index') }

  return (
    <Page>
      <DraftBoxEntry onClick={handleGoToDraftBox} />
      <Card className='watch-over-form'>
        <Form showTip={showTip} config={formConfig} data={formData} onChange={handleFormChange} />
      </Card>
      <Card className='image-upload-card'>
        <View className='image-upload-card-title'>点击拍照或上传照片</View>
        <ImageUploader files={images} onChange={(v) => setImages(v)} />
      </Card>
      {canSaveDraft ? (
        <Footer className='two-buttons-group'>
          <Button onClick={handleSaveDraft} type='default'>保存草稿</Button>
          <Button onClick={handleCommit} type='primary'>提交</Button>
        </Footer>
      ) : (
        <Footer>
          <Button onClick={handleCommit} type='primary'>修改</Button>
        </Footer>
      )}
    </Page>
  )
}

export default WatchOverFormPage
