import { FormConfigItem } from "@/components/Form"

export const getParamsFromForm = (formConfig: FormConfigItem[], data: {[x: string]: any}) => {
  let params: {[x: string]: any} = {}
  for (const item of formConfig) {
    if (data[item.key] === undefined) { continue }
    params[item.key] = item.transfer ? item.transfer(data[item.key]) : data[item.key]
  }
  return params
}

export const getCheckMsg = (formConfig: FormConfigItem[], data: {[x: string]: any}) => {
  for (const item of formConfig) {
    if (!item.checker) { continue }
    const msg = item.checker(data[item.key])?.msg
    if (msg) { return msg }
  }
  return ''
}