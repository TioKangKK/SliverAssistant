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

export enum NoticeType {
  VolunteerRegister = 1, // 志愿者注册
  SubmitDoc = 2, // 档案提交
  SubmitRiskCare = 3, // 异常观护记录
}
export type NoticeItem = {
  create_time: string,
  detail: {
    user_id: number,
    text: string,
    doc_id: number,
  },
  id: number
  notice_type: NoticeType,
  org_id: number,
  update_time: string,
}

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

export type IndividualInfo = {
  address: string;
  cleanness_condition: string;
  contact: string;
  diseases: string[];
  emergency_contact: string;
  emergency_phone_number: string;
  entrance_condition: string;
  environment_remarks: string;
  expressing: number;
  family_remarks: string;
  financial_remarks: string;
  has_bath_chair: boolean;
  has_crutch: boolean;
  has_family_events: boolean;
  has_rail_in_toilet: boolean;
  has_wheel_chair: boolean;
  health_remarks: string;
  hearing: number;
  is_cleanness: boolean;
  is_good_neighbor: boolean;
  is_got_supplied: boolean;
  is_live_together: boolean;
  is_retired_employee: boolean;
  is_safe_entrance: boolean;
  is_safe_utilities: boolean;
  is_special_disease: boolean;
  is_subsistence_allowances: boolean;
  is_suffering_accident: boolean;
  is_suffering_hardship: boolean;
  living_situation: number;
  mobility: number;
  number_of_descendants: number;
  photo_uris: string[];
  utilities_condition: string;
  visiting_frequency: number;
}

export enum DocumentStatus {
  DRAFT = 1,
  SUBMITTED= 2,
  APPROVED = 3,
  REJECT = 4,
}
export enum DocumentOperate {
  SUBMIT = 'submit',
  APPROVED = 'approve',
  REJECT = 'reject',
}

export type TDocument = {
  age: number;
  code: string;
  code_type: number;
  community: string;
  created_at: string;
  created_by: number;
  deleted_at: string;
  gender: number;
  id: number;
  individual_info: IndividualInfo;
  living_level: number;
  name: string;
  native_place: number;
  need_probation: boolean; // 需要观护
  org_id: number;
  status: DocumentStatus; // 档案状态
  updated_at: string;
  volunteer_id: number;
};

export enum GroupMemberType {
  VOLUNTEER = 1,
  ELDER = 2,
}

export type Group = {
  name: string,
  group_id: number,
  id: number,
  org_id: number,
  create_at: string,
  delete_at: string,
  update_at: string,
  docs: TDocument[],
  volunteers: Volunteer[],
}

export enum WatchOverStatus {
  NORMAL = 0,
  ABNORMAL = 1, 
}

export type WatchOverListItem = {
  id: number,     // 主键id
  volunteer_id: number, // 志愿者id
  volunteer_name: string, // 志愿者id
  name: string,
  care_status: WatchOverStatus, // 关护状态 0-正常 1-异常
  care_time: number, // 观护时间，时间戳
  reason: string,
}

export enum WatchOverSituationStatus {
  DEFAULT = 0,
  NORMAL = 1,
  ABNORMAL = 2,
}

export enum WatchOverDetailStatus {
  DRAFT = 0,
  SUBMITTED = 1,
}

export type WatchOverDetail = {
  user_id: number, // 老人id
  health_situation: WatchOverSituationStatus,
  daily_diet: WatchOverSituationStatus,
  emotion_situation: WatchOverSituationStatus,
  housing_security: WatchOverSituationStatus,
  family_relation: WatchOverSituationStatus,
  status: WatchOverDetailStatus, // 观护记录状态
  health_situation_reason: string,
  daily_diet_reason: string,
  emotion_situation_reason: string,
  housing_security_reason: string,
  family_relation_reason: string,
  pictures: string,
}