export type KeyPerson = {
  id: string;
  name: string;
  phone: string;
  role: '超级管理员' | '经办人' | '其他';
  position?: string;
};

export type Client = {
  id: string;
  name: string;
  status: string;
  tags: string[];
  lastYearPolicyNo: string;
  lastYearProductName: string;
  lastYearPremium: number;
  insuranceEndDate: string;
  renewalStatus: '临近续保' | '已续保' | '未续保';
  type: string;
  nature: string;
  policyNo: string;
  agency: string;
  agentUM: string;
  estimatedPremium?: number;
};

export type ServiceCategory = 'G端服务' | 'B端服务' | 'C端服务';

export type ServiceItem = {
  id: string;
  name: string;
  category: ServiceCategory;
  subCategory: string;
  description: string;
  value: number;
  imageUrl?: string;
};

export type ServiceStatus = '审核中' | '待使用' | '待评价' | '已评价';

export type ServiceHistoryNode = {
  status: ServiceStatus;
  date: string;
  details: string;
  rating?: number;
  feedback?: string;
};

export type AppliedService = {
  id: string;
  name: string;
  currentStatus: ServiceStatus;
  userName?: string;
  reviewerName?: string;
  history: ServiceHistoryNode[];
};

export type ServiceRecord = {
  id: string;
  title: string;
  date: string;
  channel: '队伍申请' | '企业宝下发';
  hasNewReview?: boolean;
  services: AppliedService[];
};

export type VisitRecord = {
  id: string;
  title: string;
  date: string;
  result: string;
  score: number;
  summary: string;
};

export type EntryRecord = {
  id: string;
  title: string;
  date: string;
  status: string;
};
