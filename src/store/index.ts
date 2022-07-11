type Store = {
  group: {
    type: 'elder' | 'volunteer',
    list: { id: string; name: string; avatar: string }[]
  }
}

const store: Store = {
  group: {
    type: 'elder',
    list: [],
  }
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