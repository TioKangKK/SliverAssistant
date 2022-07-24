import { Image, View } from '@tarojs/components'
import { FC, useMemo, useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import dayjs from 'dayjs'

import EmptyBox from '@/components/EmptyBox'

import ElderCard from '@/business/ElderCard'
import Filter, { FilterConfigItem } from '@/business/Filter'

import IconSearch from '@/assets/search.svg'

import { navigateTo } from '@/utils/navigator'
import { getParamsFromFilters } from '@/utils/filter'

import { getCommunityList, getDocumentList } from '@/service'
import { Community, DocumentStatus, TDocument } from '@/service/types'

import './index.less'

const SearchEntry: FC = () => {
  return (
    <View className='search-entry' onClick={() => navigateTo('/pagesDocument/documentSearch/index')}>
      <Image src={IconSearch} className='icon-search' />
      搜索老人
    </View>
  )
}

const ageMap = {
  41: [0, 59],
  42: [60, 69],
  43: [70, 79],
  44: [80, 89],
  45: [90, 200],
}
const genFilterConfig = (communityList: Community[]): FilterConfigItem[] => [
  {
    id: 1, name: '社区', type: 'single',
    children: communityList,
    transfer: (value) => ({ community: value }),
  },
  {
    id: 2, name: '类型', type: 'single',
    children: [{id: 1, name: '一级'}, {id: 2, name: '二级'}, { id: 3, name: '三级' }],
    transfer: (value) => ({ living_level: value }),
  },
  {
    id: 3, name: '异常情况', type: 'single',
    children: [{id: 1, name: '异常'}, {id: 0, name: '正常'}],
    transfer: (value) => ({ is_abnormal: Boolean(value) })
  },
  { 
    id: 4, name: '年龄', type: 'single',
    children: [{ id: 41, name: '59岁及以下' }, { id: 42, name: '60-69岁' },{ id: 43, name: '70-79岁' },{ id: 44, name: '80-89岁' },{ id: 45, name: '90岁及以上' }],
    transfer: (value) => ({ age_lower_bound: ageMap[value][0] || 0, age_upper_bound: ageMap[value][1] || 200 })
  },
  {
    id: 5, name: '日期', type: 'date-range-picker',
    title: '观护日期范围',
    transfer: (value) => ({ archive_date_lower_bound: dayjs(value[0]).format('YYYY-MM-DD'), archive_date_upper_bound: dayjs(value[1]).format('YYYY-MM-DD') })
  },
]

const DocumentListPage: FC = () => {
  const [documentList, setDocumentList] = useState([] as TDocument[])
  const getData = async (params: {[x: string]: any}) => {
    const docList = await getDocumentList({ params });
    setDocumentList(docList.filter(item => item.status === DocumentStatus.APPROVED))
  }

  const [filters, setFilters] = useState({})
  const [communityList, setCommunityList] = useState([] as Community[])
  const getCommunities = async () => {
    const list = await getCommunityList()
    setCommunityList(list)
  }
  const filterConfig = useMemo(() => genFilterConfig(communityList), [communityList]);
  const handleFilterChange = (id, value) => {
    const nextFilters = { ...filters, [id]: value }
    setFilters(nextFilters)
    const params = getParamsFromFilters(filterConfig, nextFilters);
    getData(params);
  }
  
  const handleClickElderCard = (id) => navigateTo(`/pagesDocument/documentProfile/index?id=${id}`);

  useDidShow(async () => {
    await getCommunities()
    setFilters({});
    await getData({})
  });

  return (
    <View className='document-list'>
      <View className='document-list-header'>
        <SearchEntry />
        <Filter filterConfig={filterConfig} filters={filters} onFilterChange={handleFilterChange} />
      </View>
      <View className='document-list-content'>
        {documentList.map(item => (
          <ElderCard
            key={item.id}
            info={item}
            extra={{ text: '查看', onClick: () => handleClickElderCard(item.id) }}
          />
        ))}
        {!documentList.length && (<EmptyBox style={{marginTop: '50px'}}>暂无数据</EmptyBox>)}
      </View>
    </View>
  )
}

export default DocumentListPage