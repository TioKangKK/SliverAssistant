import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import FormItem from './FormItem'

import './index.less'

export type FormConfigItem = {
  key: string;
  label?: string;
  tip?: string;
  render: (value: any, onChange: (value: any) => void) => ReactNode;
  checker?: (value: any) => { tip: string; msg: string } | null;
  transfer?: (value: any) => any;
}

type Props = {
  config: FormConfigItem[];
  data: { [x: string]: any };
  showTip?: boolean;
  onChange?: (key: string, value: any) => void;
}

const Form: FC<Props> = ({ config, data, showTip = false, onChange = () => {} }) => {
  const handleChange = (key: string, value: any) => {
    console.log(key, value)
    onChange(key, value)
  }

  return (
    <View className='form'>
      {config.map(item => (
        <FormItem 
          key={item.key}
          label={item.label}
          tip={item.tip}
          errorTip={showTip && item.checker ? item.checker(data[item.key])?.tip : ''}
        >
          {item.render(data[item.key], (value) => handleChange(item.key, value))}
        </FormItem>
      ))}
    </View>
  )
}

export default Form