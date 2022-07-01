import { Image, View } from '@tarojs/components'
import { FC } from 'react'
import './index.less'

type Props = {
  avatar: string;
  name: string;
  phone: string;
}

const UserProfile: FC<Props> = ({ avatar, name, phone }) => {
  return (
    <View className='user-profile'>
      <Image className='user-profile-avatar' src={avatar} />
      <View className='user-profile-right'>
        <View className='user-profile-name'>{name}</View>
        <View className='user-profile-phone'>{phone}</View>
      </View>
    </View>
  )
}

export default UserProfile