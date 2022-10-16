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

import { DocumentStatus, WatchOverDetail, WatchOverSituationStatus } from '@/service/types'
import { getDocumentList, getWatchOverDetail } from '@/service'
import { Option } from '@/types'
import { Role } from '@/constants/user'

import userInfoStore from '@/store/userInfo'

import './index.less'

// TODO: 社工及以上可以看见跟进记录，以及修改跟进记录

const render = value => <FormContent>{value}</FormContent>
const renderNormalOrAbnormal = (value: number) => {
  const options: Option[] = [{ id: 1, name: '正常' }, { id: 2, name: '异常' }]
  return render(options.find(item => item.id === +value)?.name)
};
const getFormConfig = (data: { [x: string]: any }, elders: {id: string, name: string}[]): FormConfigItem[] => [
  { key: 'date', render: (value) => <Banner>观护日期: {value}</Banner> },
  { key: 'user_id', render: (value) => render(elders.find(item => String(item.id) === String(value))?.name || '-') },
  { key: 'health_situation', label: '身体情况', render: renderNormalOrAbnormal, },
  ...(data.health_situation === WatchOverSituationStatus.ABNORMAL ? [
    {
      key: 'health_situation_reason',
      label: '身体情况异常记录',
      render,
    },
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
]

const getElders = async () => {
  const { list } = await getDocumentList({ params: {} })
  return list.filter(item => item.status === DocumentStatus.APPROVED && item.need_probation).map(item => ({ id: '' + item.id, name: item.name }))
}

const transformDetailToData = (detail: WatchOverDetail, elders: { id: string; name:string }[]): { [x: string]: any } => {
  const data: Partial<WatchOverDetail> = { ...detail }
  data.user_id = elders.findIndex(item => String(item.id) === String(detail.user_id))
  delete data.pictures
  delete data.status
  return data
}

const WatchOverDetailPage: FC = () => {
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数
  const canOperate = [Role.SocialWorker, Role.SuperManager].includes(userInfoStore.get('role'))

  const [images, setImages] = useState<string[]>([]);

  const [elders, setElders] = useState<{ id:string, name: string }[]>([]);

  const [formData, setFormData] = useState<{ [x: string]: any }>({
    // date: dayjs().format('YYYY-MM-DD')
  })

  const formConfig = getFormConfig(formData, elders);

  const init = async () => {
    const elderList = await getElders()
    setElders(elderList);
    if (params.id) {
      const detail = await getWatchOverDetail(params.id);
      if (!detail) return;
      if (detail.pictures) {
        setImages(detail.pictures.split(','))
      }
      setFormData(transformDetailToData(detail, elderList))
    }
  }

  useEffect(() => { init() }, [])

  const handleEdit = () => navigateTo(`/pagesWatchOver/watchOverForm/index?id=${params.id}`)
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
