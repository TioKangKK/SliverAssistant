import { FC, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Banner from '@/components/Displays/Banner'
import FormContent from '@/components/Displays/FormContent'
import ImageList from '@/components/Displays/ImageList'
import Footer from '@/components/Footer'
import Form, { FormConfigItem } from '@/components/Form'
import Page from '@/components/Page'

import { navigateBack, navigateTo } from '@/utils/navigator'

import { WatchOverDetail, WatchOverSituationStatus } from '@/service/types'
import { getWatchOverDetail } from '@/service'
import { Option } from '@/types'
import { Role } from '@/constants/user'

import userInfoStore from '@/store/userInfo'

import './index.less'

// 社工及以上可以看见跟进记录，以及修改跟进记录

const render = value => <FormContent>{value}</FormContent>
const renderNormalOrAbnormal = (value: number) => {
  const options: Option[] = [{ id: 1, name: '正常' }, { id: 2, name: '异常' }]
  return render(options.find(item => item.id === +value)?.name)
};
const getFormConfig = (data: { [x: string]: any }, canOperate: boolean): FormConfigItem[] => [
  { key: 'date', render: (value) => <Banner>观护日期: {value}</Banner> },
  { key: 'elder_name', label: '姓名',  render },
  { key: 'health_situation', label: '身体情况', render: renderNormalOrAbnormal, },
  ...(data.health_situation === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'health_situation_reason',
      label: '身体情况异常记录',
      render,
    },
  ] : []),
  ...(data.health_situation_follow && canOperate ? [
    {
      key: 'health_situation_follow',
      label: '身体情况跟进记录',
      render,
    }
  ] : []),
  {
    key: 'daily_diet',
    label: '饮食情况',
    render: renderNormalOrAbnormal,
  },
  ...(data.daily_diet === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'daily_diet_reason',
      label: '饮食情况异常记录',
      render,
    },
  ] : []),
  ...(data.daily_diet_follow && canOperate ? [
    {
      key: 'daily_diet_follow',
      label: '饮食情况跟进记录',
      render,
    }
  ] : []),
  {
    key: 'emotion_situation',
    label: '情绪状态',
    render: renderNormalOrAbnormal,
  },
  ...(data.emotion_situation === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'emotion_situation_reason',
      label: '情绪状态异常记录',
      render,
    },
  ] : []),
  ...(data.emotion_situation_follow && canOperate ? [
    {
      key: 'emotion_situation_follow',
      label: '情绪状态跟进记录',
      render,
    }
  ] : []),
  {
    key: 'housing_security',
    label: '住房安全',
    render: renderNormalOrAbnormal,
  },
  ...(data.housing_security === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'housing_security_reason',
      label: '住房安全异常记录',
      render,
    },
  ] : []),
  ...(data.housing_security_follow && canOperate ? [
    {
      key: 'housing_security_follow',
      label: '住房安全跟进记录',
      render,
    }
  ] : []),
  {
    key: 'family_relation',
    label: '家庭关系',
    render: renderNormalOrAbnormal,
  },
  ...(data.family_relation === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'family_relation_reason',
      label: '家庭关系异常记录',
      render,
    },
  ] : []),
  ...(data.family_relation_follow && canOperate ? [
    {
      key: 'family_relation_follow',
      label: '家庭关系跟进记录',
      render,
    }
  ] : []),
]

const transformDetailToData = (detail: WatchOverDetail): { [x: string]: any } => {
  const data: Partial<WatchOverDetail> = { ...detail }
  delete data.pictures
  delete data.status
  return data
}

const WatchOverDetailPage: FC = () => {
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数
  const canOperate = [Role.SocialWorker, Role.SuperManager].includes(userInfoStore.get('role'))

  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState<{ [x: string]: any }>({
    // date: dayjs().format('YYYY-MM-DD')
  })

  const formConfig = getFormConfig(formData, canOperate);

  const init = async () => {
    if (params.id) {
      const detail = await getWatchOverDetail(params.id);
      if (!detail) return;
      if (detail.pictures) {
        setImages(detail.pictures.split(','))
      }
      setFormData(transformDetailToData(detail))
    }
  }

  useEffect(() => { init() }, [])

  const handleEdit = () => navigateTo(`/pagesWatchOver/watchOverForm/index?id=${params.id}&type=edit`)
  const handleBack = () => navigateBack()

  return (
    <Page>
      <Card>
        <Form config={formConfig} data={formData} />
      </Card>
      {images.length !== 0 && (
        <Card>
          <View className='watch-over-photo-title'>照片</View>
          <ImageList urls={images} />
        </Card>
      )}
      {canOperate && (
        <Footer className='two-buttons-group'>
          <Button onClick={handleEdit}>修改内容</Button>
          <Button onClick={handleBack} type='primary'>返回</Button>
        </Footer>
      )}
    </Page>
  )
}

export default WatchOverDetailPage
