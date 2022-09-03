import { Image, ScrollView, View } from '@tarojs/components'
import { FC, useMemo, useState } from 'react'
import { useDidShow } from '@tarojs/taro'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Split from '@/components/Split'
import Footer from '@/components/Footer'

import { navigateTo } from '@/utils/navigator'

import IconEmpty from '@/assets/empty.svg'
import IconArrowRight from '@/assets/arrow_right.svg'

import { createGroup, getGroupList } from '@/service'
import { Group } from '@/service/types'
import { showToast } from '@/utils/toast'

import './index.less'

const GroupListPage: FC = () => {
  const handleGoToForm = (id?: string | number) => navigateTo(`/pagesGroups/groupForm/index${id ? '?id=' + id : ''}`)

  const [list, setList] = useState<Group[]>([])
  
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  })
  const [loading, setLoading] = useState(false)
  const hasMore = useMemo(() => pagination.current * pagination.pageSize < pagination.total, [pagination])

  const getList = async (current = pagination.current) => {
    if (loading) { return; }
    setLoading(true)
    try {
      const offset = (current - 1) * pagination.pageSize
      const { list: groupList, total } = await getGroupList({ offset, limit: pagination.pageSize });
      setList(pre => [...pre, ...groupList])
      setPagination(pre => ({ ...pre, current, total }))
    } finally {
      setLoading(false)
    }
  }

  const handleScrollToLower = () => {
    if (loading) { return; }
    if (!hasMore) { return; }
    getList(pagination.current + 1)
  }
  
  useDidShow(() => getList(1))

  const handleCreate = async () => {
    const res = await createGroup()
    console.log(res)
    if (res?.group_id) {
      handleGoToForm(res.group_id)
    } else {
      showToast('创建失败')
    }
  }

  return (
    <View className='group-list'>
      {list.length 
        ? (
          <ScrollView className='group-list-scroll' scrollY onScrollToLower={handleScrollToLower}>
            {
              list.map(item => (
                <Card key={item.id} className='group-card'>
                  <View className='group-card-header'>
                    <View className='group-card-header-left'>{item.name}</View>
                    <View onClick={() => handleGoToForm(item.id)} className='group-card-header-right'>
                      管理<Image src={IconArrowRight} className='icon-arrow-right' />
                    </View>
                  </View>
                  <Split style={{ marginTop: '10px' }} />
                  <View className='group-card-content'>
                    <View className='group-card-content-item'>志愿者{item.volunteers.length}人{item.volunteers.length > 0 && ':'} {item.volunteers.map(v => v.name).join(',')}</View>
                    <View className='group-card-content-item'>老人{item.docs.length}人{item.docs.length > 0 && ':'} {item.docs.map(d => d.name).join(',')}</View>
                  </View>
                </Card>
              ))
            }
            <View className='group-list-scroll-footer'>
              {loading ? '正在加载~' : hasMore ? '下滑加载更多' : '没有更多了~'}
            </View>
          </ScrollView>
        ) : (
          <View className='group-list-empty'>
            <View className='group-list-empty-wrapper'>
              <Image className='group-list-empty-icon' src={IconEmpty} />
              <View className='group-list-empty-text'>暂未分组</View>
            </View>  
            <Button className='group-list-empty-btn' type='primary' onClick={() => navigateTo('/pagesGroups/groupForm/index')}>立即创建</Button>
          </View>
        )
      }
      {Boolean(list.length) && (
        <Footer>
          <Button onClick={handleCreate}>新建</Button>
        </Footer>
      )}
    </View>
  )
}

export default GroupListPage
