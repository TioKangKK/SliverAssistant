import { FC } from 'react'

import Button from "@/components/Button"
import Card from "@/components/Card"
import PageWithoutTopBar from "@/components/PageWithoutTopBar"

import DefaultAvatar from '@/assets/default_avatar.svg'

import { navigateTo } from '@/utils/navigator'

import VolunteerAndElder from './components/VolunteerAndElder'
import UserProfile from './components/UserProfile'
import NotificationEntry from './components/NotificationEntry'
import ElderEntry from './components/ElderEntry'
import CardsEntry from './components/CardsEntry'
import DocDownloadEntry from './components/DocDownloadEntry'
import MyElder from './components/MyElder'

import './index.less';

enum Role { Volunteer, SuperManager, SocialWorker }

const MainPage: FC = () => {
  const userProfile = {
    name: '小康',
    phone: '12333474485',
    avatar: DefaultAvatar,
  }

  const role = Role.SuperManager as Role;
  const isVolunteer = role === Role.Volunteer;
  const isSuperManager = role === Role.SuperManager;

  return (
    <PageWithoutTopBar title='益助银龄'>
      <Card>
        <UserProfile {...userProfile}  />
        {isVolunteer
          ? <MyElder count={10} />
          : <>
              <VolunteerAndElder count={{ elder: 100, volunteer: 200 }} />
              {isSuperManager && <Button onClick={() => { navigateTo('/pagesPersonal/addSocialWorker/index') }}>添加社工</Button> }
              <Button style={{ marginTop: '6px' }} type='primary' onClick={() => {}}>志愿者分组管理</Button>
            </>
        }
      </Card>
      {!isVolunteer && <NotificationEntry count={3} />}
      <ElderEntry />
      <CardsEntry />
      {isSuperManager && <DocDownloadEntry />}
    </PageWithoutTopBar>
  )
}

export default MainPage