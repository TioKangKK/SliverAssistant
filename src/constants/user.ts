export enum Role {
  SuperManager = 1,
  SocialWorker = 2,
  Volunteer = 3
}
export const roleToName = {
  [Role.SuperManager]: '超管',
  [Role.SocialWorker]: '社工',
  [Role.Volunteer]: '志愿者',
}

export enum Gender {
  Male = 1,
  Female = 2
}

export enum ButtonStyle {
  Default = 1,
  Primary = 2,
}
export const buttonStyleToType = {
  [ButtonStyle.Default]: 'default',
  [ButtonStyle.Primary]: 'primary',
}

export const livingLevelToName = {
  1: '一级',
  2: '二级',
  3: '三级'
}
export const statusToName = {
  1: '正常',
  0: '异常'
}