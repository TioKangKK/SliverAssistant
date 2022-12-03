import Input from '@/components/Inputs/Input'
import RegionPicker from '@/components/Inputs/RegionPicker'
import Selector from '@/components/Inputs/Selector'
import Radio from '@/components/Radio'
import Textarea from '@/components/Inputs/Textarea'
import PopupSelector from '@/components/Inputs/PopupSelector'
import ImageUploader from '@/components/Inputs/ImageUploader'
import { FormConfigItem } from '@/components/Form'

import { Community } from '@/service/types'
import { Option } from '@/types'
import { diseaseOptions } from '@/constants/disease'
import { getCheckMsg } from '@/utils/form'

export const genBasicFormConfig = (communityList: Community[]): FormConfigItem[] => [
  {
    key: 'name',
    label: '姓名',
    render: (value, onChange) => {
      return <Input value={value} onChange={onChange} placeholder='填写姓名' />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '老人姓名未填写' }
  },
  {
    key: 'community',
    label: '所属社区',
    render: (value, onChange) => {
      const range = communityList.map(item => item.name)
      const innerValue = value !== undefined ? communityList.findIndex(item => item.name === value) : value
      const onInnerChange = (v) => onChange(communityList[v].name)
      return <Selector range={range} value={innerValue} onChange={onInnerChange} placeholder='请选择社区' />
    },
    checker: (value: number) => value ? null : { tip: '必填', msg: '社区未选择' }
  },
  {
    key: 'code',
    label: '身份证号码',
    render: (value, onChange) => {
      return <Input type='idcard' value={value} onChange={onChange} placeholder='请填写身份证号码' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '身份证未填写' }
      } else if (value.length !== 18) {
        return { tip: '18位', msg: '身份号应为18位' }
      }
      return null
    }
  },
  {
    key: 'gender',
    label: '性别',
    render: (value, onChange) => {
      const range = ['男', '女']
      return <Selector range={range} value={value - 1} onChange={(v) => onChange(+v + 1)} placeholder='请选择性别' />
    },
    checker: (value: number) => value ? null : { tip: '必填', msg: '性别未填写' }
  },
  {
    key: 'age',
    label: '年龄',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={(v) => onChange(+v)} placeholder='请填写年龄' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '年龄未填写' }
      } else if (+value < 0 || +value > 120) {
        return { tip: '0 ~ 120 岁', msg: '年龄范围在 0 ~ 120岁之间' }
      }
      return null
    },
  },
  {
    key: 'native_place',
    label: '籍贯',
    render: (value, onChange) => {
      return <RegionPicker value={value && value.split('-')} onChange={(v) => onChange(v.join('-'))} placeholder='请选择籍贯' />
    },
    checker: (value: string[]) => value && value.length ? null : { tip: '必填', msg: '籍贯未选择' }
  }
]

export const contactFormConfig: FormConfigItem[] = [
  {
    key: 'contact',
    label: '联系方式',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={onChange} placeholder='填写联系方式' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '联系电话未填写' }
      } else if (value.length !== 11) {
        return { tip: '11位', msg: '手机号应为11位' }
      }
      return null
    }
  },
  {
    key: 'living_situation',
    label: '居住情况',
    render: (value, onChange) => {
      const options = [{ id: 1, name: '独居(一个人住)' },{ id: 2, name: '空巢(夫妻同住，子女不在身边)' },{ id:3, name: '家人同住(与子女、孙辈共同居住)' },{ id: 4, name: '其他(与保姆或护工同住)' }]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必选', msg: '居住情况未选择' }
  },
  {
    key: 'emergency_contact',
    label: '紧急联系人',
    render: (value, onChange) => {
      return <Input value={value} onChange={onChange} placeholder='请输入紧急联系人' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '紧急联系人未填写' }
  },
  {
    key: 'emergency_phone_number',
    label: '紧急联系电话',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={onChange} placeholder='填写联系方式' />
    },
    checker: (value: string) => {
      if (!value) {
        return { tip: '必填', msg: '紧急联系电话' }
      } else if (value.length !== 11) {
        return { tip: '11位', msg: '手机号应为11位' }
      }
      return null
    }
  },
  {
    key: 'address',
    label: '家庭住址',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='请输入家庭住址' />
    },
    checker: (value: string) => value ? null : { tip: '必填', msg: '家庭住址未填写' }
  },
]

const renderYesOrNo = (value, onChange) => {
  const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
  return <Radio options={options} value={+value} onChange={(v) => onChange(!!v)} />
}

export const healthFormConfig: FormConfigItem[] = [
  {
    key: 'hearing',
    label: '听力',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '正常' }, { id: 2, name: '听力欠佳' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '听力情况未填写' }
  },
  {
    key: 'expressing',
    label: '表达能力',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '口齿清晰' }, { id: 2, name: '表达不清' }]
      return <Radio options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '表达能力未填写' }
  },
  {
    key: 'mobility',
    label: '行动能力',
    render: (value, onChange) => {
      const options: Option[] = [{ id: 1, name: '行走自如' }, { id: 2, name: '下楼困难，需要拐杖支撑' }, { id: 3, name: '行动不便，需要轮椅或卧床' }]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '行动能力未填写' }
  },
  {
    key: 'diseases',
    label: '疾病情况',
    render: (value, onChange) => {
      const options = diseaseOptions
      return <PopupSelector placeholder='点击选择' title='疾病情况(多选)' options={options} value={value} onChange={onChange} />
    }
  },
  {
    key: 'is_special_disease',
    label: '是否办理特病',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特病情况未填写' }
  },
  {
    key: 'health_remarks',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他情况，请填写' />
    }
  }
]

export const financialFormConfig: FormConfigItem[] = [
  {
    key: 'is_retired_employee',
    label: '是否为退休职工',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '经济情况未填写' }
  },
  {
    key: 'is_subsistence_allowances',
    label: '是否为社区低保人员',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '经济情况未填写' }
  },
  {
    key: 'is_suffering_hardship',
    label: '是否存在衣食住行医方面的困难',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '经济情况未填写' }
  },
  {
    key: 'financial_remarks',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他经济情况，请填写' />
    }
  }
]

export const livingFormConfig: FormConfigItem[] = [
  {
    key: 'has_crutch',
    label: '是否备有拐杖',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'has_wheel_chair',
    label: '是否备有轮椅',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'has_rail_in_toilet',
    label: '厕所是否有扶手',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'has_bath_chair',
    label: '是否有助浴椅',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'is_safe_entrance',
    label: '门窗是否完好',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'utilities',
    label: '水电气是否完好',
    render: (value = {} as { is_safe_utilities, utilities_condition }, onChange) => {
      const { is_safe_utilities, utilities_condition } = value
      const options: Option[] = [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      return (
        <>
          <Radio options={options} value={+is_safe_utilities} onChange={(v) => onChange({ ...value, is_safe_utilities: !!v })} />
          {is_safe_utilities === false && (
            <Textarea
              placeholder='请描述存在的安全隐患情况'
              style={{ marginTop: '10px' }}
              value={utilities_condition}
              onChange={(v) => onChange({ ...value, utilities_condition: v  })}
            />
          )}
        </>
      )
    },
    checker: (value) => {
      if (value === undefined) {
        return { tip: '必填', msg: '居住及安全情况未填写' }
      } else if (value.is_safe_utilities === false && !value.utilities_condition) {
        return { tip: '填写完整', msg: '请填写水电隐患' }
      }
      return null
    }
  },
  {
    key: 'is_cleanness',
    label: '居住环境是否整洁',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '居住及安全情况未填写' }
  },
  {
    key: 'environment_remarks',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他情况，请填写' />
    }
  }
]

export const familyFormConfig: FormConfigItem[] = [
  {
    key: 'number_of_descendants',
    label: '有几个子女',
    render: (value, onChange) => {
      return <Input type='number' value={value} onChange={v => onChange(+v)} placeholder='请输入几个子女' />
    },
    checker: (value: number) => {
      if (value === undefined) {
        return { tip: '必填', msg: '子女未填写' }
      } else if (typeof +value !== 'number' || +value < 0 || +value > 20) {
        return { tip: '0 ~ 20 名', msg: '子女数量应在 0 ~ 20 名之间' }
      }
      return null
    }
  },
  {
    key: 'is_live_together',
    label: '子女是否在同小区居住',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '家庭情况未填写' }
  },
  {
    key: 'visiting_frequency',
    label: '子女前来看望的频率',
    render: (value, onChange) => {
      const options: Option[] = [
        { id: 1, name: '每天' },
        { id: 2, name: '一周三四次' },
        { id: 3, name: '一周一次' },
        { id: 4, name: '半月一次' },
        { id: 5, name: '一月一次' },
        { id: 6, name: '半年一次' },
      ]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '家庭情况未填写' }
  },
  {
    key: 'family_remarks',
    label: '其他情况（选填）',
    render: (value, onChange) => {
      return <Textarea value={value} onChange={onChange} placeholder='如果其他情况，请填写' />
    }
  }
]

export const phoneFormConfig: FormConfigItem[] = [
  {
    key: 'photo_uris',
    label: '老人正面照',
    render: (value, onChange) => {
      console.log('value', value)
      return <ImageUploader files={value || []} onChange={onChange} />
    },
    checker: (value: string[]) => value && value.length ? null : { tip: '必传', msg: '请上传照片' }
  },
]

export const specialFormConfig: FormConfigItem[] = [
  {
    key: 'is_good_neighbor',
    label: '独居老人居住环境是否睦邻',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
  {
    key: 'has_family_events',
    label: '是否发生重大家庭变故',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
  {
    key: 'is_suffering_accident',
    label: '是否因突发自然灾害、公共卫生等事件造成生活困难',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
  {
    key: 'is_got_supplied',
    label: '是否落实相应救助措施',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '特殊情况未填写' }
  },
]

/**
 * 自动计算规则
 *  1级 -> 选择“行动不便，需要轮椅或卧床”
 *  2级 -> 独居 & 80及以上
 *  3级 -> 独居 & 65->80
 * */

export const typifyFormConfig: FormConfigItem[] = [
  {
    key: 'living_level',
    label: '老人类型',
    tip: '以下为系统帮您判断的类型，可根据真实情况修改',
    render: (value, onChange) => {
      const options: Option[] = [
        { id: 1, name: '一级：行动不便，需要轮椅或卧床' },
        { id: 2, name: '二级：高龄独居等需要重点关注的老年人' },
        { id: 3, name: '三级：自理活力行独居老年人' },
      ]
      return <Radio col={1} options={options} value={value} onChange={onChange} />
    },
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '老人类型未选择' }
  },
  {
    key: 'need_probation',
    label: '需要观护',
    render: renderYesOrNo,
    checker: (value) => value !== undefined ? null : { tip: '必填', msg: '未选择是否需要观护' }
  }
]

export const checkFormData = (communityList: Community[], data: {[x: string]: any}) => {
  const basic = genBasicFormConfig(communityList);
  const personal = [...healthFormConfig, ...financialFormConfig, ...livingFormConfig, ...familyFormConfig];
  const special = [...specialFormConfig, ...typifyFormConfig]
  const list = [basic, contactFormConfig, personal, special, phoneFormConfig]
  for (let i = 0; i < list.length; i++) {
    const msg = getCheckMsg(list[i], data)
    if (msg) {
      return { msg, step: i }
    }
  }
}