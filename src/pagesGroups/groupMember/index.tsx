import { View } from '@tarojs/components'
import { useDidShow, setNavigationBarTitle, useRouter } from '@tarojs/taro'
import { FC, useState } from 'react'

import Button from '@/components/Button';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Checkbox from '@/components/Checkbox';
import EmptyBox from '@/components/EmptyBox';

import { navigateBack } from '@/utils/navigator';

import "@taroify/core/index-list/style"

import { DocumentStatus, Group, GroupMemberType } from '@/service/types';
import { addGroupMember, getDocumentList, getGroupInfo, getVolunteerList } from '@/service';

import './index.less'

const getList = async (type: GroupMemberType) => {
  if (type === GroupMemberType.VOLUNTEER) {
    const list = await getVolunteerList()
    return list.map(item => ({ id: '' + item.id, name: item.name }))
  } else {
    const list = await getDocumentList({ params: {} })
    return list.filter(item => item.status === DocumentStatus.APPROVED).map(item => ({ id: '' + item.id, name: item.name }))
  }
}

const GroupMemberPage: FC = () => {
  const { params } = useRouter<Required<{ id: string; type: string }>>(); // 路由上的参数
  const type = +params.type
  const [fixed, setFixed] = useState<Set<string>>(new Set())

  const [data, setData] = useState<{ id: string, name: string }[]>([])
  
  useDidShow(async () => {
    setNavigationBarTitle({ title: type === GroupMemberType.ELDER ? '选择观护老人' : '选择志愿者' })

    const groupInfo: Group = await getGroupInfo({ id: params.id })

    setFixed(new Set(
      (groupInfo?.member
        ?.filter(item => item.member_type === type)
        .map(item => item.member_name)
      || [])
    ))
    
    setData(await getList(type))
  })
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const handleClick = (id: string) => {
    if (fixed.has(id)) { return }
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id)
    }
    setSelected(new Set(selected))
  }

  const handleConfirm = async () => {
    for (const member_id of selected) {
      await addGroupMember({
        id: params.id,
        member_id,
        member_type: type
      })
    }
    navigateBack();
  }

  return (
    <View className='group-member-page'>
      <Card>
        {data.map(item => (
          <View key={item.id} className={`member-item ${fixed.has(item.id) ? 'member-item-fix' : ''}`}>
            <Checkbox onChange={() => handleClick(item.id)} value={fixed.has(item.id) || selected.has(item.id)} />
            <View className='member-item-name'>{item.name}</View>
          </View>
        ))}
        {data.length === 0 && (
          <EmptyBox>
            { type === GroupMemberType.VOLUNTEER ? '请先添加志愿者' : '请先添加老人档案' }
          </EmptyBox>
        )}
      </Card>
      {data.length > 0 && <Footer className='two-buttons-group'>
        <Button onClick={() => navigateBack()}>取消</Button>
        <Button onClick={() => handleConfirm()} type='primary'>确认</Button>
      </Footer>}
    </View>
  )
}

export default GroupMemberPage
