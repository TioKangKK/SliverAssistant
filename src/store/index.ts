import { Community } from "@/service/types";

type Store = {
  userInfo: {
    code: number,
    data: { [x: string]: any },
  }
  community: {
    list: Community[],
    initialized: boolean,
  },
}

const store: Store = {
  userInfo: {
    code: -1,
    data: {},
  },
  community: {
    list: [],
    initialized: false,
  },
}

const get = (name: keyof Store, key?: string) => {
  if (!key) return store?.[name];
  return store?.[name]?.[key];
};

const set = (name: keyof Store, key: string, value: any) => {
  if (!key) throw new Error('key未设置');
  if (!get(name)) throw new Error(`${name} 未被初始化`);
  store[name][key] = value;
  return value;
};

export default {
  get,
  set,
};