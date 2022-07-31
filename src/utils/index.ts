import { getCurrentPages } from "@tarojs/taro"

export const delay = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}

export const getCurrentRoute = () => {
  const pages = getCurrentPages()
  if (!pages) { return null }
  return pages[pages.length - 1]?.route || null
}