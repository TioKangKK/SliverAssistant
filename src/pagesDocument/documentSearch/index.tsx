import { Image, View } from '@tarojs/components'
import { FC, useState } from 'react'

import Input from '@/components/Inputs/Input'

import ElderCard from '@/business/ElderCard'

import IconSearch from '@/assets/search.svg'
import IconArrowRight from '@/assets/arrow_right.svg'
import IconClear from '@/assets/clear.svg'

import { navigateBack, navigateTo } from '@/utils/navigator'

import './index.less'

const mockResult = [
  { name: '李春霞', id: '1' },
  { name: '李春香', id: '2' },
  { name: '李春君', id: '3' },
]

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState('')
  const [results, setResults] = useState<typeof mockResult>([])
  // const [isSearching, setIsSearching] = useState(false)

  const search = (v) => {
    setResults(v ? mockResult.filter(item => item.name.includes(v)) : [])
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
    // 触发真滴search
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

const data = [
  {
    id: 1,
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    name: '周建',
    age: '75',
    level: 1, // 观护等级
    levelName: '一级',
    address: '幸福里小区',
    status: '异常',
    statusType: 0,
    volunteer: '小荷',
    date: '2022-05-01',
  },
  {
    id: 2,
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    name: '周建香',
    age: '75',
    level: 3, // 观护等级
    levelName: '三级',
    address: '幸福里小区',
    status: '正常',
    statusType: 1,
    volunteer: '-',
    date: '-',
  }
]

const DocumentSearchPage: FC = () => {
  const handleClickElderCard = (id) => navigateTo(`/pagesDocument/documentDetail/index?id=${id}`);

  return (
    <View className='document-list'>
      <View className='document-list-header'>
        <SearchBar onSearch={(name) => { console.log('search', name) }} />
      </View>
      <View className='document-list-content'>
        {data.map(item => (
          <ElderCard
            key={item.id}
            info={item}
            extra={{ text: '查看', onClick: () => handleClickElderCard(item.id) }}
          />
        ))}
      </View>
    </View>
  )
}

export default DocumentSearchPage