import { Image, View } from '@tarojs/components'
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

import { delay } from '@/utils';
import { showToast } from '@/utils/toast';

import './index.less'

const getList = async (type: GroupMemberType) => {
  if (type === GroupMemberType.VOLUNTEER) {
    const list = await getVolunteerList({ source_from: 'group' })
    return list.map(item => ({ id: item.id, name: item.name }))
  } else {
    const { list } = await getDocumentList({ params: { group_id: -1 } })
    return list.filter(item => item.status === DocumentStatus.APPROVED).map(item => ({ id: item.id, name: item.name, image: item.individual_info.photo_uris?.[0] }))
  }
}

const GroupMemberPage: FC = () => {
  const { params } = useRouter<Required<{ id: string; type: string }>>(); // 路由上的参数
  const type = +params.type
  const [fixed, setFixed] = useState<Array<number>>([])

  const [data, setData] = useState<{ id: number, name: string, image?: string; }[]>([])
  
  useDidShow(async () => {
    setNavigationBarTitle({ title: type === GroupMemberType.ELDER ? '选择观护老人' : '选择志愿者' })

    const groupInfo: Group = await getGroupInfo({ id: params.id })

    setFixed((type === GroupMemberType.ELDER ? groupInfo.docs : groupInfo.volunteers).map(item => item.id))
    
    setData(await getList(type))
  })
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const handleClick = (id: number) => {
    console.log(fixed, id);
    if (fixed.includes(id)) { return }
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
        member_id: Number(member_id),
        member_type: type
      })
    }
    showToast('添加成功');
    await delay(1000);
    navigateBack();
  }

  return (
    <View className='group-member-page'>
      <Card>
        {data.map(item => (
          <View onClick={() => handleClick(item.id)} key={item.id} className={`member-item ${fixed.includes(item.id) ? 'member-item-fix' : ''}`}>
            <Checkbox value={fixed.includes(item.id) || selected.has(item.id)} />
            <View className='member-item-content'>
              {item.image && <Image className='member-item-left' src={item.image} /> }
              <View className='member-item-right'>
                <View className='member-item-name'>{item.name}</View>
              </View>
            </View>
          </View>
        ))}
        {data.length === 0 && (
          <EmptyBox>
            { type === GroupMemberType.VOLUNTEER ? '暂无未分组的志愿者，请先添加志愿者' : '暂无未分组的老人，请先添加老人档案' }
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
