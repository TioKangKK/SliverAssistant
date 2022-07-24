import { FilterConfigItem } from "@/business/Filter";

export const getParamsFromFilters = (filterConfig: FilterConfigItem[], filters: {[x: string]: any}) => {
  let params: {[x: string]: any} = {}
  for (const item of filterConfig) {
    if (filters[item.id] === undefined) { continue }
    if (!item.transfer) { continue }
    params = {
      ...params,
      ...item.transfer(filters[item.id])
    }
  }
  return params
}