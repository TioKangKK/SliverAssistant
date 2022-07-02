import { View } from '@tarojs/components'
import { FC } from 'react'
import './FormItem.less'

type Props = {
  label: string;
  errorTip?: string;
}

const FormItem: FC<Props> = ({ label, errorTip, children }) => {
  return (
    <View className='form-item'>
      <View className='form-item-label'>
        {label}
        {Boolean(errorTip) && <View className='form-item-error-tip'>({errorTip})</View>}
      </View>
      <View className='form-item-input'>{children}</View>
    </View>
  )
}

export default FormItem