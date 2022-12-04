import { FC, useMemo, useState } from 'react'
import { useDidShow } from '@tarojs/taro'

import Page from '@/components/Page'
import Card from '@/components/Card'
import EmptyBox from '@/components/EmptyBox'

import ElderCard from '@/business/ElderCard'

import { navigateTo } from '@/utils/navigator'
import { TDocument } from '@/service/types'
import { getWatchOverList } from '@/service'

import { ScrollView, View } from '@tarojs/components'

import './index.less'

const WatchOverDraftBoxPage: FC = () => {
  const [data, setData] = useState<TDocument[]>([])

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  })
  const [loading, setLoading] = useState(false)
  const hasMore = useMemo(() => pagination.current * pagination.pageSize < pagination.total, [pagination])

  const getData = async (current = pagination.current) => {
    if (loading) { return; }
    setLoading(true)
    try {
      // const offset = (current - 1) * pagination.pageSize
      const { list: watchOverList, total } = await getWatchOverList({ count: pagination.pageSize, offset: 0, care_type: 1 });
      setData(watchOverList.map(item => ({ name: item.name || '-', id: item.id, individual_info: { photo_uris: [item.elder_avatar] } } as TDocument)));
      setPagination(pre => ({ ...pre, current, total }))
    } finally {
      setLoading(false)
    }
  }

  const handleScrollToLower = () => {
    if (loading) { return; }
    if (!hasMore) { return; }
    getData(pagination.current + 1)
  }

  useDidShow(async () => {
    await getData()
  })

  const handleClickElderCard = (id) => navigateTo(`/pagesWatchOver/watchOverForm/index?id=${id}`)
  
  return (
    <Page>
      <ScrollView className='watch-over-draft-box-list-scroll' scrollY onScrollToLower={handleScrollToLower}>
        {data.map(item => (
          <ElderCard
            key={item.id}
            info={item}
            extra={{ text: '继续填写', onClick: () => handleClickElderCard(item.id) }}
          />
        ))}
        <View className='watch-over-draft-box-list-scroll-footer'>
          {loading ? '正在加载~' : hasMore ? '下滑加载更多' : '没有更多了~'}
        </View>
        {!loading && !data.length && (
          <Card style={{ paddingTop: '50px', paddingBottom: '50px', margin: '8px' }}>
            <EmptyBox>暂无草稿</EmptyBox>
          </Card>
        )}
      </ScrollView>
      
    </Page>
  )
}

export default WatchOverDraftBoxPage
