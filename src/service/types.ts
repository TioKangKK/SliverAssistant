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