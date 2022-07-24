const diseaseConfig = [
  {
    name: '呼吸系统',
    children: [
      '慢性阻塞性肺气肿',
      '哮喘',
      '慢性肺心病',
      '慢性呼吸衰竭',
      '矽肺',
      '肺纤维化',
    ]
  },
  {
    name: '循环系统',
    children: [
      '慢性心力衰竭',
      '冠心病',
      '先天性心脏病',
      '高血压',
      '心脏瓣膜病',
      '慢性感染性心内膜炎',
      '心肌疾病',
      '慢性心包炎',
    ]
  },
  {
    name: '消化系统',
    children: [
      '慢性胃炎',
      '消化性溃疡',
      '肠结核',
      '慢性肠炎',
      '慢性腹泻',
      '慢性肝炎',
      '肝硬化',
      '慢性胰腺炎',
      '慢性胆囊炎',
    ]
  },
  {
    name: '泌尿系统',
    children: [
      '慢性肾炎',
      '慢性肾衰',
      '泌尿系慢性炎症'
    ]
  },
  {
    name: '血液系统',
    children: [
      '慢性贫血',
      '慢性粒细胞白血病',
      '慢性淋巴细胞白血病',
      '慢性淋巴瘤',
    ]
  },
  {
    name: '内分泌系统',
    children: [
      '慢性淋巴细胞性甲状腺炎',
      '甲亢',
      '甲减',
    ]
  },
  {
    name: '代谢和营养',
    children: [
      '糖尿病',
      '营养缺乏病',
      '通风',
      '骨质疏松',
    ]
  },
  {
    name: '结缔和风湿',
    children: [
      '类风湿性关节炎',
      '系统性红斑狼疮',
      '强直性脊柱炎',
      '干燥综合征',
      '血管炎',
      '特发性炎症性肌病',
      '系统性硬化病',
      '骨性关节炎',
    ]
  },
]

export const diseaseOptions = diseaseConfig.map(item => ({
  id: item.name,
  name: item.name,
  children: item.children.map(child => ({
    id: child,
    name: child,
  }))
}))