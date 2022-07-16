import { CSSProperties, FC } from 'react';
import { Button as TaroButton, ButtonProps } from '@tarojs/components';

import './index.less';

type Props = {
  onClick?: (e) => void;
  onGetPhoneNumber?: (e) => void;
  onGetUserInfo?: (e) => void,
  type?: 'primary' | 'default';
  className?: string;
  style?: string | CSSProperties;
  disabled?: boolean;
  openType?: ButtonProps.OpenType;
}

const Button: FC<Props> = ({
  onClick = () => {},
  onGetPhoneNumber = () => {},
  onGetUserInfo = () => {},
  type = 'default',
  className = '',
  style,
  children,
  disabled,
  openType,
}) => {
  return (
    <TaroButton onGetUserInfo={onGetUserInfo} onGetPhoneNumber={onGetPhoneNumber} openType={openType} disabled={disabled} style={style} className={`button button-${type} ${className}`} onClick={onClick}>
      {children}
    </TaroButton>
  )
}

export default Button