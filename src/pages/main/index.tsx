import { CSSProperties, FC, useEffect, useMemo, useState } from 'react'
import { useDidShow } from '@tarojs/taro'

import { buttonStyleToType } from '@/constants/user'

import Button from "@/components/Button"
import Card from "@/components/Card"
import PageWithoutTopBar from "@/components/PageWithoutTopBar"

import DefaultAvatar from '@/assets/default_avatar.svg'

import { navigateTo } from '@/utils/navigator'

import { getDashboard } from '@/service'
import { DashboardItems, DashboardItemType } from '@/service/types'

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

const MainPage: FC = () => {
  const [dashboard, setDashboard] = useState<DashboardItems>([])

  useDidShow(async () => {
    const dashboardRes = await getDashboard()
    console.log('dashboard', dashboardRes)
    setDashboard(dashboardRes)
  })

  const userProfile = useMemo(() => {
    const basicConfig = dashboard.find(item => item.item_type === DashboardItemType.Basic)
    const userInfo = basicConfig?.item_info.user_info
    if (!userInfo) { return null }
    return {
      name: userInfo.name,
      phone: userInfo.phone,
    }
  }, [dashboard])

  const volunteerAndElder = useMemo(() => {
    const basicConfig = dashboard.find(item => item.item_type === DashboardItemType.Basic)
    const countList = basicConfig?.item_info.count_list
    if (!countList) { return null }
    return countList.length === 1 ? {
        elder: countList[0].num,
      } : {
        elder: countList[1].num,
        volunteer:  countList[0].num,
      }
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
      onClick: () => navigateTo(btnIdToPath[index + 1])
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
        {volunteerAndElder && (
          volunteerAndElder.volunteer
            ? <VolunteerAndElder count={{ elder: volunteerAndElder.elder, volunteer: volunteerAndElder.volunteer }} />
            : <MyElder count={volunteerAndElder.elder} />
        )}
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