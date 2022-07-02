import { 
  navigateTo as taroNavigateTo,
  navigateBack as taroNavigateBack,
  redirectTo as taroRedirectTo,
} from '@tarojs/taro';

export const navigateTo = (url: string) => {
  taroNavigateTo({ url })
}

export const navigateBack = taroNavigateBack

export const redirectTo = (url: string) => {
  taroRedirectTo({ url })
}