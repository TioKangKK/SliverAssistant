import { Image, View } from "@tarojs/components";
import { FC } from "react";

import IconUnselected from '@/assets/unselected.svg';
import IconSelected from '@/assets/selected.svg';

import './index.less'

const Checkbox: FC<{
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({value, onChange}) => {
  return (
    <View className='checkbox' onClick={() => onChange(!value)}>
      <Image className='checkbox-icon' src={value ? IconSelected : IconUnselected} />
    </View>
  )
}

export default Checkbox