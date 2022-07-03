import { FC } from 'react'
import { View } from '@tarojs/components'

import './FormContent.less'

const FormContent: FC = ({ children }) => {
  return <View className='form-content'>{children}</View>
}

export default FormContent