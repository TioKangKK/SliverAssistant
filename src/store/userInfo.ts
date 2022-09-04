import { Role } from "@/constants/user";

type UserInfoData = {
  avatar: string;
  id: number;
  name: string;
  open_id: string;
  org_id: number;
  phone: string;
  role: Role;
}

class UserInfo {
  _data = {} as UserInfoData
  
  set(payload: Partial<UserInfoData>) {
    this._data = { ...this._data, ...payload }
  }

  get(key?: string) {
    if (key) return this._data[key]
    return this._data
  }
}

// eslint-disable-next-line import/no-mutable-exports
let instance
if (!instance) {
  instance = new UserInfo()
}

export default (instance as UserInfo)