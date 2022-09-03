import { FC } from 'react';
import { Image, View } from '@tarojs/components';

import Card from '@/components/Card';
import Split from '@/components/Split';
import Checkbox from '@/components/Checkbox';

import IconArrowRight from '@/assets/arrow_right.svg'

import { livingLevelToName, statusToName } from '@/constants/user';
import { TDocument } from '@/service/types';

import './index.less'

type Props = {
  info: TDocument,
  extra?: {
    text: string;
    onClick: () => void;
  },
  selected?: boolean;
  onSelect?: (v: boolean) => void;
}

const ElderCard: FC<Props> = ({ info, extra, selected, onSelect }) => {
  return (
    <Card className='elder-card'>
      {
        selected !== undefined && (
          <View className='elder-card-left'>
            <Checkbox value={selected} onChange={(v) => onSelect && onSelect(v)}  />
          </View>
        )
      }
      <View className='elder-card-right'>
        <View className='elder-card-content'>
          <Image className='elder-card-content-avatar' src={info.individual_info?.photo_uris?.[0]} />
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
              <View className='elder-card-content-info-item'>{livingLevelToName[info.living_level]}</View>
              <Split type='vertical' />
              <View className='elder-card-content-info-item'>{info.community}</View>
              {/* TODO 等观护出了才有 */}
              {/* <Split type='vertical' /> */}
              {/* <View className='elder-card-content-info-item' style={{ color: info.status ? '#219653;' : '#F2994A;' }}>{statusToName[info.status]}</View> */}
            </View>
          </View>
        </View>
        <View className='elder-card-footer'>
          {info.need_probation ? (
            <>
              <View className='elder-card-footer-item'>观护志愿者: {info.volunteer_id}</View>
              <View className='elder-card-footer-item'>观护日期: {info.updated_at}</View>
            </>
          ) : (
            <View className='elder-card-footer-item'>不需要观护</View>
          )}
        </View>
      </View>
      
    </Card>
  )
}

export default ElderCard;