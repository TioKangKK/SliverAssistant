import { FC } from 'react'
import { View } from '@tarojs/components'
import { useRouter } from '@tarojs/taro';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Form, { FormConfigItem } from '@/components/Form';
import { navigateBack } from '@/utils/navigator';

import './index.less'

const render = (value) => <View className='fake-input'>{value}</View>
const formConfig: FormConfigItem[] = [
  { key: 'name', label: '姓名', render },
  { key: 'gender', label: '性别', render },
  { key: 'age', label: '年龄', render, },
  { key: 'idcard', label: '身份证号码', render, },
  { key: 'phone', label: '联系电话', render, },
  { key: 'community', label: '所属社区', render, },
  { key: 'address', label: '家庭住址', render, },
]

const NotificationDetailPage: FC = () => {
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数

  const msg = '谁把谁的灵魂，装进谁的身体'
  const data = {
    name: '康康康',
    gender: '男',
    age: '11',
    idcard: '330330188812120505',
    phone: '18888888888',
    community: 'xxxx',
    address: 'xxx',
  }

  const handleReject = () => {
    console.log('reject')
    navigateBack()
  }
  const handlePass = () => {
    console.log('pass')
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
      <Footer className='button-groups'>
        <Button type='default' onClick={handleReject}>拒绝</Button>
        <Button type='primary' onClick={handlePass}>通过</Button>
      </Footer>
    </View>
  )
}

export default NotificationDetailPage