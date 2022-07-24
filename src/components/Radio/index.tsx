import { FC } from "react";
import { View } from "@tarojs/components";

import { Flex } from "@taroify/core";
import "@taroify/core/flex/style"

import { Option } from "@/types";

import './index.less';

const RadioItem: FC<{
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ children, selected, onClick = () => {}, className = '' }) => {
  const classNames = `radio-item ${selected ? 'radio-item-active' : ''} ${className}`
  return (
    <View onClick={onClick} className={classNames}>{children}</View>
  )
}

type Props = {
  options: Option[];
  value?: number;
  onChange?: (value) => void;
  col?: number; // 分为几列
}

const Radio: FC<Props> = ({ options, value, onChange = () => {}, col = 2 }) => {
  return (
    <Flex gutter={8} wrap='wrap' className='radio'>
      {options.map((option, index) => (
        <Flex.Item className={`${index % col === 0 ? 'first-item' : ''}  ${(index+1) % col === 0 ? 'last-item' : ''}`} key={option.id} span={24/col}>
          <RadioItem
            className={col === 1 ? 'online-radio-item' : ''}
            selected={value === option.id}
            onClick={() => onChange(option.id)}
          >
            {option.name}
          </RadioItem>
        </Flex.Item>
      ))}
    </Flex>
  )
}

export default Radio