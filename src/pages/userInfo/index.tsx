import { FC, useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import { useDidShow, useRouter } from '@tarojs/taro';
import { Gender } from '@/constants/user';

import FormContent from '@/components/Displays/FormContent';
import Form, { FormConfigItem } from '@/components/Form';

import { getCommunityList, getUserDetail } from '@/service';
import { Community } from '@/service/types';

import './index.less'

const render = (value) => <FormContent>{value ?? '-'}</FormContent>
const genFormConfig = (communityList: Community[]): FormConfigItem[] => [
  { key: 'name', label: '姓名', render },
  { key: 'gender', label: '性别', render: value => render(value === Gender.Male ? '男' : '女'), },
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

const NotificationRegisterPage: FC = () => {
  const { params } = useRouter<Required<{ id: string; }>>(); // 路由上的参数

  const [data, setData] = useState<{[x: string]: any}>({})
  const [communityList, setCommunityList] = useState([] as Community[])
  useDidShow(async () => {
    const detail = await getUserDetail({ id: params.id })
    setData(detail)
    const list = await getCommunityList()
    setCommunityList(list)
  })

  const formConfig = useMemo(() => genFormConfig(communityList), [communityList])

  return (
    <View className='user-info-detail'>
      <View className='user-info-content'>
        <Form data={data} config={formConfig} />
      </View>
    </View>
  )
}

export default NotificationRegisterPage