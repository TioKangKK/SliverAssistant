import { FC, useState } from 'react'
import { useDidShow } from '@tarojs/taro'

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
  const getData = async (params: {[x: string]: any}) => {
    const docList = await getDocumentList({ params });
    setDocumentList(docList.filter(item => item.status === DocumentStatus.DAFT))
  }

  const handleClickElderCard = (id) => navigateTo(`/pagesDocument/documentForm/index?id=${id}`)

  useDidShow(async () => {
    await getData({})
  })

  return (
    <Page>
      {documentList.map(item => (
        <ElderCard
          key={item.id}
          info={item}
          extra={{ text: '继续填写', onClick: () => handleClickElderCard(item.id) }}
        />
      ))}
      {!documentList.length && (
        <Card style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <EmptyBox>暂无数据</EmptyBox>
        </Card>
      )}
    </Page>
  )
}

export default DocumentDraftBoxPage