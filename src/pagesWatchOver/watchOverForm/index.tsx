import Card from '@/components/Card'
import Page from '@/components/Page'
import { Image, View } from '@tarojs/components'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import Split from '@/components/Split'
import Banner from '@/components/Displays/Banner'
import Form, { FormConfigItem } from '@/components/Form'
import Selector from '@/components/Inputs/Selector'
import Radio from '@/components/Radio'
import Textarea from '@/components/Inputs/Textarea'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import ImageUploader from '@/components/Inputs/ImageUploader'
import { Option } from '@/types'

import IconEdit from '@/assets/edit.svg'
import IconArrowRight from '@/assets/arrow_right.svg'
import { navigateBack, navigateTo } from '@/utils/navigator'
import { showToast } from '@/utils/toast'

import './index.less'

const DraftEntry: FC = () => {
  const handleClick = () => { navigateTo('/pagesWatchOver/watchOverDraft/index') }
  return (
    <Card onClick={handleClick} className='draft-entry'>
      <View className='draft-entry-left'>
        <Image src={IconEdit} className='icon-edit' />
        <View className='draft-entry-main'>草稿箱</View>
        <Split type='vertical'  />
        <View className='draft-entry-tip'>未提交文档可继续填写</View>
      </View>
      <Image src={IconArrowRight} className='icon-arrow-right' />
    </Card>
  )
}

const getFormConfig = (data: { [x: string]: any }): FormConfigItem[] => [
  {
    key: 'date',
    render: (value) => <Banner>观护日期: {value}</Banner>
  },
  {
    key: 'name',
    label: '姓名',
    render: (value, onChange) => {
      const range = ['老人1', '老人2']
      return <Selector range={range} value={value} onChange={onChange} placeholder='点击选择' />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '老人姓名未选择' }
  },
  {
    key: 'health',
    label: '身体情况',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '正常' }, { id: 0, name: '异常' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '身体情况未填写' }
  },
  ...(data.health === 0 ? [
    {
      key: 'healthAbnormal',
      label: '身体情况异常记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的异常情况' />
      },
      checker: (value) => value ? null : { tip: '必填', msg: '身体情况异常记录未填写' }
    },
    {
      key: 'healthFollowUp',
      label: '身体情况跟进记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述如何跟进老人的异常情况' />
      }
    }
  ] : []),
  {
    key: 'diet',
    label: '饮食情况',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '正常' }, { id: 0, name: '异常' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '饮食情况未填写' }
  },
  ...(data.diet === 0 ? [
    {
      key: 'dietAbnormal',
      label: '饮食情况异常记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述老人的异常情况' />
      },
      checker: (value) => value ? null : { tip: '必填', msg: '饮食情况异常记录未填写' }
    },
    {
      key: 'dietFollowUp',
      label: '饮食情况跟进记录',
      render: (value, onChange) => {
        return <Textarea value={value} onChange={onChange} placeholder='请描述如何跟进老人的异常情况' />
      }
    }
  ] : []),
]

const WatchOverFormPage: FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const [showTip, setShowTip] = useState(false);
  const [formData, setFormData] = useState({
    date: dayjs().format('YYYY-MM-DD')
  })
  const formConfig = getFormConfig(formData)
  const handleFormChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }
  const isValidate = () => {
    for (const item of formConfig) {
      if (!item.checker) { continue }
      const msg = item.checker(formData[item.key])?.msg
      if (msg) {
        showToast(msg);
        setShowTip(true);
        return false;
      }
    }
    return true
  }
  const handleSaveDraft = () => {
    if (!isValidate()) { return }
    // 保存草稿
    navigateBack();
  }
  const handleCommit = () => {
    if (!isValidate()) { return }
    // 提交
    navigateBack();
  }
  return (
    <Page>
      <DraftEntry />
      <Card className='watch-over-form'>
        <Form showTip={showTip} config={formConfig} data={formData} onChange={handleFormChange} />
      </Card>
      <Card className='image-upload-card'>
        <View className='image-upload-card-title'>点击拍照或上传照片</View>
        <ImageUploader files={images} onChange={(v) => setImages(v)} />
      </Card>
      <Footer className='buttons-group'>
        <Button onClick={handleSaveDraft} type='default'>保存草稿</Button>
        <Button onClick={handleCommit} type='primary'>提交</Button>
      </Footer>
    </Page>
  )
}

export default WatchOverFormPage
