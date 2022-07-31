import { FC, useState } from 'react'
import { Button, Image, View } from '@tarojs/components'

import { getAvatar, setAvatar } from '@/service';

import './index.less'

type Props = {
  name: string;
  phone: string;
}
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const UserProfile: FC<Props> = ({ name, phone }) => {
  const [image, setImage] = useState(getAvatar())
  const handleChooseAvatar = ({ detail }) => {
    const avatar = detail.avatarUrl
    setAvatar(avatar)
    setImage(avatar)
  }
  return (
    <View className='user-profile'>
      {
        image ? (
          <Image className='user-profile-avatar' src={image} />
        ) : (
          <Button className='user-profile-avatar-wrapper' openType='chooseAvatar' onChooseAvatar={handleChooseAvatar}>
            <Image className='user-profile-avatar' src={image || defaultAvatarUrl} />
          </Button>
        )
      }
      <View className='user-profile-right'>
        <View className='user-profile-name'>{name}</View>
        <View className='user-profile-phone'>{phone}</View>
      </View>
    </View>
  )
}

export default UserProfile