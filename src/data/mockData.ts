import { Client, ServiceItem, ServiceRecord, VisitRecord, EntryRecord } from '../types';

export const mockClients: Client[] = [
  {
    id: 'C001',
    name: '北京宏远建设工程有限公司',
    status: '活跃客户',
    tags: ['高价值', '多次理赔', '续保预警'],
    lastYearPolicyNo: 'POL-2025-009812',
    lastYearProductName: '建筑工程一切险',
    lastYearPremium: 150000,
    insuranceEndDate: '2026-04-15',
    renewalStatus: '临近续保',
    type: '战略客户',
    nature: '国有企业',
    policyNo: 'POL-2025-009812',
    agency: '北京分公司',
    agentUM: 'UM889012',
  },
  {
    id: 'C002',
    name: '上海星河科技有限公司',
    status: '沉睡客户',
    tags: ['科技企业', '低频互动'],
    lastYearPolicyNo: 'POL-2025-001234',
    lastYearProductName: '雇主责任险',
    lastYearPremium: 80000,
    insuranceEndDate: '2026-02-10',
    renewalStatus: '已续保',
    type: '核心客户',
    nature: '民营企业',
    policyNo: 'POL-2025-001234',
    agency: '上海分公司',
    agentUM: 'UM889012',
  },
  {
    id: 'C003',
    name: '广州绿洲环保集团',
    status: '流失预警',
    tags: ['价格敏感', '竞品接触'],
    lastYearPolicyNo: 'POL-2024-005678',
    lastYearProductName: '安全生产责任险',
    lastYearPremium: 200000,
    insuranceEndDate: '2025-12-31',
    renewalStatus: '未续保',
    type: '潜力客户',
    nature: '合资企业',
    policyNo: 'POL-2024-005678',
    agency: '广东分公司',
    agentUM: 'UM889012',
  },
];

export const mockServices: ServiceItem[] = [
  {
    id: 'S001',
    name: '机场贵宾厅卡券 (10人次)',
    category: 'B端服务',
    subCategory: '高管培训',
    description: '为企业高管提供全国主要机场贵宾厅休息服务，提升差旅体验。',
    value: 5000,
  },
  {
    id: 'S002',
    name: '工程机械行业产业研学礼包',
    category: 'B端服务',
    subCategory: '名企参访',
    description: '组织企业核心骨干前往行业标杆企业进行深度研学交流。',
    value: 20000,
  },
  {
    id: 'S003',
    name: '企业安全生产年度培训',
    category: 'B端服务',
    subCategory: '安全生产培训',
    description: '由资深安全专家提供定制化企业安全生产培训课程。',
    value: 15000,
  },
  {
    id: 'S004',
    name: '高管全面健康体检套餐',
    category: 'C端服务',
    subCategory: '健康管理',
    description: '三甲医院VIP体检中心全面深度体检服务。',
    value: 8000,
  },
  {
    id: 'S005',
    name: '员工心理健康(EAP)年度咨询',
    category: 'C端服务',
    subCategory: '健康管理',
    description: '提供全年的员工心理健康热线及线下咨询服务。',
    value: 30000,
  },
  {
    id: 'S006',
    name: '智慧政务数字化转型沙龙',
    category: 'G端服务',
    subCategory: '行业论坛讲座',
    description: '面向政府客户的数字化转型专题闭门沙龙。',
    value: 12000,
  },
];

export const mockServiceRecords: ServiceRecord[] = [
  {
    id: 'R001',
    title: '2026年春季客户回馈申请',
    date: '2026-03-10 14:30',
    channel: '队伍申请',
    hasNewReview: true,
    services: [
      {
        id: 'S001',
        name: '高管全面健康体检套餐',
        currentStatus: '已评价',
        userName: '张三丰',
        reviewerName: '李四光',
        history: [
          { status: '审核中', date: '2026-03-10 14:30', details: '业务员提交申请，等待中台审核。' },
          { status: '待使用', date: '2026-03-11 10:00', details: '服务券码已发送至客户手机，有效期至2026-12-31。' },
          { status: '待评价', date: '2026-03-15 09:00', details: '客户已于北京协和医院VIP中心完成核销体检。' },
          { status: '已评价', date: '2026-03-16 14:30', details: '客户已提交评价。', rating: 5, feedback: '服务非常周到，体检中心环境很好，医生专业。' }
        ]
      },
      {
        id: 'S002',
        name: '机场贵宾厅卡券 (10人次)',
        currentStatus: '待评价',
        userName: '王五',
        reviewerName: '赵六',
        history: [
          { status: '审核中', date: '2026-03-10 14:30', details: '业务员提交申请，等待中台审核。' },
          { status: '待使用', date: '2026-03-11 10:00', details: '贵宾厅卡券已绑定至客户账户。' },
          { status: '待评价', date: '2026-03-12 10:00', details: '客户已使用贵宾厅服务。' }
        ]
      }
    ]
  },
  {
    id: 'R002',
    title: '续保促成专属礼包',
    date: '2026-02-28 09:15',
    channel: '企业宝下发',
    hasNewReview: false,
    services: [
      {
        id: 'S003',
        name: '企业安全生产年度培训',
        currentStatus: '审核中',
        history: [
          { status: '审核中', date: '2026-02-28 09:15', details: '企业宝自动触发下发流程，等待VP审批。' }
        ]
      },
      {
        id: 'S004',
        name: '工程机械行业产业研学礼包',
        currentStatus: '待使用',
        history: [
          { status: '审核中', date: '2026-02-28 09:15', details: '企业宝自动触发下发流程，等待VP审批。' },
          { status: '待使用', date: '2026-03-01 10:00', details: '礼包已下发，等待客户预约使用。' }
        ]
      }
    ]
  }
];

export const mockVisitRecords: VisitRecord[] = [
  {
    id: 'V001',
    title: '首次拜访',
    date: '2026-01-15 10:00',
    result: '初步了解客户需求，介绍了我司核心产品。',
    score: 6,
    summary: '本次拜访主要与客户采购部负责人张总进行了初步沟通。张总表示目前公司在员工福利方面的预算有限，但对我们的健康管理服务比较感兴趣。建议后续可以提供一些低成本、高感知的服务方案供其参考。'
  },
  {
    id: 'V002',
    title: '二次拜访',
    date: '2026-02-10 14:30',
    result: '明确了采购意向，客户对企康方案表现出浓厚兴趣。',
    score: 8,
    summary: '本次拜访向客户详细展示了企康合作方案，客户HR总监李总对员工活化部分非常认可。双方初步达成了合作意向，下一步需要提供详细的报价单和实施计划。'
  },
  {
    id: 'V003',
    title: '三次拜访',
    date: '2026-03-05 09:30',
    result: '推进一把手参加行业论坛，加深高层互信。',
    score: 9,
    summary: '成功邀请客户公司CEO王总参加下个月举办的行业数字化转型论坛。王总表示期待在论坛上与我司高层进行深入交流。这为后续的大单签约奠定了良好的基础。'
  }
];

export const mockEntryRecords: EntryRecord[] = [
  {
    id: 'E001',
    title: '健康宣讲',
    date: '2026-01-20',
    status: '已完成'
  },
  {
    id: 'E002',
    title: '迁移活化',
    date: '2026-02-15',
    status: '已完成'
  },
  {
    id: 'E003',
    title: '员工健康大讲堂',
    date: '2026-03-10',
    status: '进行中'
  },
  {
    id: 'E004',
    title: '1分购',
    date: '2026-03-25',
    status: '待开展'
  }
];
