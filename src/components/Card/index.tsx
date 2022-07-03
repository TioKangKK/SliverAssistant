import { CSSProperties, FC } from 'react';
import { View } from '@tarojs/components';

import './index.less';

type Props = {
  style?: string | CSSProperties;
  className?: string;
  onClick?: (e) => void;
}

const Card: FC<Props> = ({ 
  children,
  className,
  style,
  onClick = () => {},
}) => {
  return (
    <View className={`card ${className || ''}`} style={style} onClick={onClick}>
      {children}
    </View>
  )
}

export default Card;
