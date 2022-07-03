import Split from '@/components/Split';
import Card from '@/components/Card';
import { Image, View } from '@tarojs/components';
import { FC, ReactNode } from 'react';
import IconArrowRight from '@/assets/arrow_right.svg'
import { navigateTo } from '@/utils/navigator';

import './index.less'

type Props = {
  info: {
    id: number;
    avatar: string;
    name: string;
    age: number | string;
    level: number;
    levelName: string;
    address: string;
    status?: string;
    statusType?: number;
    volunteer: string;
    date: string;
  },
  extra?: {
    text: string;
    onClick: () => void;
  }
}

const ElderCard: FC<Props> = ({ info, extra }) => {
  return (
    <Card className='elder-card'>
      <View className='elder-card-content'>
        <Image className='elder-card-content-avatar' src={info.avatar} />
        <View className='elder-card-content-info'>
          <View className='elder-card-content-info-1'>
            <View className='elder-card-content-info-1-left'>
              <View className='elder-card-content-info-name'>{info.name}</View>
              {info.age}岁
            </View>
            {extra && (
              <View onClick={extra.onClick} className='elder-card-content-info-1-right'>
                {extra.text}<Image src={IconArrowRight} className='icon-arrow-right' />
              </View>
            )}
          </View>
          <View className='elder-card-content-info-2'>
            <View className='elder-card-content-info-item'>{info.levelName}</View>
            <Split type='vertical' />
            <View className='elder-card-content-info-item'>{info.address}</View>
            { info.status !== undefined && (
              <>
                <Split type='vertical' />
                <View className='elder-card-content-info-item' style={{ color: info.statusType ? '#219653;' : '#F2994A;' }}>{info.status}</View>
              </>
            )}
          </View>
        </View>
      </View>
      <View className='elder-card-footer'>
        {info.level < 3 ? (
          <>
            <View className='elder-card-footer-item'>观护志愿者: {info.volunteer}</View>
            <View className='elder-card-footer-item'>观护日期: {info.date}</View>
          </>
        ) : (
          <View className='elder-card-footer-item'>不需要观护</View>
        )}
      </View>
    </Card>
  )
}

export default ElderCard;