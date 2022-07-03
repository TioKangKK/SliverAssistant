import { View } from '@tarojs/components'
import { FC } from 'react'

import './FormContent.less'

const FormContent: FC = ({ children }) => {
  return <View className='form-content'>{children}</View>
}

export default FormContent