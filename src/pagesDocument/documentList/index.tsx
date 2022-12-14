import { Image, ScrollView, View } from '@tarojs/components'
import { FC, useMemo, useState } from 'react'
import { useDidShow, useRouter, showLoading, hideLoading, openDocument } from '@tarojs/taro'
import dayjs from 'dayjs'

import EmptyBox from '@/components/EmptyBox'
import Footer from '@/components/Footer'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'

import ElderCard from '@/business/ElderCard'
import Filter, { FilterConfigItem } from '@/business/Filter'

import IconSearch from '@/assets/search.svg'

import { navigateTo } from '@/utils/navigator'
import { getParamsFromFilters } from '@/utils/filter'
import { showToast } from '@/utils/toast'

import { downloadFile, exportDocs, exportDocument, getCommunityList, getDocumentList } from '@/service'
import { Community, DocumentStatus, TDocument } from '@/service/types'

import './index.less'

const SearchEntry: FC<{ type: 'download' | 'list' }> = ({ type }) => {
  return (
    <View className='search-entry' onClick={() => navigateTo(`/pagesDocument/documentSearch/index?type=${type}`)}>
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
    transfer: (value) => ({ community: communityList.find(item => item.id === value)?.name }),
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
    id: 5, name: '观护日期', type: 'date-range-picker',
    title: '观护日期范围',
    transfer: (value) => ({ archive_date_lower_bound: dayjs(value[0]).format('YYYY-MM-DD'), archive_date_upper_bound: dayjs(value[1]).format('YYYY-MM-DD') })
  },
]

const DocumentListPage: FC = () => {
  const { params: { type } } = useRouter<Required<{ type: 'list' | 'download' }>>(); // 路由上的参数
  const canDownload = type === 'download'

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
    const docs = docList.filter(item => item.status === DocumentStatus.APPROVED)
    setDocumentList(docs)
    setPagination(pre => ({ ...pre, current: 1, total: docs.length }))
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

  const [selected, setSelected] = useState<Set<number>>(new Set())
  const handleSelect = (id: number, v: boolean) => {
    v ? selected.add(id) : selected.delete(id)
    setSelected(new Set(selected))
  }
  const handleSelectAll = (v) => {
    setSelected(v ? new Set(documentList.map(item => item.id)) : new Set())
  }

  const handleDownload = async () => {
    showLoading({ title: '下载中' })
    try {
      const id = [...selected][0];
      const res = selected.size === 1 ? await exportDocument({ id: id }) :  await exportDocs({ doc_ids: [...selected] });
      if (res?.data) {
        const fileID = res.data.file_id
        const file = await downloadFile({ fileID });
        showToast(selected.size === 1 ?  `文件${[...selected][0]}下载成功，即将打开预览` : `文件下载成功，即将打开预览`)
        openDocument({ filePath: file.tempFilePath, showMenu: true });
      } else {
        showToast(res?.prompts)
      }
    } catch (e) {
      showToast(typeof e === 'string' ? e : e?.errMsg || '下载失败')
    } finally {
      hideLoading()
    }
  }

  const handleScrollToLower = () => {
    setPagination(pre => ({ ...pre, current: pre.current + 1 }))
  }

  return (
    <View className='document-list'>
      <View className='document-list-header'>
        <SearchEntry type={canDownload ? 'download' : 'list'} />
        <Filter filterConfig={filterConfig} filters={filters} onFilterChange={handleFilterChange} />
      </View>
      <View className='document-list-content'>
        {!!documentList.length && (
          <ScrollView className='document-list-scroll' scrollY onScrollToLower={handleScrollToLower}>
            {
              displayList.map(item => (
                <ElderCard
                  key={item.id}
                  info={item}
                  extra={{ text: '查看', onClick: () => handleClickElderCard(item.id) }}
                  selected={canDownload ? selected.has(item.id) : undefined}
                  onSelect={(v) => handleSelect(item.id, v)}
                  // canDownload={canDownload}
                  // onDownload={() => handleDownload(item.id)}
                />
              ))
            }
          </ScrollView>
        )}
        {!documentList.length && (<EmptyBox style={{marginTop: '50px', margin: '8px'}}>暂无数据</EmptyBox>)}
      </View>
      {
        canDownload && documentList.length > 0 && (
          <Footer className='two-buttons-group three-and-seven'>
            <View className='button select-all-wrapper'>
              <Checkbox value={selected.size === documentList.length} onChange={(v) => handleSelectAll(v)} />
              全选
            </View>
            <Button disabled={selected.size === 0} onClick={() => handleDownload()} type='primary'>下载档案</Button>
          </Footer>
        )
      }
    </View>
  )
}

export default DocumentListPage