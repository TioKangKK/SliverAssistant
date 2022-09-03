import { FC, useState } from 'react'

import Page from '@/components/Page'

import ElderCard from '@/business/ElderCard'

import { navigateTo } from '@/utils/navigator'
import { DocumentStatus, WatchOverListItem } from '@/service/types'
import { getDocumentList, getWatchOverList } from '@/service'

import './index.less'

const WatchOverDraftBoxPage: FC = () => {
  const [data, setData] = useState([])

  const getData = async () => {
    // TODO 仅保留草稿态
    const { list: watchOverList } = await getWatchOverList({ count: 1000, offset: 0 });
    const docList = (await getDocumentList({ params: {} })).list.filter(item => item.status === DocumentStatus.APPROVED && item.need_probation);
  }

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
    </Page>
  )
}

export default WatchOverDraftBoxPage
