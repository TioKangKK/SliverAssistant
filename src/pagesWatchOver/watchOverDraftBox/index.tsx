import { FC, useState } from 'react'
import { useDidShow } from '@tarojs/taro'

import Page from '@/components/Page'
import Card from '@/components/Card'
import EmptyBox from '@/components/EmptyBox'

import ElderCard from '@/business/ElderCard'

import { navigateTo } from '@/utils/navigator'
import { TDocument } from '@/service/types'
import { getWatchOverList } from '@/service'

import './index.less'

const WatchOverDraftBoxPage: FC = () => {
  const [data, setData] = useState<TDocument[]>([])

  const getData = async () => {
    const { list: watchOverList } = await getWatchOverList({ count: 1000, offset: 0, care_type: 1 });
    setData(watchOverList.map(item => ({ name: item.name || '-', id: item.id } as TDocument)));
  }

  useDidShow(async () => {
    await getData()
  })

  const handleClickElderCard = (id) => navigateTo(`/pagesWatchOver/watchOverForm/index?id=${id}`)
  
  return (
    <Page>
      {data.map(item => (
        <ElderCard
          key={item.id}
          info={item}
          extra={{ text: '继续填写', onClick: () => handleClickElderCard(item.id) }}
        />
      ))}
      {!data.length && (
        <Card style={{ paddingTop: '50px', paddingBottom: '50px', margin: '8px' }}>
          <EmptyBox>暂无草稿</EmptyBox>
        </Card>
      )}
    </Page>
  )
}

export default WatchOverDraftBoxPage
