import { FC, useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import { useDidShow, useRouter } from '@tarojs/taro';

import Button from '@/components/Button';
import FormContent from '@/components/Displays/FormContent';
import Footer from '@/components/Footer';
import Form, { FormConfigItem } from '@/components/Form';

import { navigateBack } from '@/utils/navigator';
import { delay } from '@/utils';
import { showToast } from '@/utils/toast';
import { audit, getCommunityList, getUserDetail } from '@/service';
import { AuditStatus, Community } from '@/service/types';

import './index.less'

const render = (value) => <FormContent>{value ?? '-'}</FormContent>
const genFormConfig = (communityList: Community[]): FormConfigItem[] => [
  { key: 'name', label: '姓名', render },
  { key: 'gender', label: '性别', render },
  { key: 'age', label: '年龄', render, },
  { key: 'id_number', label: '身份证号码', render, },
  { key: 'phone', label: '联系电话', render, },
  { 
    key: 'community_id',
    label: '所属社区',
    render: (value) => {
      const name = communityList.find(item => item.id === value)?.name
      return render(name)
    },
  },
  { key: 'address', label: '家庭住址', render, },
]

const NotificationDetailPage: FC = () => {
  // 用id： 2暂代
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数

  const [data, setData] = useState<{[x: string]: any}>({})
  const [communityList, setCommunityList] = useState([] as Community[])
  useDidShow(async () => {
    const detail = await getUserDetail({ id: params.id })
    setData(detail)
    const list = await getCommunityList()
    setCommunityList(list)
  })

  const formConfig = useMemo(() => genFormConfig(communityList), [communityList])

  const msg = '谁把谁的灵魂，装进谁的身体'

  const handleAudit = async (status: AuditStatus) => {
    await audit({ id: params.id, status })
    showToast('审核成功')
    await delay(1000)
    navigateBack()
  }

  return (
    <View className='notification-detail'>
      <View className='notification-detail-header'>
        {msg}
      </View>
      <View className='notification-detail-content'>
        <Form data={data} config={formConfig} />
      </View>
      <Footer className='two-buttons-group'>
        <Button type='default' onClick={() => handleAudit(AuditStatus.Rejected)}>拒绝</Button>
        <Button type='primary' onClick={() => handleAudit(AuditStatus.Passed)}>通过</Button>
      </Footer>
    </View>
  )
}

export default NotificationDetailPage