import { CSSProperties, FC, useEffect, useState } from 'react'
import { Image, ScrollView, View } from '@tarojs/components';
import { Popup } from '@taroify/core';
import "@taroify/core/popup/style"
import { Option } from '@/types';
import IconPolygon from '@/assets/polygon.svg'

import './PopupSelector.less'
import './Selector.less'

type Props = {
  className?: string;
  style?: string | CSSProperties;
  value: number[];
  title?: string;
  placeholder?: string;
  options: {
    id: number;
    name: string;
    children: Option[];
  }[];
  onChange: (value: number[]) => void
}

const PopupSelector: FC<Props> = ({ title = '', value, className, style, placeholder, onChange, options }) => {
  const [visible, setVisible] = useState(false)
  const displayText = (value || []).length

  const [data, setData] = useState(value || [])
  useEffect(() => setData(value || []), [value])

  const [activeId, setActiveId] = useState(options[0]?.id)

  const rightOptions = options.find(item => item.id === activeId)?.children || []

  const handleConfirm = () => {
    onChange(data)
    setVisible(false)
  }

  const handleClickRight = (id) => {
    if (data.includes(id)) {
      const index = data.indexOf(id)
      data.splice(index, 1)
    } else {
      data.push(id)
    }
    setData([...data])
  }

  return (
    <>
      <View onClick={() => setVisible(true)} style={style} className={`selector-fake-input ${className || ''}`}>
        {displayText
          ? <View className='selector-fake-input-text'>已选{displayText}项</View>
          : <View className='selector-fake-input-text selector-fake-input-tip'>{placeholder}</View>
        }
        <Image src={IconPolygon} className='icon-polygon' />
      </View>
      {visible && (
        <Popup onClose={() => setVisible(false)} rounded defaultOpen placement='bottom' style={{ height: '400px' }}>
          <View className='popup-title'>
            <View onClick={() => setVisible(false)} className='popup-title-left'>取消</View>
            <View className='popup-title-mid'>{title}</View>
            <View onClick={() => handleConfirm()} className='popup-title-right'>确定</View>
          </View>
            <View className='popup-content'>
              <ScrollView style={{ height: '340px', width: '115px' }} scrollY>
                <View className='popup-content-left'>
                  {options.map(option => (
                    <View 
                      onClick={() => setActiveId(option.id)}
                      key={option.id}
                      className={`popup-content-left-item ${activeId === option.id ? 'popup-content-left-item-active' : ''}`}
                    >
                      {option.name}
                    </View>
                  ))}
                </View>
              </ScrollView>
              <ScrollView style={{ height: '340px' }} scrollY>
                <View className='popup-content-right'>
                  {rightOptions.map(option => (
                    <View 
                      onClick={() => handleClickRight(option.id)}
                      key={option.id}
                      className={`popup-content-right-item ${data.includes(option.id) ? 'popup-content-right-item-active' : ''}`}
                    >
                      {option.name}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
        </Popup>
      )}
    </>
  )
}

export default PopupSelector;