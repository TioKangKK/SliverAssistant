import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Split from '@/components/Split';

import './index.less'

type Props = {
  name: string;
  phone: string;
  image: string;
  org: string;
  role: string;
}

const UserProfile: FC<Props> = ({ name, phone, image, org, role }) => {
  return (
    <View className='user-profile'>
      <Image className='user-profile-avatar' src={image} />
      <View className='user-profile-right'>
        <View className='user-profile-right-item'>
          <View className='user-profile-name'>{name}</View>
          <View className='user-profile-phone'>{phone}</View>          
        </View>
        <View className='user-profile-right-item'>
          <View className='user-profile-org'>{org}</View>
          <Split type='vertical' />
          <View className='user-profile-role'>{role}</View>          
        </View>
      </View>
    </View>
  )
}

export default UserProfile