import Split from '@/components/Split'
import { Image, View } from '@tarojs/components'
import { useDidShow, showModal, useRouter } from '@tarojs/taro'
import { FC, useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'

import IconAdd from '@/assets/add.svg'

import { navigateBack, navigateTo } from '@/utils/navigator'
import { deleteGroup, deleteGroupMember, getGroupInfo } from '@/service'
import { delay } from '@/utils'
import { Group, GroupMemberType } from '@/service/types'
import { showToast } from '@/utils/toast'

import './index.less'


const GroupMemberForm: FC<{
  list: Group['member'],
  title: string,
  onAdd: () => void,
  onDelete: (id: string) => void,
}> = ({ list, title, onAdd, onDelete }) => {
  return (
    <Card className='group-member-form'>
      <View className='group-member-form-header'>
        <View className='group-member-form-header-left'>{title}</View>
        <View onClick={() => onAdd()} className='group-member-form-header-right'>
          <Image className='icon-add' src={IconAdd} />
          <View>添加</View>
        </View>
      </View>
      <Split />
      <View className='group-member-form-content'>
        {list.length ? (
          list.map(item => (
            <View key={item.member_id} className='group-member-form-item'>
              <View className='group-member-form-item-left'>
                <View className='group-member-form-item-name'>{item.member_name}</View>
              </View>
              <View onClick={() => onDelete('' + item.member_id)} className='group-member-form-item-btn'>
                删除
              </View>
            </View>
          ))
        ) : (
          <View className='group-member-form-content-empty'>暂未添加{title}</View>
        )}
      </View>
    </Card>
  )
}

const GroupFormPage: FC = () => {
  const { params } = useRouter<Required<{ id: string }>>(); // 路由上的参数

  const [volunteerList, setVolunteerList] = useState<Group['member']>([])
  const [elderList, setElderList] = useState<Group['member']>([])

  const initGroup = async () => {
    const groupInfo: Group = await getGroupInfo({ id: params.id })
    // 操作一波，setVolunteerList, setElderList
    setVolunteerList(groupInfo?.member?.filter(item => item.member_type === GroupMemberType.VOLUNTEER) || [])
    setElderList(groupInfo?.member?.filter(item => item.member_type === GroupMemberType.ELDER) || [])
  }

  useDidShow(() => {
    initGroup()
  })

  const onAdd = (type: GroupMemberType) => {
    navigateTo(`/pagesGroups/groupMember/index?id=${params.id}&type=${type}`)
  }

  const onDelete = async (type: GroupMemberType, id: string) => {
    const modalRes = await showModal({ title: '确认删除', content: '仅从分组删除，如有需要，可重新添加' })
    if (modalRes.cancel) { return }
    const res = await deleteGroupMember({
      id: params.id,
      member_id: id,
      member_type: type
    })
    if (res) {
      showToast('删除成员成功')
      await initGroup();
    } else {
      showToast('删除成员失败')
    }
  }

  const handleDelete = () => {
    showModal({
      title: '确定要删除分组吗？',
      success: async ({ confirm }) => {
        if (confirm) {
          deleteGroup({ id: params.id })
          await delay(1000)
          navigateBack()
        }
      }
    })
  }
  return (
    <View className='group-form'>
      <GroupMemberForm
        title='志愿者'
        list={volunteerList}
        onAdd={() => onAdd(GroupMemberType.VOLUNTEER)}
        onDelete={(id) => onDelete(GroupMemberType.VOLUNTEER, id)}
      />
      <GroupMemberForm
        title='观护老人'
        list={elderList}
        onAdd={() => onAdd(GroupMemberType.ELDER)}
        onDelete={(id) => onDelete(GroupMemberType.ELDER, id)}
      />
      {
        params.id && (
          <Footer>
            <Button onClick={() => handleDelete()}>删除</Button>
          </Footer>
        )
      }
    </View>
  )
}

export default GroupFormPage
