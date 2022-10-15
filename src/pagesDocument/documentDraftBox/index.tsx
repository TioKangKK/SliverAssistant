import { FC, useMemo, useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { ScrollView, Image, View } from '@tarojs/components'

import Page from '@/components/Page'

import EmptyBox from '@/components/EmptyBox'
import Card from '@/components/Card'
import Input from '@/components/Inputs/Input'

import ElderCard from '@/business/ElderCard'

import { navigateTo } from '@/utils/navigator'

import { DocumentStatus, TDocument } from '@/service/types'
import { getDocumentList } from '@/service'

import userInfoStore from '@/store/userInfo'

import IconSearch from '@/assets/search.svg'
import IconArrowRight from '@/assets/arrow_right.svg'
import IconClear from '@/assets/clear.svg'

import './index.less'

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState('')
  const [results, setResults] = useState<{ name: string, id: number|string }[]>([])

  const search = async (v) => {
    const createdId =  userInfoStore.get('id')
    const extraParams = createdId ? { created_by_id: createdId }: {}
    const { list: result } = await getDocumentList({ params: { keyword: v, ...extraParams } });
    setResults(v ? result.filter(item => item.status === DocumentStatus.DRAFT).map(item => ({ id: item.id, name: item.name })) : [])
  }

  const handleSearch = (v) => {
    setText(v)
    search(v)
  }

  const handleCancelSearch = () => {
    setText('')
    setResults([])
    onSearch('');
  }

  const handleClickSearchResult = (item) => {
    setText(item.name);
    setResults([])
    onSearch(item.name)
  }

  const handleBlur = () => {
    text === '' && onSearch('')
  }

  return (
    <View className='search-bar'>
      <View className='search-wrapper'>
        <Image src={IconSearch} className='icon-search' />
        <Input placeholder='搜索档案' onBlur={handleBlur} onChange={handleSearch} value={text} className='search-input' />
        {text && <Image onClick={handleCancelSearch} className='icon-clear' src={IconClear} /> }
      </View>
      <View className='search-result-panel'>
        {results.map(item => (
          <View onClick={() => handleClickSearchResult(item)} className='search-result-panel-item' key={item.id}>
            {item.name}
            <Image className='icon-arrow-right' src={IconArrowRight} />
          </View>
        ))}
      </View>
    </View>
  )
}

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

  const getData = async (params: {[x: string]: any} = {}) => {
    const createdId =  userInfoStore.get('id')
    const extraParams = createdId ? { created_by_id: createdId }: {}
    const { list: docList } = await getDocumentList({ params: { ...params, extraParams} });
    const drafts = docList.filter(item => item.status === DocumentStatus.DRAFT)
    setDocumentList(drafts)
    setPagination(pre => ({ ...pre, current: 1, total: drafts.length }))
  }

  const handleClickElderCard = (id) => navigateTo(`/pagesDocument/documentForm/index?id=${id}`)

  useDidShow(async () => {
    await getData()
  })

  const handleScrollToLower = () => {
    setPagination(pre => ({ ...pre, current: pre.current + 1 }))
  }

  const handleSearch = async (name) => {
    if (name === '') {
      await getData()
    } else {
      await getData({ keyword: name })
    }
  }

  return (
    <Page>
      <View className='document-draft-list-header'>
        <SearchBar onSearch={handleSearch} />
      </View>
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
          <EmptyBox>暂无草稿</EmptyBox>
        </Card>
      )}
    </Page>
  )
}

export default DocumentDraftBoxPage