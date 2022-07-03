import { Image, View } from '@tarojs/components'
import { FC, useState } from 'react'

import ElderCard from '@/business/ElderCard'
import Filter, { FilterItem } from '@/business/Filter'

import IconSearch from '@/assets/search.svg'

import { navigateTo } from '@/utils/navigator'

import './index.less'

const SearchEntry: FC = () => {
  return (
    <View className='search-entry' onClick={() => navigateTo('/pagesDocument/documentSearch/index')}>
      <Image src={IconSearch} className='icon-search' />
      搜索老人
    </View>
  )
}

const filterConfig: FilterItem[] = [
  { id: 1, name: '社区', type: 'single', children: [{ id: 10, name: '全部' },{ id: 11, name: '鑫鑫家园' },{ id: 12, name: '知春家园' },{ id: 13, name: '朝阳社区' },{ id: 14, name: '花园村' }] },
  { id: 2, name: '类型', type: 'single', children: [{ id: 20, name: '全部' }, {id: 21, name: '一级'}, {id: 22, name: '二级'}, { id: 23, name: '三级' }] },
  { id: 3, name: '异常情况', type: 'single', children: [{ id: 30, name: '全部' }, {id: 31, name: '异常'}, {id: 32, name: '正常'}] },
  { id: 4, name: '年龄', type: 'number-range', title: '年龄范围' },
  { id: 5, name: '日期', type: 'date-range-picker', title: '观护日期范围' },
]

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

const DocumentListPage: FC = () => {
  const [filters, setFilters] = useState({})
  const handleFilterChange = (id, value) => setFilters({ ...filters, [id]: value })
  
  const handleClickElderCard = (id) => navigateTo(`/pagesDocument/documentDetail/index?id=${id}`);

  return (
    <View className='document-list'>
      <View className='document-list-header'>
        <SearchEntry />
        <Filter filterConfig={filterConfig} filters={filters} onFilterChange={handleFilterChange} />
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

export default DocumentListPage