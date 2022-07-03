import { FC } from 'react'
import { View } from '@tarojs/components'
import './FormItem.less'

type Props = {
  label?: string;
  errorTip?: string;
  tip?: string;
}

const FormItem: FC<Props> = ({ label, errorTip, children, tip }) => {
  return (
    <View className='form-item'>
      {label && (
        <View className='form-item-label'>
          {label}
          {Boolean(errorTip) && <View className='form-item-error-tip'>({errorTip})</View>}
        </View>
      )}
      {tip && (
        <View className='form-item-tip'>{tip}</View>
      )}
      <View className='form-item-input'>{children}</View>
    </View>
  )
}

export default FormItem