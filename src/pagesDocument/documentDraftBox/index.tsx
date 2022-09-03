import { FC, useMemo, useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'

import Page from '@/components/Page'

import EmptyBox from '@/components/EmptyBox'
import Card from '@/components/Card'

import ElderCard from '@/business/ElderCard'

import { navigateTo } from '@/utils/navigator'

import { DocumentStatus, TDocument } from '@/service/types'
import { getDocumentList } from '@/service'

import './index.less'

const DocumentDraftBoxPage: FC = () => {
  const [documentList, setDocumentList] = useState([] as TDocument[])

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  })

  const displayList = useMemo(() => {
    return documentList.slice(0, pagination.current * pagination.pageSize)
  }, [documentList, pagination]);

  const getData = async (params: {[x: string]: any}) => {
    const { list: docList } = await getDocumentList({ params });
    const drafts = docList.filter(item => item.status === DocumentStatus.DRAFT)
    setDocumentList(drafts)
    setPagination(pre => ({ ...pre, current: 1, total: drafts.length }))
  }

  const handleClickElderCard = (id) => navigateTo(`/pagesDocument/documentForm/index?id=${id}`)

  useDidShow(async () => {
    await getData({})
  })

  const handleScrollToLower = () => {
    setPagination(pre => ({ ...pre, current: pre.current + 1 }))
  }

  return (
    <Page>
      {!!documentList.length && (
        <ScrollView className='document-draft-list-scroll' scrollY onScrollToLower={handleScrollToLower}>
          {
            displayList.map(item => (
              <ElderCard
                key={item.id}
                info={item}
                extra={{ text: '继续填写', onClick: () => handleClickElderCard(item.id) }}
              />
            ))
          }
        </ScrollView>
      )}
      {!documentList.length && (
        <Card style={{ paddingTop: '50px', paddingBottom: '50px', margin: '8px' }}>
          <EmptyBox>暂无数据</EmptyBox>
        </Card>
      )}
    </Page>
  )
}

export default DocumentDraftBoxPage