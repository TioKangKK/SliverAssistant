import { Role } from '@/constants/user'
import store from '@/store'
import { delay, getCurrentRoute } from '@/utils'
import { redirectTo } from '@/utils/navigator'
import { showToast } from '@/utils/toast'
import Taro from '@tarojs/taro'
import { AuditStatus, Community, DashboardItems, DocumentOperate, NoticeItem, TDocument, Volunteer, WatchOverDetail, WatchOverListItem } from './types'

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

export const uploadFile = async ({ type, path }: { type: 'image', path: string }) => {
  await client.init();
  const fileName = path.split('/')[path.split('/').length - 1];
  const res = await client.uploadFile({
    cloudPath: `${type}/${fileName}`,
    filePath: path
  })
  return res
}

const call = async ({
  path, method = 'POST', data = {}, header = {}
}: {
  path: string,
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
  data?: { [x: string]: any }
  header?: { [x: string]: any }
}) => {
  await client.init()
  const res = await client.callContainer({
    path, method, header: {
      'X-WX-SERVICE': 'golang-88fq',
      'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
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
export const login = async ({ cloudId }: { cloudId: string }) => {
  const loginInfo = await call({ 
    path: `${prefix}/login/wx/`,
    data: { cloud_id: cloudId }
  })
  if (loginInfo === null) { return }
  const cookie = loginInfo.header['set-cookie']
  cookie && setCookie(cookie)
  const redirectPage = loginInfo.data.data.redirect_page
  if (redirectPage === 'dashboard') {
    // setPhone(cloudId)
    const curRoute = getCurrentRoute()
    if (curRoute && !['pagesPersonal/login/index'].includes(curRoute)) {
      return;
    }
  } else if (redirectPage === undefined) {
    const curRoute = getCurrentRoute()
    if (curRoute && ['pagesPersonal/login/index'].includes(curRoute)) {
      return;
    } 
  }
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

export const getNoticeList = async ({ offset, limit }) => {
  const res = await call({
    path: `${prefix}/notice/list/`,
    method: 'GET',
    data: { offset, limit },
  })
  console.log(res?.data.data)
  return { 
    list: (res?.data.data.item_list || []).map(item => ({
      ...item, detail: JSON.parse(item.detail)
    })) as NoticeItem[],
    total: res?.data.data.total || 0
  };
}

export const audit = async ({ id, status }: { id: string, status: AuditStatus }) => {
  const res = await call({
    path: `${prefix}/user/audit/`,
    data: { id, status }
  })
  return res?.data
}

export const getDocumentList = async ({ params }: { params: {[x: string]: any} }) => {
  const res = await call({
    path: `${prefix}/doc/`,
    method: 'GET',
    data: params,
  })
  return {
    list: (res?.data.data?.list || []) as TDocument[],
    total: res?.data.data?.total || 0,
  }
}

export const getDocument = async ({ id }: { id: number | string }) => {
  const res = await call({
    path: `${prefix}/doc/${id}/`,
    method: 'GET',
  })
  return res?.data.data as (TDocument | undefined)
}

export const createDocument = async (params) => {
  const res = await call({
    path: `${prefix}/doc/`,
    data: params,
    header: {
      'Content-Type': 'application/json',
    }
  })
  return res?.data.data as (TDocument | undefined)
}

export const editDocument = async (params) => {
  const res = await call({
    path: `${prefix}/doc/${params.id}/`,
    method: 'PUT',
    data: params,
    header: {
      'Content-Type': 'application/json',
    }
  })
  return res?.data.data as (TDocument | undefined)
}

export const exportDocument = async (params) => {
  const res = await call({
    path: `${prefix}/doc/${params.id}/export/`,
    method: 'GET',
    header: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
  })
  console.log(res?.data)
  return res?.data
}

export const operateDocument = async ({ id, op }: { id: number; op: DocumentOperate }) => {
  const res = await call({
    path: `${prefix}/doc/${id}/op`,
    method: 'PUT',
    data: { op },
    header: {
      'Content-Type': 'application/json',
    }
  })
  return res?.data
}

export const getGroupList = async ({ offset, limit }: {offset: number, limit: number}) => {
  const res = await call({
    path: `${prefix}/group_info/`,
    method: 'GET',
    data: { offset, limit },
  })
  return {
    list: res?.data.data?.list || [],
    total: res?.data.data.total || 0,
  }
}

export const getGroupInfo = async ({ id }) => {
  const res = await call({
    path: `${prefix}/group_info/${id}/`,
    method: 'GET',
  })
  return res?.data.data
}

export const createGroup = async () => {
  const res = await call({
    path: `${prefix}/group_info/`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    }
  })
  return res?.data.data
}

export const deleteGroup = async ({ id }) => {
  const res = await call({
    path: `${prefix}/group_info/${id}`,
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
    }
  })
  return res?.data.data
}

export const addGroupMember = async ({ id, member_id, member_type }) => {
  const res = await call({
    path: `${prefix}/group_info/${id}/add`,
    method: 'PUT',
    data: {
      member_id,
      member_type,
    },
    header: {
      'Content-Type': 'application/json',
    }
  })
  return res?.data.data
}

export const deleteGroupMember = async ({ id, member_id, member_type }) => {
  const res = await call({
    path: `${prefix}/group_info/${id}/remove`,
    method: 'PUT',
    data: {
      member_id,
      member_type,
    },
    header: {
      'Content-Type': 'application/json',
    }
  })
  return res?.data.data
}

export const createWatchOver = async (params) => {
  const res = await call({
    path: `${prefix}/care_record/create`,
    method: 'POST',
    data: params,
    header: {
      'Content-Type': 'application/json',
    }
  })
  console.log('KTH: a', res?.data);
  return res?.data.data?.care_id as number | undefined
}

export const updateWatchOver = async (params) => {
  const res = await call({
    path: `${prefix}/care_record/update`,
    method: 'POST',
    data: params,
    header: {
      'Content-Type': 'application/json',
    }
  })
  console.log('KTH: a', res?.data);
  return res?.data.data
}

export const getWatchOverList = async (params: {
  id?: string| number; // 老人详情中使用
  count: number;
  offset: number;
  query_time?: number;
}) => {
  const res = await call({
    path: `${prefix}/care_record/list`,
    method: 'GET',
    data: params,
  })
  console.log('KTH: a', res?.data);
  return {
    list: (res?.data.data?.list || []) as WatchOverListItem[],
    total: res?.data.data.total || 0,
  }
}

export const getWatchOverDetail = async (id: string | number): Promise<WatchOverDetail | undefined> => {
  const res = await call({
    path: `${prefix}/care_record/list`,
    method: 'GET',
    data: { id },
  })
  console.log('KTH: a', res?.data);
  return res?.data.data?.care_info
}