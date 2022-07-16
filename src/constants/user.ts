export enum Role {
  Volunteer = 3
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