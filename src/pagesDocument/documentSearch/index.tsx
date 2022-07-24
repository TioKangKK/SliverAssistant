import { Image, View } from '@tarojs/components'
import { FC, useState } from 'react'

import Input from '@/components/Inputs/Input'
import EmptyBox from '@/components/EmptyBox'

import ElderCard from '@/business/ElderCard'

import IconSearch from '@/assets/search.svg'
import IconArrowRight from '@/assets/arrow_right.svg'
import IconClear from '@/assets/clear.svg'

import { navigateBack, navigateTo } from '@/utils/navigator'

import { DocumentStatus, TDocument } from '@/service/types'
import { getDocumentList } from '@/service'

import './index.less'

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState('')
  const [results, setResults] = useState<{ name: string, id: number|string }[]>([])

  const search = async (v) => {
    const result = await getDocumentList({ params: { keyword: v} });
    setResults(v ? result.map(item => ({ id: item.id, name: item.name })) : [])
  }

  const handleSearch = (v) => {
    setText(v)
    search(v)
  }

  const handleCancelSearch = () => {
    setText('')
    setResults([])
  }

  const handleClickSearchResult = (item) => {
    setText(item.name);
    setResults([])
    onSearch(item.name)
  }

  return (
    <View className='search-bar'>
      <View className='search-wrapper'>
        <Image src={IconSearch} className='icon-search' />
        <Input placeholder='搜索老人' onChange={handleSearch} value={text} className='search-input' />
        {text && <Image onClick={handleCancelSearch} className='icon-clear' src={IconClear} /> }
        <View className='search-quit' onClick={() => navigateBack()}>取消</View>
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

const DocumentSearchPage: FC = () => {
  const [documentList, setDocumentList] = useState([] as TDocument[])
  const getData = async (params: {[x: string]: any}) => {
    const docList = await getDocumentList({ params });
    setDocumentList(docList.filter(item => item.status === DocumentStatus.APPROVED))
  }

  const handleClickElderCard = (id) => navigateTo(`/pagesDocument/documentProfile/index?id=${id}`);

  const handleSearch = async (name) => {
    if (name === '') { return; }
    await getData({ keyword: name }) // 进行搜索
  }

  return (
    <View className='document-list'>
      <View className='document-list-header'>
        <SearchBar onSearch={handleSearch} />
      </View>
      <View className='document-list-content'>
        {documentList.map(item => (
          <ElderCard
            key={item.id}
            info={item}
            extra={{ text: '查看', onClick: () => handleClickElderCard(item.id) }}
          />
        ))}
        {!documentList.length && (<EmptyBox style={{marginTop: '50px'}}>暂无符合要求的数据</EmptyBox>)}
      </View>
    </View>
  )
}

export default DocumentSearchPage