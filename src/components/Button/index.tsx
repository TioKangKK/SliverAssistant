import { Button as TaroButton } from '@tarojs/components';
import { CSSProperties, FC } from 'react';

import './index.less';

type Props = {
  onClick?: (e) => void;
  type?: 'primary' | 'default';
  className?: string;
  style?: string | CSSProperties;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  onClick = () => {},
  type = 'default',
  className = '',
  style,
  children,
  disabled
}) => {
  return (
    <TaroButton disabled={disabled} style={style} className={`button button-${type} ${className}`} onClick={onClick}>
      {children}
    </TaroButton>
  )
}

export default Button