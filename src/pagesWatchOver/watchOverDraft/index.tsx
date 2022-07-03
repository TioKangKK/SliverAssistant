import { FC } from 'react'

import Page from '@/components/Page'

import ElderCard from '@/business/ElderCard'

import { navigateTo } from '@/utils/navigator'

import './index.less'

const data = [
  {
    id: 1,
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    name: '周建',
    age: '75',
    level: 1, // 观护等级
    levelName: '一级',
    address: '幸福里小区',
    // status: '异常',
    // statusType: 0,
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
    // status: '正常',
    // statusType: 1,
    volunteer: '-',
    date: '-',
  }
]

const WatchOverDraftPage: FC = () => {
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

export default WatchOverDraftPage
