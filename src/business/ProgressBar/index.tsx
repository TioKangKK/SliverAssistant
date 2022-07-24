import { FC } from 'react'
import { Image, View } from '@tarojs/components'

import Card from '@/components/Card'

import IconProgressDown from '@/assets/progress_down.svg'
import IconProgressIn from '@/assets/progress_in.svg'
import IconProgressTodo from '@/assets/progress_todo.svg'

import { Option } from '@/types'

import './index.less'

const getSrc = (step: number, index: number) => {
  if (step === index) {
    return IconProgressIn
  } else if (step < index) {
    return IconProgressTodo
  } else {
    return IconProgressDown
  }
}

const ProgressBar: FC<{ options: Option[], step: number }> = ({ options, step }) => {
  return (
    <Card className='progress-bar'>
      {options.map((option, index) => (
        <View className={`progress-bar-item ${step < index ? 'progress-bar-item-todo' : ''}`} key={option.id}>
          <Image className='progress-bar-icon' src={getSrc(step, index)} />
          <View className='progress-bar-title'>{option.name}</View>
        </View>
      ))}
    </Card>
  )
}

export default ProgressBar