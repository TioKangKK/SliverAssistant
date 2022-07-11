import Split from '@/components/Split'
import { Image, View } from '@tarojs/components'
import { useDidShow, showModal, useRouter } from '@tarojs/taro'
import { FC, useState } from 'react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'

import IconAdd from '@/assets/add.svg'

import store from '@/store'
import { navigateTo } from '@/utils/navigator'

import './index.less'

const GroupMemberForm: FC<{
  list: { id: string; name: string; avatar: string; }[],
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
            <View key={item.id} className='group-member-form-item'>
              <View className='group-member-form-item-left'>
                <Image className='group-member-form-item-avatar' src={item.avatar} />
                <View className='group-member-form-item-name'>{item.name}</View>
              </View>
              <View onClick={() => onDelete(item.id)} className='group-member-form-item-btn'>
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
  console.log(params.id)
  
  const [volunteerList, setVolunteerList] = useState([
    {
      id: '1',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      name: '周建',
    },
    {
      id: '2',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      name: '周建2',
    },
  ])
  const [elderList, setElderList] = useState([
    {
      id: '2',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      name: '李春',
    }
  ])

  useDidShow(() => {
    const groupConfig = store.get('group')
    if (groupConfig.list.length === 0) { return }
    const setList = groupConfig.type === 'elder' ? setElderList : setVolunteerList
    setList(groupConfig.list)
    store.set('group', 'list', [])
  })

  const onAdd = (type: 'elder' | 'volunteer') => {
    store.set('group', 'type', type)
    store.set('group', 'list', type === 'elder' ? elderList : volunteerList)
    navigateTo('/pagesGroups/groupMember/index')
  }

  const onDelete = async (type: 'elder' | 'volunteer', id: string) => {
    const res = await showModal({ title: '确认删除', content: '仅从分组删除，如有需要，可重新添加' })
    if (res.cancel) { return }
    const list = type === 'elder' ? elderList : volunteerList
    const setList = type === 'elder' ? setElderList : setVolunteerList
    const index = list.findIndex(item => item.id === id)
    setList([...volunteerList.slice(0, index), ...volunteerList.slice(index + 1)])
  }
  const handleConfirm = () => {
    console.log('do it')
  }
  const handleDelete = () => {
    console.log('delete')
  }
  return (
    <View className='group-form'>
      <GroupMemberForm
        title='志愿者'
        list={volunteerList}
        onAdd={() => onAdd('volunteer')}
        onDelete={(id) => onDelete('volunteer', id)}
      />
      <GroupMemberForm
        title='观护老人'
        list={elderList}
        onAdd={() => onAdd('elder')}
        onDelete={(id) => onDelete('elder', id)}
      />
      <Footer className={`${params.id ? 'two-buttons-group' : ''}`}>
        {params.id && <Button onClick={() => handleDelete()}>删除</Button>}
        <Button onClick={() => handleConfirm()} type='primary' disabled={!volunteerList.length || ! elderList.length}>确定</Button>
      </Footer>
    </View>
  )
}

export default GroupFormPage
