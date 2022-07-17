import { Gender, Role } from "@/constants/user"

export enum DashboardItemType {
  Basic = 1, // 第一块，基本信息
  Notification = 2, // 消息通知
  Search = 3, // 搜索老人
  Cards = 4, // 一揽子卡片
  Download = 5, // 下载
}
export type DashboardItems = {
  item_info: { [x: string]: any },
  item_type: DashboardItemType,
}[]

export enum AuditStatus {
  Passed = 1,   // 已通过
  Pending = 2,  // 待审批
  Rejected = 3, // 已驳回
}

export type User = { // 这其实是user，而非
  id: number,
  org_id: number,
  open_id: string,
  role: Role,
  status: AuditStatus,
  name: string,
  gender: Gender,
  age: number,
  community_id: number,
  address: string,
}

export interface Volunteer extends User {
  phone?: string,      // TODO
  monthCount?: number, // TODO
  totalCount?: number, // TODO
} 

export type Community = {
  id: number,
  name: string,
}