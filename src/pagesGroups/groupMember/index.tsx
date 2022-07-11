import store from '@/store'
import { Image, View } from '@tarojs/components'
import { useDidShow, setNavigationBarTitle } from '@tarojs/taro'
import { FC, Fragment, useState } from 'react'

import Button from '@/components/Button';
import Card from '@/components/Card';
import Footer from '@/components/Footer';

import { navigateBack } from '@/utils/navigator';

import { IndexList, Checkbox } from '@taroify/core';
import "@taroify/core/index-list/style"
import "@taroify/core/checkbox/style"

import './index.less'

const data = [
  { 
    index: 'a',
    children: [
      { 
        id: 'a1',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      }
    ]
  },
  { 
    index: 'b',
    children: [
      { 
        id: 'b1',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      }
    ]
  },
  { 
    index: 'c',
    children: [
      { 
        id: 'c1',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      }
    ]
  },
  { 
    index: 'd',
    children: [
      { 
        id: 'd1',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      },
      { 
        id: 'd2',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      },
      { 
        id: 'd3',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      },
      { 
        id: 'd4',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      },
      { 
        id: 'd5',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      },
      { 
        id: 'd6',
        name: '安子',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      },
    ]
  },
  {
    index: 'z',
    children: [
      {
        id: '1',
        name: '周建',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      },
      {
        id: '2',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
        name: '周建2',
      },
      {
        id: '3',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
        name: '周建3',
      },
    ]
  }
]

const GroupMemberPage: FC = () => {
  const [type, setType] = useState('elder')
  const [fixed, setFixed] = useState<Set<string>>(new Set())
  useDidShow(() => {
    const groupConfig = store.get('group')
    setNavigationBarTitle({ title: groupConfig.type === 'elder' ? '选择观护老人' : '选择志愿者' })

    setType(groupConfig.type)
    setFixed(new Set(groupConfig.list.map(item => item.id)))
    store.set('group', 'list', []) // 阅后即焚
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

  const handleConfirm = () => {
    store.set('group', 'type', type)
    const list = [...fixed, ...selected].map(str => data.flatMap(dataItem => dataItem.children).find(child => child.id === str))
    store.set('group', 'list', list)
    navigateBack();
  }

  return (
    <View className='group-member-page'>
      <Card>
        <IndexList>
          {data.map(item => (
            <Fragment key={item.index}>
              <IndexList.Anchor index={item.index} />
              <View className='member-group'>
                {
                  item.children.map(child => (
                    <View key={child.id} className={`member-item ${fixed.has(child.id) ? 'member-item-fix' : ''}`}>
                      <Checkbox onClick={() => handleClick(child.id)} size={20} className='member-item-checkbox' checked={fixed.has(child.id) || selected.has(child.id)} />
                      <Image className='member-item-avatar' src={child.avatar} />
                      <View className='member-item-name'>{child.name}</View>
                    </View>
                  ))
                }
              </View>
            </Fragment>
          ))}
        </IndexList>
      </Card>
      <Footer className='two-buttons-group'>
        <Button onClick={() => navigateBack()}>取消</Button>
        <Button onClick={() => handleConfirm()} type='primary'>确认</Button>
      </Footer>
    </View>
  )
}

export default GroupMemberPage
