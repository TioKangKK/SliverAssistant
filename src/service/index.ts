import { Role } from '@/constants/user'
import store from '@/store'
import { delay } from '@/utils'
import { redirectTo } from '@/utils/navigator'
import { showToast } from '@/utils/toast'
import Taro from '@tarojs/taro'
import { AuditStatus, Community, DashboardItems, Volunteer } from './types'

const KeyForPhone = 'phone'
export const getPhone = () => Taro.getStorageSync(KeyForPhone)
export const setPhone = (phone) => Taro.setStorageSync(KeyForPhone, phone)
const KeyForCookie = 'cookie'
export const getCookie = () => Taro.getStorageSync(KeyForCookie)
export const setCookie = (cookie) => Taro.setStorageSync(KeyForCookie, cookie)

const prefix = '/silver_assistant'

const client = new Taro.cloud.Cloud({
  resourceAppid: 'wx5658dc9fb87f15d8', // 环境所属的账号appid
  resourceEnv: 'prod-1g6fwfvt19a68410', // 微信云托管的环境ID
})

const call = async ({
  path, method = 'POST', data = {}, header = {}
}: {
  path: string,
  method?: 'POST' | 'GET',
  data?: { [x: string]: any }
  header?: { [x: string]: any }
}) => {
  await client.init()
  const res = await client.callContainer({
    path, method, header: {
      'X-WX-SERVICE': 'golang-88fq',
      'Content-Type': method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
      'Cookie': getCookie(),
      ...header
    }, data
  })
  if (res.data.code === -1) {
    showToast(res.data.msg)
    await delay(1000)
    redirectTo('/pagesPersonal/login/index')
    return null
  }
  return res
}

const pageMap = {
  register: '/pagesPersonal/register/index',
  dashboard: '/pages/main/index',
  pending_approve: '/pagesPersonal/registerResult/index',
}
export const login = async ({ phone }) => {
  const loginInfo = await call({ 
    path: `${prefix}/login/wx/`,
    data: { phone }
  })
  if (loginInfo === null) { return }
  const cookie = loginInfo.header['set-cookie']
  cookie && setCookie(cookie)
  const redirectPage = loginInfo.data.data.redirect_page
  console.log('login redirectPage', redirectPage)
  redirectTo(pageMap[redirectPage] || '/pagesPersonal/login/index')
}

export const register = async (data: {[x: string]: any}) => {
  const res = await call({
    path: `${prefix}/user/register/`,
    data: {
      role: Role.Volunteer,
      ...data
    }
  })
  return res?.data
}

export const createSocialWorker = async (data: {[x: string]: any}) => {
  const res = await call({
    path: `${prefix}/user/create/`,
    data: {
      role: Role.SocialWorker,
      ...data
    }
  })
  return res?.data
}

export const getCommunityList = async (): Promise<Community[]> => {
  if (store.get('community', 'initialized')) {
    return store.get('community', 'list')
  }
  const res = await call({
    path: `${prefix}/user/community_list/`,
    method: 'GET',
  })
  const list = res?.data.data.item_list || []
  store.set('community', 'list', list)
  store.set('community', 'initialized', !!res)
  return list
}

export const getDashboard = async () => {
  const res = await call({
    path: `${prefix}/board/dashboard/`,
    method: 'GET'
  })
  return (res?.data.data.item_list || []) as DashboardItems
}

export const getVolunteerList = async () => {
  const res = await call({
    path: `${prefix}/user/list/`,
    method: 'GET'
  })
  return (res?.data.data.item_list || []) as Volunteer[]
}

export const getUserDetail = async ({ id }: { id: string }) => {
  const res = await call({
    path: `${prefix}/user/detail/`,
    method: 'GET',
    data: { id },
  })
  return (res?.data.data.user_info || {}) as {[x: string]: any}
}

export const audit = async ({ id, status }: { id: string, status: AuditStatus }) => {
  const res = await call({
    path: `${prefix}/user/audit/`,
    data: { id, status }
  })
  return res?.data
}