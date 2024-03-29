import { CSSProperties, FC, useEffect, useMemo, useState } from 'react'
import { useDidShow } from '@tarojs/taro'

import { buttonStyleToType, roleToName } from '@/constants/user'
import { orgList } from '@/constants/org'

import Button from "@/components/Button"
import Card from "@/components/Card"
import PageWithoutTopBar from "@/components/PageWithoutTopBar"

import { navigateTo } from '@/utils/navigator'

import { getDashboard } from '@/service'
import { DashboardItems, DashboardItemType } from '@/service/types'
import userInfoStore from '@/store/userInfo'

import VolunteerAndElder from './components/VolunteerAndElder'
import UserProfile from './components/UserProfile'
import NotificationEntry from './components/NotificationEntry'
import ElderEntry from './components/ElderEntry'
import CardsEntry from './components/CardsEntry'
import DocDownloadEntry from './components/DocDownloadEntry'
import MyElder from './components/MyElder'

import './index.less';

const btnIdToPath = {
  1: '/pagesPersonal/addSocialWorker/index',
  2: '/pagesGroups/groupList/index',
}

const updateUserInfo = (dashboard: DashboardItems) => {
  const basicConfig = dashboard.find(item => item.item_type === DashboardItemType.Basic)
  const userInfo = basicConfig?.item_info.user_info
  if (!userInfo) { return }
  userInfoStore.set(userInfo)
}

const MainPage: FC = () => {
  const [dashboard, setDashboard] = useState<DashboardItems>([])

  useDidShow(async () => {
    const dashboardRes = await getDashboard()
    console.log('dashboard', dashboardRes)

    setDashboard(dashboardRes)
    updateUserInfo(dashboardRes)
  })

  const userProfile = useMemo(() => {
    const basicConfig = dashboard.find(item => item.item_type === DashboardItemType.Basic)
    const userInfo = basicConfig?.item_info.user_info
    if (!userInfo) { return null }
    return {
      name: userInfo.name,
      phone: userInfo.phone,
      image: userInfo.avatar,
      org: orgList.find(item => item.id === userInfo.org_id)?.name || '-',
      role: roleToName[userInfo.role] || '-',
      userId: userInfo.id,
    }
  }, [dashboard])

  const volunteerAndElder = useMemo(() => {
    const basicConfig = dashboard.find(item => item.item_type === DashboardItemType.Basic)
    const countList = basicConfig?.item_info.count_list
    if (!countList) { return null }
    return {
      elder: countList[1]?.num,
      volunteer:  countList[0]?.num,
    }
  }, [dashboard])

  const myElder = useMemo(() => {
    const basicConfig = dashboard.find(item => item.item_type === DashboardItemType.Basic)
    const barList = basicConfig?.item_info.bar_list
    if (!barList) { return null }
    return barList?.[0].name || '-'
  }, [dashboard])

  const basicButtons = useMemo(() => {
    const basicConfig = dashboard.find(item => item.item_type === DashboardItemType.Basic)
    const buttonList = basicConfig?.item_info.button_list
    if (!buttonList) { return [] }
    return buttonList.map((btn, index) => ({
      id: index + 1,
      style: index > 0 ? { marginTop: '6px' } : {},
      type: buttonStyleToType[btn.style],
      name: btn.name,
      onClick: () => navigateTo(btnIdToPath[btn.click_type])
    })) as { id: number | string, style: CSSProperties, type: 'primary' | 'default' | undefined, name: string, onClick: () => void }[]
  }, [dashboard])

  const notificationProps = useMemo(() => {
    const notificationConfig = dashboard.find(item => item.item_type === DashboardItemType.Notification)
    return notificationConfig ? {
      title: notificationConfig.item_info.name,
      msg: notificationConfig.item_info.open_name,
    } : null
  }, [dashboard])

  const searchProps = useMemo(() => {
    const searchConfig = dashboard.find(item => item.item_type === DashboardItemType.Search)
    return searchConfig ? { title: searchConfig.item_info.desc } : null
  }, [dashboard])

  const showCards = useMemo(() => {
    const cardsConfig = dashboard.find(item => item.item_type === DashboardItemType.Cards)
    return !!cardsConfig?.item_info.card_list
  }, [dashboard])

  const downloadProps = useMemo(() => {
    const downloadConfig = dashboard.find(item => item.item_type === DashboardItemType.Download)
    return downloadConfig ? {
      name: downloadConfig.item_info.name,
      desc: downloadConfig.item_info.desc,
      btnName: downloadConfig.item_info.open_name,
    } : null
  }, [dashboard])

  return (
    <PageWithoutTopBar title='益助银龄'>
      <Card>
        {userProfile && <UserProfile {...userProfile} />}
        {volunteerAndElder && <VolunteerAndElder count={{ elder: volunteerAndElder.elder, volunteer: volunteerAndElder.volunteer }} />}
        {myElder && <MyElder text={myElder} />}
        {basicButtons.map(btn => <Button key={btn.id} style={btn.style} onClick={btn.onClick} type={btn.type}>{btn.name}</Button>)}
      </Card>
      {notificationProps && <NotificationEntry {...notificationProps} />}
      {searchProps && <ElderEntry {...searchProps} /> }
      {showCards && <CardsEntry />}
      {downloadProps && <DocDownloadEntry {...downloadProps} />}
    </PageWithoutTopBar>
  )
}

export default MainPage