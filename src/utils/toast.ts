import { 
  showToast as taroShowToast,
  hideToast as taroHideToast,
} from '@tarojs/taro';

export const showToast = (title: string) => {
  taroShowToast({ title, icon: 'none' })
}

export const hideToast = () => taroHideToast();