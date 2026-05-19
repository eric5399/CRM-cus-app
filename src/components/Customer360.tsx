import React, { useState, useEffect } from 'react';
import { Client } from '../types';
import { mockServiceRecords, mockVisitRecords, mockEntryRecords } from '../data/mockData';
import {
  ArrowLeft, Building2, FileText, Target, Gift, Clock,
  MessageSquare, CheckCircle2, Clock3, Star, PlayCircle,
  ChevronRight, ChevronDown, Bell, Info, ShieldAlert,
  Users, Network, AlertTriangle, Briefcase, Activity,
  TrendingUp, Calendar, ArrowRight, Bot, MapPin, Sparkles, X, Search, Copy,
  Share, Plus, ChevronLeft, Wrench, History, Mic, MoreHorizontal
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// 好帮手设计规范色彩
const colors = {
  brand: '#FF6611',
  brandDark: '#CC4E0A',
  brandDeep: '#993A06',
  textPrimary: '#222222',
  textSecondary: '#737587',
  textTertiary: '#AFB3C2',
  borderGray: '#D8DAE3',
  borderLight: '#E8ECF2',
  bgPage: '#F4F6F9',
  bgNotice: '#FEF6E7',
  success: '#56C468',
  warning: '#F7B44C',
  error: '#E85757',
  info: '#508CEE',
};

// Mock Data for Customer Rights
const mockVouchers = [
  { id: 'v1', name: '名企参访体验券', type: '研学', status: '已下发待使用', expiry: '2026-12-31', owner: '张* (HRD)', ownerRole: 'HRD', category1: '产业研学', category2: '名企参访', value: 5000, usage: '用于走进世界500强企业参观学习', instructions: '凭此券可预约参与名企参访活动，请提前3天预约' },
  { id: 'v2', name: '道路救援服务卡', type: '车主', status: '即将过期', expiry: '2026-04-15', owner: '李* (采购总监)', ownerRole: '采购总监', category1: '车主尊享', category2: '道路救援', value: 800, usage: '24小时全国道路救援服务', instructions: '拨打客服热线400-xxx-xxxx，凭卡券码使用' },
  { id: 'v3', name: '高管体检套餐', type: '医健', status: '已使用待评价', expiry: '2026-06-30', owner: '王* (财务总监)', ownerRole: '财务总监', category1: '高端医健', category2: '体检套餐', value: 8000, usage: '三甲医院VIP全面体检', instructions: '请携带身份证和卡券到指定体检中心使用' },
  { id: 'v4', name: '机场贵宾厅权益', type: '出行', status: '已评价-好评', expiry: '2025-12-31', owner: '张* (HRD)', ownerRole: 'HRD', category1: '商旅出行', category2: '贵宾厅', value: 1500, usage: '全国主要机场贵宾厅休息服务', instructions: '出示电子券码即可享受贵宾厅服务' },
  { id: 'v5', name: '心理咨询服务', type: '医健', status: '已评价-差评', expiry: '2026-05-31', owner: '赵* (车队管理员)', ownerRole: '车队管理员', category1: '高端医健', category2: '心理咨询', value: 2000, usage: '员工心理健康EAP咨询服务', instructions: '请提前致电预约咨询时间' },
];

// Mock Data for Service Applications
const mockApplications = [
  { id: 'a1', name: '2026春季高管研学包', status: '中台审核中', date: '2026-03-28', items: ['名企参访', '高管培训'] },
  { id: 'a2', name: '车队安全保障服务包', status: 'VP审核中', date: '2026-03-15', items: ['道路救援', '安全生产培训'] },
  { id: 'a3', name: '年度健康关怀包', status: '已发放', date: '2026-01-10', items: ['体检套餐', '心理咨询'] },
];

// Mock Data for Service Catalog
const mockServiceCatalog = [
  { id: 's1', name: '名企参访', desc: '走进世界500强企业', price: 5000, category: '产业研学' },
  { id: 's2', name: '高管培训', desc: '顶尖商学院定制课程', price: 12000, category: '产业研学' },
  { id: 's3', name: '行业论坛讲座', desc: '行业大咖深度分享', price: 3000, category: '产业研学' },
  { id: 's4', name: '安全生产培训', desc: '专业合规安全指导', price: 2500, category: '产业研学' },
  { id: 's5', name: '车主尊享服务', desc: '全方位车辆关怀', price: 1500, category: '车主尊享' },
  { id: 's6', name: '道路救援', desc: '24小时紧急救援', price: 800, category: '车主尊享' },
  { id: 's7', name: '体检套餐', desc: '三甲医院VIP体检', price: 8000, category: '医健服务' },
];

const mockKeyPersons = [
  { id: 'p1', name: '张*', role: 'HRD', phone: '138****8888' },
  { id: 'p2', name: '李*', role: '采购总监', phone: '139****9999' },
  { id: 'p3', name: '王*', role: '财务总监', phone: '137****7777' },
];

interface Customer360Props {
  client: Client;
  onBack: () => void;
  onApplyService: (client: Client) => void;
  onNavigateToAgencyCustomerDetails: () => void;
  onNavigateToApproval?: () => void;
  onNavigateToBasicInfo: () => void;
  onNavigateToCoopInfo: () => void;
  onNavigateToClaimRecord: () => void;
  onNavigateToTimeline: () => void;
  onNavigateToAllServices?: () => void;
  onNavigateToServiceOverview?: (tab: '发放服务' | '使用服务' | '未使用的' | '有评价的') => void;
}

type TabType = '客户洞察' | '销售转化' | '服务养客';

const radarData = [
  { subject: '保费贡献', A: 120, fullMark: 150 },
  { subject: '产品覆盖', A: 98, fullMark: 150 },
  { subject: '理赔体验', A: 86, fullMark: 150 },
  { subject: '服务互动', A: 99, fullMark: 150 },
  { subject: '续保意愿', A: 85, fullMark: 150 },
];

export default function Customer360({ client, onBack, onApplyService, onNavigateToAgencyCustomerDetails, onNavigateToApproval, onNavigateToBasicInfo, onNavigateToCoopInfo, onNavigateToClaimRecord, onNavigateToTimeline, onNavigateToAllServices, onNavigateToServiceOverview }: Customer360Props) {
  const [activeTab, setActiveTab] = useState<TabType>('销售转化');
  const [timelineFilter, setTimelineFilter] = useState<'拜访记录' | '服务使用' | '入企记录'>('拜访记录');
  const [oppFilter, setOppFilter] = useState<string[]>([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [renewalMoreMenu, setRenewalMoreMenu] = useState<number | null>(null);
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(mockServiceRecords[0]?.id || null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(true);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [aiTyping, setAiTyping] = useState(false);
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
  const [showCoopInfoModal, setShowCoopInfoModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showClaimListModal, setShowClaimListModal] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showFollowToast, setShowFollowToast] = useState(false);
  const [followToastMessage, setFollowToastMessage] = useState('已添加到我的关注列表');
  const [timeRange, setTimeRange] = useState('近3年');

  const [coopScope, setCoopScope] = useState<'我司' | '我的'>('我的');
  const [salesTab, setSalesTab] = useState<'保险' | '企康'>('保险');
  const [salesSubTab, setSalesSubTab] = useState<'商机' | '续保' | 'B2C'>('商机');
  const [qikangTab, setQikangTab] = useState<'企业达成' | '员工活化'>('企业达成');
  const [qikangSalesTab, setQikangSalesTab] = useState<'企康商机' | 'B2C'>('企康商机');
  const [serviceTab, setServiceTab] = useState<'关键人服务' | '企业服务'>('关键人服务');
  const [serviceInnerTab, setServiceInnerTab] = useState<'推荐服务' | '推荐工具'>('推荐服务');
  const [showServiceToolsModal, setShowServiceToolsModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Share toast state
  const [showShareToast, setShowShareToast] = useState(false);

  // Service distribution filter states
  const [serviceDistPerson, setServiceDistPerson] = useState<string>('全部');
  const [serviceDistStatus, setServiceDistStatus] = useState<string>('全部');
  const [serviceDistType, setServiceDistType] = useState<string>('全部');
  const [voucherSearchQuery, setVoucherSearchQuery] = useState('');

  // Voucher detail modal state
  const [showVoucherDetailModal, setShowVoucherDetailModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<typeof mockVouchers[0] | null>(null);
  const [showServiceApplyModal, setShowServiceApplyModal] = useState(false);
  const [applySelectedPerson, setApplySelectedPerson] = useState<string>(mockKeyPersons[0].id);
  const [applySelectedServices, setApplySelectedServices] = useState<string[]>(['s1', 's6', 's7']);
  const [applySearchQuery, setApplySearchQuery] = useState('');
  const [applyCategory, setApplyCategory] = useState<string>('全部');

  const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);
  const [companyInfoModalType, setCompanyInfoModalType] = useState<'经营范围' | '高管信息' | '企业族谱' | '新闻动态' | '智能拜访纪要'>('经营范围');
  const [currentSummary, setCurrentSummary] = useState<string>('');
  const [currentClaim, setCurrentClaim] = useState<any>(null);

  // 客户洞察流式输出状态
  const [insightLoading, setInsightLoading] = useState(false);
  const [insightProgress, setInsightProgress] = useState<string>('');
  const [insightComplete, setInsightComplete] = useState(false);

  // 客户洞察模块数据
  const [customerOverview, setCustomerOverview] = useState<{
    industry: string;
    businessStatus: string;
    mainBusiness: string;
  } | null>(null);

  const [riskAlerts, setRiskAlerts] = useState<Array<{ level: string; content: string }>>([]);
  const [operationalRisks, setOperationalRisks] = useState<string[]>([]);

  // 自动点击"开始分析" - 当弹窗打开时自动触发
  useEffect(() => {
    if (showInsightModal && !insightComplete && !insightLoading) {
      loadCustomerInsights();
    }
  }, [showInsightModal]);

  const [latestNews, setLatestNews] = useState<Array<{
    title: string;
    summary: string;
    date: string;
  }>>([]);

  const [industryAnalysis, setIndustryAnalysis] = useState<string>('');

  const [keyPersons, setKeyPersons] = useState<Array<{
    name: string;
    role: string;
    bio: string;
    resume: string;
  }>>([]);

  const [biddingProjects, setBiddingProjects] = useState<Array<{
    projectName: string;
    insuranceType: string;
    publishDate: string;
    bidAmount: string;
    winner: string;
    isCoInsured: string;
    winAmount: string;
  }>>([]);

  const [cooperationIssues, setCooperationIssues] = useState<Array<{
    project: string;
    issues: string;
    suggestions: string;
  }>>([]);

  const [speechPoints, setSpeechPoints] = useState<Array<{
    level: string;
    points: string;
  }>>([]);

  // 模拟流式输出函数
  const streamText = async (text: string, setState: React.Dispatch<React.SetStateAction<string>>, speed: number = 30) => {
    for (let i = 0; i <= text.length; i++) {
      setState(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  };

  // 加载客户洞察数据
  const loadCustomerInsights = async () => {
    setInsightLoading(true);
    setInsightComplete(false);
    setInsightProgress('正在查询公开信息...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 客户概况
    setInsightProgress('正在分析客户概况...');
    setCustomerOverview({
      industry: '制造业 - 汽车零部件',
      businessStatus: '企业经营正常，近3年营收稳定增长，年营收规模约5亿元',
      mainBusiness: '汽车发动机零部件研发、生产与销售，主要产品包括发动机缸体、凸轮轴等',
    });
    await new Promise(resolve => setTimeout(resolve, 800));

    // 最新动态
    setInsightProgress('正在获取最新动态...');
    setLatestNews([
      { title: '某某汽车零部件公司荣获"优秀供应商"称号', summary: '该公司凭借优质的产品和服务，在年度供应商评审中脱颖而出，荣获主机厂颁发的"优秀供应商"荣誉。', date: '2026-04-15' },
      { title: '某某汽车零部件公司扩产项目投产', summary: '总投资2亿元的新产线正式投产，预计年新增产值3亿元，主要生产新能源汽车零部件。', date: '2026-03-20' },
      { title: '某某汽车零部件公司与高校签订战略合作协议', summary: '双方将在人才培养、技术研发等方面开展深度合作，共同推进汽车零部件产业升级。', date: '2026-02-28' },
    ]);
    await new Promise(resolve => setTimeout(resolve, 800));

    // 行业分析及保险建议
    setInsightProgress('正在分析行业趋势...');
    setIndustryAnalysis(`【产业概况】
汽车零部件行业是汽车工业的基础，近几年保持稳定增长态势。新能源汽车的快速发展为行业带来新的机遇与挑战。

【发展前景】
1. 新能源汽车零部件需求快速增长，特别是电池、电机、电控相关部件
2. 智能化、轻量化成为技术升级方向
3. 行业集中度提升，龙头效应明显

【同业动态】
主要竞争对手均在加速布局新能源赛道，通过并购重组提升竞争力。

【行业风险】
1. 原材料价格波动风险
2. 主机厂压价导致利润空间收窄
3. 技术迭代快，研发投入大
4. 应收账款周期长，资金占用严重

【保险建议】
1. 财产险：建议足额投保，特别是存货和设备
2. 货运险：原材料进口和成品出货建议投保
3. 责任险：建议购买产品责任险，转移因产品质量导致的赔偿责任
4. 信用险：建议对主要主机厂客户购买信用险，应收账款保障
5. 团体意外险：建议为员工购买高额团体意外险`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 企业关键人
    setInsightProgress('正在获取企业关键人信息...');
    setKeyPersons([
      { name: '李明', role: '董事长', bio: '公司创始人，从事汽车零部件行业30余年', resume: '1988-1995 某国营机械厂技术员\n1995-2005 某外资零部件企业高管\n2005-至今 创办本公司并担任董事长' },
      { name: '王强', role: '总经理', bio: '负责公司日常经营管理，曾任知名企业高管', resume: '2000-2010 某上市公司部门经理\n2010-2018 某跨国企业中国区总监\n2018-至今 加入本公司任总经理' },
      { name: '张伟', role: '财务总监', bio: '资深财务专家，负责公司财务管理和投融资', resume: '1998-2008 某会计事务所审计经理\n2008-2015 某上市公司财务经理\n2015-至今 加入公司任财务总监' },
      { name: '刘洋', role: '采购总监', bio: '负责采购体系建设和供应商管理', resume: '2005-2012 某外资企业采购主管\n2012-2020 某上市公司采购经理\n2020-至今 加入公司任采购总监' },
      { name: '陈静', role: 'HRD', bio: '负责人力资源战略规划和团队建设', resume: '2003-2010 某猎头公司顾问\n2010-2018 某上市公司人事经理\n2018-至今 加入公司任HRD' },
      { name: '赵军', role: '技术总监', bio: '负责技术研发和产品创新', resume: '2000-2010 某研究院工程师\n2010-2018 某外资企业技术经理\n2018-至今 加入公司任技术总监' },
      { name: '孙鹏', role: '生产总监', bio: '负责生产管理和精益制造', resume: '2002-2010 某台资企业生产主管\n2010-2020 某上市公司生产经理\n2020-至今 加入公司任生产总监' },
      { name: '周婷', role: '销售总监', bio: '负责市场开拓和客户关系管理', resume: '2008-2015 某企业销售经理\n2015-至今 加入公司任销售总监，连续多年带领团队完成销售目标' },
      { name: '吴刚', role: '质量总监', bio: '负责质量管理体系和认证', resume: '2000-2010 某检测机构工程师\n2010-至今 加入公司任质量总监' },
      { name: '郑鑫', role: '党支部书记', bio: '负责党务工作和企业文化建设', resume: '2010-2018 某国企党务专员\n2018-至今 加入公司任党支部书记' },
    ]);
    await new Promise(resolve => setTimeout(resolve, 800));

    // 招投标项目
    setInsightProgress('正在获取招投标信息...');
    setBiddingProjects([
      { projectName: '某新能源汽车电池托盘项目', insuranceType: '财产险', publishDate: '2026-04-10', bidAmount: '500万元', winner: '平安产险', isCoInsured: '是', winAmount: '320万元' },
      { projectName: '某汽车零部件产业园团体意外险', insuranceType: '团体意外险', publishDate: '2026-03-25', bidAmount: '80万元', winner: '中国人寿', isCoInsured: '否', winAmount: '80万元' },
      { projectName: '某零部件企业货运险采购', insuranceType: '货运险', publishDate: '2026-03-15', bidAmount: '120万元', winner: '人保财险', isCoInsured: '是', winAmount: '65万元' },
      { projectName: '某汽车座椅总成供应商责任险', insuranceType: '产品责任险', publishDate: '2026-02-28', bidAmount: '200万元', winner: '太保产险', isCoInsured: '否', winAmount: '200万元' },
    ]);
    await new Promise(resolve => setTimeout(resolve, 800));

    // 过往合作问题
    setInsightProgress('正在分析合作问题...');
    setCooperationIssues([
      { project: '某新能源汽车零部件项目', issues: '1. 对方对保险方案理解不充分\n2. 保费预算与市场报价存在差距\n3. 共保体组成成员尚未确定', suggestions: '建议拜访时准备详细方案 PPT，安排专人对接，定期沟通进展' },
      { project: '某主机厂团体意外险续保', issues: '1. 客户要求降低保费10%\n2. 赔偿限额需要重新评估\n3. 等待客户内部审批', suggestions: '建议适当给予老客户优惠，同步准备备选方案，月底前完成签约' },
    ]);
    await new Promise(resolve => setTimeout(resolve, 800));

    // 话术要点
    setInsightProgress('正在生成话术要点...');
    setSpeechPoints([
      { level: '高层（董事长/总经理）', points: '1. 强调行业风险案例，如同行企业因风险导致重大损失\n2. 说明保险是企业管理风险的必要工具，非成本\n3. 突出我们公司的专业服务和理赔优势\n4. 提到可以提供定制化的风险解决方案' },
      { level: '财务总监', points: '1. 分析保费支出与风险保障的性价比\n2. 说明保费抵扣税务的相关政策\n3. 强调资金占用和现金流管理建议\n4. 提供灵活的缴费方式' },
      { level: '采购总监/业务负责人', points: '1. 讲解财产险覆盖范围和理赔流程\n2. 说明供应商管理中对保险的要求\n3. 提供货运险一揽子解决方案\n4. 强调售后服务响应速度' },
      { level: 'HRD', points: '1. 介绍团体意外险的员工福利价值\n2. 说明员工满意度与企业风险的平衡\n3. 提供多种套餐选择\n4. 突出员工专属服务的便捷性' },
    ]);

    setInsightProgress('加载完成');
    setInsightComplete(true);
    setInsightLoading(false);
  };

  const tabs: { id: TabType; icon: React.ElementType; badge?: boolean }[] = [
    { id: '销售转化', icon: Target },
    { id: '服务养客', icon: Gift },
  ];

  const toggleRecord = (id: string) => {
    setExpandedRecordId(prev => prev === id ? null : id);
  };

  const toggleNode = (nodeId: string) => {
    setSelectedNodeId(prev => prev === nodeId ? null : nodeId);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col relative">
      {/* Header - 吸顶 */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center shadow-sm">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-900 shrink-0 -ml-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">客户详情</h1>
        <button
          onClick={() => {
            if (isFollowed) {
              setIsFollowed(false);
              setFollowToastMessage('已取消关注');
            } else {
              setIsFollowed(true);
              setFollowToastMessage('已添加到我的关注列表');
            }
            setShowFollowToast(true);
            setTimeout(() => setShowFollowToast(false), 1500);
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0 mr-1"
        >
          <Star className={`w-[18px] h-[18px] ${isFollowed ? 'fill-orange-400 text-orange-400' : 'text-gray-400'}`} />
        </button>
      </header>

      {/* 客情总览 - 随滚动离开 */}
      <div className="bg-white px-4 pt-3 pb-4 border-b border-gray-100">
        <div className="space-y-3">
          {/* 1) 客户名称及标签 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-gray-900">{client.name}</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium">至尊</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">民营企业</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">保险已客</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">存续</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">苏州开元区</span>
          </div>

          {/* 2) 指标看板 */}
          <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-0.5">在保保费</div>
                  <div className="text-base font-bold text-gray-900">85.6<span className="text-xs font-normal">万</span></div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-0.5">企康规模</div>
                  <div className="text-base font-bold text-gray-900">200<span className="text-xs font-normal">人</span></div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-0.5">赔付率</div>
                  <div className="text-base font-bold text-gray-900">45.2%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-0.5">应续保单</div>
                  <div className="text-base font-bold text-gray-900">3<span className="text-xs font-normal">份</span></div>
                </div>
              </div>
            </div>

            {/* 3) 常用功能按钮 */}
            <div className="flex items-center gap-2">
              {/* 客户洞察 - 基本信息按钮样式 */}
              <button
                onClick={() => setShowInsightModal(true)}
                className="flex-1 py-2 text-gray-700 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                客户洞察
              </button>
              <button
                onClick={onNavigateToBasicInfo}
                className="flex-1 py-2 text-gray-700 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                基本信息
              </button>
              <button
                onClick={onNavigateToCoopInfo}
                className="flex-1 py-2 text-gray-700 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                合作记录
              </button>
              <button
                onClick={onNavigateToClaimRecord}
                className="flex-1 py-2 text-gray-700 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                理赔记录
              </button>
              <button
                onClick={onNavigateToTimeline}
                className="flex-1 py-2 text-gray-700 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                时光轴
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - 吸顶 */}
        <div className="sticky top-[52px] z-20 bg-white border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors relative flex-1 gap-1.5 ${
                  activeTab === tab.id
                    ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50/30'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-400'}`} />
                {tab.id}
              </button>
            ))}
          </div>
        </div>

      {/* Main Content */}
      <main className="flex-1 w-full pb-24">
        {/* Tab Content */}
        <div className="p-4 space-y-4">

          {/* 客户洞察 */}
          {activeTab === '客户洞察' && (
            <div className="space-y-4">
              {/* 加载状态 */}
              {!insightComplete && !insightLoading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">客户洞察分析</h3>
                  <p className="text-xs text-gray-500 mb-4">通过联网查询企查查、中国招投标等公开信息获取客户全方位洞察</p>
                  <button
                    onClick={loadCustomerInsights}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors"
                  >
                    开始分析
                  </button>
                </div>
              )}

              {/* 加载中状态 */}
              {insightLoading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-500 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">正在分析中...</h3>
                  <p className="text-xs text-gray-500">{insightProgress}</p>
                </div>
              )}

              {/* 客户洞察内容 */}
              {insightComplete && (
                <div className="space-y-4">
                  {/* 客户概况 */}
                  {customerOverview && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <Building2 className="w-4 h-4 mr-1.5 text-orange-500" />
                        客户概况
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 w-16 shrink-0">行业：</span>
                          <span className="text-xs text-gray-900">{customerOverview.industry}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 w-16 shrink-0">经营：</span>
                          <span className="text-xs text-gray-900">{customerOverview.businessStatus}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 w-16 shrink-0">主业：</span>
                          <span className="text-xs text-gray-900">{customerOverview.mainBusiness}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 最新动态 */}
                  {latestNews.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <FileText className="w-4 h-4 mr-1.5 text-orange-500" />
                        最新动态
                      </h3>
                      <div className="space-y-3">
                        {latestNews.map((news, idx) => (
                          <div key={idx} className="border-l-2 border-orange-200 pl-3">
                            <div className="text-xs font-medium text-gray-900">{news.title}</div>
                            <div className="text-[10px] text-gray-500 mt-1">{news.summary}</div>
                            <div className="text-[10px] text-gray-400 mt-1">{news.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 行业分析及保险建议 */}
                  {industryAnalysis && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <TrendingUp className="w-4 h-4 mr-1.5 text-orange-500" />
                        行业分析及保险建议
                      </h3>
                      <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                        {industryAnalysis}
                      </div>
                    </div>
                  )}

                  {/* 企业关键人 */}
                  {keyPersons.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <Users className="w-4 h-4 mr-1.5 text-orange-500" />
                        企业关键人
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {keyPersons.map((person, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-2.5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-900">{person.name}</span>
                              <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded">{person.role}</span>
                            </div>
                            <div className="text-[10px] text-gray-500">{person.bio}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 客户招投标项目 */}
                  {biddingProjects.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <Briefcase className="w-4 h-4 mr-1.5 text-orange-500" />
                        客户招投标项目
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">项目名称</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">险种</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">发布日期</th>
                              <th className="text-right px-2 py-1.5 font-medium text-gray-500">招标金额</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">中标单位</th>
                              <th className="text-center px-2 py-1.5 font-medium text-gray-500">共保</th>
                              <th className="text-right px-2 py-1.5 font-medium text-gray-500">中标金额</th>
                            </tr>
                          </thead>
                          <tbody>
                            {biddingProjects.map((project, idx) => (
                              <tr key={idx} className="border-t border-gray-100">
                                <td className="px-2 py-1.5 text-gray-900">{project.projectName}</td>
                                <td className="px-2 py-1.5 text-gray-700">{project.insuranceType}</td>
                                <td className="px-2 py-1.5 text-gray-500">{project.publishDate}</td>
                                <td className="px-2 py-1.5 text-gray-900 text-right">{project.bidAmount}</td>
                                <td className="px-2 py-1.5 text-gray-700">{project.winner}</td>
                                <td className="px-2 py-1.5 text-center">
                                  <span className={`px-1.5 py-0.5 rounded ${project.isCoInsured === '是' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {project.isCoInsured}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-gray-900 text-right">{project.winAmount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 过往合作问题 */}
                  {cooperationIssues.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <AlertTriangle className="w-4 h-4 mr-1.5 text-orange-500" />
                        过往合作问题
                      </h3>
                      <div className="space-y-3">
                        {cooperationIssues.map((issue, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs font-medium text-gray-900 mb-2">{issue.project}</div>
                            <div className="mb-2">
                              <span className="text-[10px] text-gray-500 font-medium">问题：</span>
                              <div className="text-[10px] text-gray-700 whitespace-pre-line mt-1">{issue.issues}</div>
                            </div>
                            <div>
                              <span className="text-[10px] text-orange-600 font-medium">推进建议：</span>
                              <div className="text-[10px] text-gray-700 mt-1">{issue.suggestions}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 话术要点总结 */}
                  {speechPoints.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <MessageSquare className="w-4 h-4 mr-1.5 text-orange-500" />
                        话术要点总结
                      </h3>
                      <div className="space-y-3">
                        {speechPoints.map((item, idx) => (
                          <div key={idx} className="bg-orange-50 rounded-xl p-3">
                            <div className="text-xs font-medium text-orange-700 mb-1">{item.level}</div>
                            <div className="text-[10px] text-gray-700 whitespace-pre-line">{item.points}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 重新加载按钮 */}
                  <div className="text-center pt-2">
                    <button
                      onClick={() => {
                        setInsightComplete(false);
                        setInsightLoading(false);
                      }}
                      className="px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      重新分析
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 基础信息 tab content removed and moved to modal */}

          {/* 合作记录 content removed and moved to modal */}

          {/* 销售转化 */}
          {activeTab === '销售转化' && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                {['商机', '续保', 'B2C'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSalesSubTab(tab as any)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      salesSubTab === tab
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {salesSubTab === '商机' && (
                <>
                  {/* 商机看板 */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-gray-900">商机看板</h3>
                    </div>
                    <div className="mb-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">预估保费总额</div>
                          <div className="text-sm font-bold text-gray-900">150.0 <span className="text-xs font-normal">万</span></div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">产品数量</div>
                          <div className="text-sm font-bold text-gray-900">2 <span className="text-xs font-normal">个</span></div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">产品名称</div>
                          <div className="text-sm font-medium text-gray-900">雇主责任险等2个产品</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">商机状态</div>
                          <div className="text-sm font-medium text-gray-900">跟进中</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-100">
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-去询价.png')} className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-50 transition-colors">去询价</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-去拜访.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">去拜访</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-咨询核保.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">咨询核保</button>
                        <div className="relative">
                          <button
                            onClick={() => setShowMoreMenu(!showMoreMenu)}
                            className="p-1.5 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                          {showMoreMenu && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[140px]">
                              {[
                                { name: '编辑商机', img: '商机-编辑商机.png' },
                                { name: '保险计划书', img: '商机-保险计划书.png' },
                                { name: '申请核保陪展', img: '商机-申请核保陪展.png' },
                                { name: '申请理赔陪展', img: '商机-申请理赔陪展.png' },
                                { name: '商机改派', img: '商机-商机改派.png' },
                              ].map(item => (
                                <button
                                  key={item.name}
                                  onClick={() => { setShowMoreMenu(false); setImagePreview('/单跳页面图片/' + item.img); }}
                                  className="w-full px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  {item.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                    </div>
                  </div>

                  {/* 商机明细 */}
                  <div className="flex justify-between items-center mt-4 mb-3">
                    <h3 className="text-sm font-bold text-gray-900">项目明细</h3>
                    <div className="relative">
                      <button
                        onClick={() => setOppFilter(prev => prev.length > 0 ? [] : ['项目'])}
                        className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${oppFilter.length > 0 ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        筛选
                      </button>
                      {oppFilter.length > 0 && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                          {['项目', '类型', '状态', '评分'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => setOppFilter(prev => prev.includes(opt) ? prev.filter(f => f !== opt) : [...prev, opt])}
                              className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-50 ${oppFilter.includes(opt) ? 'text-orange-600 bg-orange-50' : 'text-gray-700'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">蔚来集团海外工厂二期安责险项目</h4>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium whitespace-nowrap shrink-0">待询价</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">保险</span>
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">招投标</span>
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">海外</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">适销产品</div>
                          <div className="text-sm font-medium text-gray-900">安责险, 建工险</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">预估金额</div>
                          <div className="text-sm font-bold text-gray-900">¥500,000</div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-去询价.png')} className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-50 transition-colors">去询价</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-关联保单.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">关联保单</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-承保案例.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">承保案例</button>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">2026年度员工补充医疗保险续转项目</h4>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium whitespace-nowrap shrink-0">待报价</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">企康</span>
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">加购</span>
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">保险</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">适销产品</div>
                          <div className="text-sm font-medium text-gray-900">补充医疗险, 意外险</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">预估金额</div>
                          <div className="text-sm font-bold text-gray-900">¥800,000</div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-咨询核保.png')} className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-50 transition-colors">咨询核保</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-关联保单.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">关联保单</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-承保案例.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">承保案例</button>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">华南区仓储物流中心财产一切险项目</h4>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium whitespace-nowrap shrink-0">待出单</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">保险</span>
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">招投标</span>
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">加购</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">适销产品</div>
                          <div className="text-sm font-medium text-gray-900">财产一切险, 营业中断险</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">预估金额</div>
                          <div className="text-sm font-bold text-gray-900">¥200,000</div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                        <button className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-50 transition-colors">去出单</button>
                        <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">投保建议书</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-关联保单.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">关联保单</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-承保案例.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">承保案例</button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 续保 Tab */}
              {salesSubTab === '续保' && (
                <div className="space-y-4">
                  {/* 续保看板 */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-gray-900">续保看板</h3>
                    </div>
                    <div className="flex justify-around mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-0.5">应续保单</div>
                        <div className="text-base font-bold text-gray-900">3 <span className="text-xs font-normal">份</span></div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-0.5">应续保费</div>
                        <div className="text-base font-bold text-gray-900">12.5 <span className="text-xs font-normal">万</span></div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-0.5">应续产品</div>
                        <div className="text-base font-bold text-gray-900">团意险</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-0.5">最近应续</div>
                        <div className="text-base font-bold text-gray-900">26-4-15</div>
                      </div>
                    </div>
                  </div>

                  {/* 续保明细 */}
                  <div className="flex justify-between items-center mt-4 mb-3 px-1">
                    <h3 className="text-sm font-bold text-gray-900">续保明细</h3>
                    <div className="relative">
                      <button
                        onClick={() => setOppFilter(prev => prev.length > 0 ? [] : ['产品'])}
                        className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${oppFilter.length > 0 ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        筛选
                      </button>
                      {oppFilter.length > 0 && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                          {['产品', '状态'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => setOppFilter(prev => prev.includes(opt) ? prev.filter(f => f !== opt) : [...prev, opt])}
                              className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-50 ${oppFilter.includes(opt) ? 'text-orange-600 bg-orange-50' : 'text-gray-700'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {/* 续保卡片1 - 待报价 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">2026年度团体意外伤害保险</h4>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium whitespace-nowrap shrink-0">待报价</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">上年保费</div>
                          <div className="text-sm font-bold text-gray-900">8.5 <span className="text-xs font-normal">万</span></div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">截止日期</div>
                          <div className="text-sm font-medium text-gray-900">2026-04-15</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                        <div className="text-[10px] text-gray-500 mb-1">续保建议</div>
                        <div className="text-xs text-gray-700">客户去年理赔2次，但均为小额。建议重点沟通防灾防损服务，可考虑小幅优惠方案</div>
                      </div>
                      <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-100">
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-去询价.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">去询价</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/续保-续保拜访.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">续保拜访</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-申请核保陪展.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">核保陪展</button>
                        <div className="relative">
                          <button
                            onClick={() => setRenewalMoreMenu(renewalMoreMenu === 0 ? null : 0)}
                            className="p-1.5 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                          {renewalMoreMenu === 0 && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[120px]">
                              <button onClick={() => { setRenewalMoreMenu(null); setImagePreview('/单跳页面图片/续保-上年保单.png'); }} className="w-full px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-50 transition-colors">上年保单</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 续保卡片2 - 已报价 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">2026年度雇主责任险</h4>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium whitespace-nowrap shrink-0">已报价</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">上年保费</div>
                          <div className="text-sm font-bold text-gray-900">12.8 <span className="text-xs font-normal">万</span></div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">截止日期</div>
                          <div className="text-sm font-medium text-gray-900">2026-05-20</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                        <div className="text-[10px] text-gray-500 mb-1">续保建议</div>
                        <div className="text-xs text-gray-700">客户今年人员增加15%，建议按人数补缴保费并调整保额</div>
                      </div>
                      <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-100">
                        <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">继续投保</button>
                        <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">重新询价</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/续保-续保拜访.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">续保拜访</button>
                        <div className="relative">
                          <button
                            onClick={() => setRenewalMoreMenu(renewalMoreMenu === 1 ? null : 1)}
                            className="p-1.5 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                          {renewalMoreMenu === 1 && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[120px]">
                              {[
                                { name: '上年保单', img: '续保-上年保单.png' },
                                { name: '核保陪展', img: '商机-申请核保陪展.png' },
                                { name: '理赔陪展', img: null },
                              ].map(item => (
                                <button key={item.name} onClick={() => { setRenewalMoreMenu(null); if (item.img) setImagePreview('/单跳页面图片/' + item.img); }} className="w-full px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-50 transition-colors">{item.name}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 续保卡片3 - 脱保 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">2025年度财产一切险</h4>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium whitespace-nowrap shrink-0">脱保</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">上年保费</div>
                          <div className="text-sm font-bold text-gray-900">6.2 <span className="text-xs font-normal">万</span></div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">截止日期</div>
                          <div className="text-sm font-medium text-gray-900">2026-03-01</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                        <div className="text-[10px] text-gray-500 mb-1">续保建议</div>
                        <div className="text-xs text-gray-700">已脱保，建议尽快联系客户了解原因，争取挽回</div>
                      </div>
                      <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-100">
                        <button onClick={() => setImagePreview('/单跳页面图片/续保-脱保原因录入.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">脱保原因录入</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/商机-去询价.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">去询价</button>
                        <button onClick={() => setImagePreview('/单跳页面图片/续保-上年保单.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">上年保单</button>
                        <div className="relative">
                          <button
                            onClick={() => setRenewalMoreMenu(renewalMoreMenu === 2 ? null : 2)}
                            className="p-1.5 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                          {renewalMoreMenu === 2 && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[140px]">
                              {[
                                { name: '续保拜访', img: '续保-续保拜访.png' },
                                { name: '核保陪展', img: '商机-申请核保陪展.png' },
                                { name: '理赔陪展申请', img: null },
                              ].map(item => (
                                <button key={item.name} onClick={() => { setRenewalMoreMenu(null); if (item.img) setImagePreview('/单跳页面图片/' + item.img); }} className="w-full px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-50 transition-colors">{item.name}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 续保卡片4 - 已续 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">2025年度公众责任险</h4>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium whitespace-nowrap shrink-0">已续</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">上年保费</div>
                          <div className="text-sm font-bold text-gray-900">4.8 <span className="text-xs font-normal">万</span></div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">截止日期</div>
                          <div className="text-sm font-medium text-gray-900">2026-02-15</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                        <div className="text-[10px] text-gray-500 mb-1">续保建议</div>
                        <div className="text-xs text-gray-700">已完成续保，保费持平。建议持续关注客户资产变化，及时调整保额</div>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                        <button onClick={() => setImagePreview('/单跳页面图片/续保-上年保单.png')} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">查看保单</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* B2C Tab */}
              {salesSubTab === 'B2C' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">B2C商机</h3>
                    <div className="text-center py-8 text-gray-500 text-xs">
                      B2C商机内容待定
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 服务养客 */}
          {activeTab === '服务养客' && (
            <div className="space-y-4">
              {/* 一级tab - 关键人服务/企业服务 (参考销售转化二级tab样式) */}
              <div className="flex space-x-2">
                {['关键人服务', '企业服务'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setServiceTab(tab as any)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      serviceTab === tab
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {serviceTab === '关键人服务' && (
                <>
                  {/* 服务概览 - 白色底卡片 */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">服务看板</h3>
                    <div className="flex justify-around">
                      <div className="text-center cursor-pointer" onClick={() => onNavigateToServiceOverview?.('发放服务')}>
                        <div className="text-sm text-gray-500 mb-0.5">发放服务</div>
                        <div className="text-base font-bold text-gray-900 flex items-center justify-center">
                          15 <ChevronRight className="w-4 h-4 text-gray-400 ml-0.5" />
                        </div>
                      </div>
                      <div className="text-center cursor-pointer" onClick={() => onNavigateToServiceOverview?.('使用服务')}>
                        <div className="text-sm text-gray-500 mb-0.5">使用服务</div>
                        <div className="text-base font-bold text-gray-900 flex items-center justify-center">
                          8 <ChevronRight className="w-4 h-4 text-gray-400 ml-0.5" />
                        </div>
                      </div>
                      <div className="text-center cursor-pointer" onClick={() => onNavigateToServiceOverview?.('未使用的')}>
                        <div className="text-sm text-gray-500 mb-0.5">未使用的</div>
                        <div className="text-base font-bold text-gray-900 flex items-center justify-center">
                          1 <ChevronRight className="w-4 h-4 text-gray-400 ml-0.5" />
                        </div>
                      </div>
                      <div className="text-center cursor-pointer" onClick={() => onNavigateToServiceOverview?.('有评价的')}>
                        <div className="text-sm text-gray-500 mb-0.5">有评价的</div>
                        <div className="text-base font-bold text-gray-900 flex items-center justify-center">
                          2 <ChevronRight className="w-4 h-4 text-gray-400 ml-0.5" />
                        </div>
                      </div>
                    </div>
                    {/* 服务建议气泡 */}
                    <div className="mt-3 p-2 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-xs text-orange-700"><span className="font-bold">服务建议：</span>近期有2笔服务差评及1张卡券即将过期，请关注。服务过程，帮帮为你推荐以下优先跟进的服务内容</p>
                    </div>
                  </div>

                  {/* 推荐服务标题 */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900">推荐服务</h3>
                  </div>

                  <div className="space-y-3">
                      {/* 排序：红色状态(即将过期、已评价-差评)置顶，仅显示前2条 */}
                      {([...mockVouchers].sort((a, b) => {
                        const redStatuses = ['即将过期', '已评价-差评'];
                        const aIsRed = redStatuses.includes(a.status);
                        const bIsRed = redStatuses.includes(b.status);
                        if (aIsRed && !bIsRed) return -1;
                        if (!aIsRed && bIsRed) return 1;
                        return 0;
                      })).filter(v => !voucherSearchQuery || v.name.includes(voucherSearchQuery)).slice(0, 2).map((voucher, idx) => (
                        <div key={voucher.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px] mr-2">{voucher.type}</span>
                              <button
                                onClick={() => {
                                  setSelectedVoucher(voucher);
                                  setShowVoucherDetailModal(true);
                                }}
                                className="text-sm font-bold text-gray-900 flex items-center hover:text-orange-600 transition-colors"
                              >
                                {voucher.name}
                                <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-1" />
                              </button>
                            </div>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                              voucher.status === '已下发待使用' || voucher.status === '已使用待评价' ? 'bg-gray-100 text-gray-500' :
                              voucher.status === '已评价-好评' ? 'bg-green-50 text-green-600' :
                              (voucher.status === '已评价-差评' || voucher.status === '即将过期' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-500')
                            }`}>
                              {voucher.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500">所属人：<span className="text-gray-900">{voucher.owner}</span></div>
                              <div className="text-xs text-gray-500">有效期至：{voucher.expiry}</div>
                              <div className="text-xs text-gray-500">权益价值：<span className="text-orange-600 font-medium">¥{voucher.value?.toLocaleString()}</span></div>
                            </div>
                            <button
                              onClick={() => {
                                setShowShareToast(true);
                                setTimeout(() => setShowShareToast(false), 1500);
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                              {idx === 0 ? '微信转发' : idx === 1 ? '查看评价' : '微信转发'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 推荐工具 */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-bold text-gray-900 mb-3">推荐工具</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: '申请服务加投', sub: '增加服务投放力度' },
                          { name: '企康加微活动', sub: '企业健康加微活动' },
                          { name: '员工健康活动', sub: '员工健康主题活动' },
                          { name: '健康商城好礼', sub: '健康商城优惠好礼' },
                        ].map((tool, idx) => (
                          <div
                            key={idx}
                            className={`bg-white border border-gray-100 rounded-xl p-3 shadow-sm ${tool.name === '申请服务加投' ? 'cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-colors' : ''}`}
                            onClick={() => { if (tool.name === '申请服务加投') onApplyService(client); }}
                          >
                            <h5 className="text-sm font-bold text-gray-900 mb-1">{tool.name}</h5>
                            <p className="text-xs text-gray-500">{tool.sub}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                </>
              )}

              {serviceTab === '企业服务' && (
                <>
                  {/* 服务建议 */}
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-orange-700 mb-1">风险预警</h4>
                        <p className="text-xs text-orange-800 leading-relaxed">
                          系统监测到近期区域灾害频发，结合客户IOT传感器预警，建议您立即发起"风险减量"行动。邀约安全防损专家上门排查，或推送安全生产培训。通过事前预防替代事后理赔，展现您的风险管理专业形象，深度稳固客情关系。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 服务工具推荐 */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">服务工具推荐</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: '风险减量（鹰眼）', sub: '实时监控企业风险' },
                        { name: '安全生产培训', sub: '专业安全培训服务' },
                        { name: '防灾培训申请', sub: '防灾技能培训' },
                        { name: '风控服务报告', sub: '风险管理分析' },
                      ].map((tool, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl shadow-sm">
                          <h4 className="text-xs font-bold text-gray-900 mb-1">{tool.name}</h4>
                          <p className="text-[10px] text-gray-500">{tool.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Company Info Half Modal */}
      {showCompanyInfoModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowCompanyInfoModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mr-2 shadow-sm">
                  {companyInfoModalType === '经营范围' && <FileText className="w-4 h-4 text-orange-500" />}
                  {companyInfoModalType === '高管信息' && <Users className="w-4 h-4 text-orange-500" />}
                  {companyInfoModalType === '企业族谱' && <Network className="w-4 h-4 text-orange-500" />}
                  {companyInfoModalType === '新闻动态' && <Activity className="w-4 h-4 text-orange-500" />}
                  {companyInfoModalType === '智能拜访纪要' && <FileText className="w-4 h-4 text-orange-500" />}
                </div>
                <h3 className="font-bold text-gray-900">{companyInfoModalType}</h3>
              </div>
              <button 
                onClick={() => setShowCompanyInfoModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {companyInfoModalType === '经营范围' && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；软件开发；信息系统集成服务；数据处理和存储支持服务；互联网数据服务；工业互联网数据服务；人工智能基础软件开发；人工智能应用软件开发；人工智能理论与算法软件开发；物联网技术研发；物联网技术服务；信息技术咨询服务。（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）
                  </p>
                </div>
              )}
              {companyInfoModalType === '智能拜访纪要' && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3 pb-3 border-b border-gray-100">
                    <Bot className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-xs font-bold text-gray-900">AI 语音纪要提取</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {currentSummary}
                  </p>
                </div>
              )}
              {companyInfoModalType === '高管信息' && (
                <div className="space-y-3">
                  {[
                    { name: '张三', title: '法定代表人 / 董事长', desc: '全面负责公司战略规划及日常运营管理。' },
                    { name: '李四', title: '总经理', desc: '负责公司各项业务的执行与推进。' },
                    { name: '王五', title: '财务总监', desc: '负责公司财务管理、资金运作及风险控制。' },
                    { name: '赵六', title: '技术总监', desc: '负责公司核心技术研发及团队管理。' },
                    { name: '钱七', title: '运营总监', desc: '负责公司产品运营及市场推广。' }
                  ].map((person, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm mr-3 shrink-0">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-sm font-bold text-gray-900 mr-2">{person.name}</span>
                          <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{person.title}</span>
                        </div>
                        <p className="text-xs text-gray-500">{person.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {companyInfoModalType === '企业族谱' && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="relative border-l-2 border-orange-200 ml-4 space-y-6 py-2">
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-orange-500 z-10"></div>
                      <div className="text-sm font-bold text-gray-900 mb-1">母公司</div>
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">广东顺德控股集团有限公司</div>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-orange-500 z-10"></div>
                      <div className="text-sm font-bold text-gray-900 mb-1">本企业</div>
                      <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg border border-orange-100 font-medium">佛山市顺德区中大物流有限公司</div>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-orange-500 z-10"></div>
                      <div className="text-sm font-bold text-gray-900 mb-1">子公司 (3家)</div>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">广州中大供应链管理有限公司 (100%)</div>
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">深圳中大冷链物流有限公司 (80%)</div>
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">东莞中大仓储服务有限公司 (65%)</div>
                      </div>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-orange-500 z-10"></div>
                      <div className="text-sm font-bold text-gray-900 mb-1">分支机构 (2家)</div>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">佛山市顺德区中大物流有限公司容桂分公司</div>
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">佛山市顺德区中大物流有限公司大良分公司</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {companyInfoModalType === '新闻动态' && (
                <div className="space-y-3">
                  {[
                    { title: '中大物流荣获"2025年度广东省优秀物流企业"称号', date: '2026-02-28', tag: '企业荣誉' },
                    { title: '公司投资5000万建设的新一代智能仓储中心正式投入使用', date: '2026-01-15', tag: '业务发展' },
                    { title: '中大物流与某知名电商平台达成战略合作，共建绿色供应链', date: '2025-11-20', tag: '战略合作' },
                    { title: '公司开展"安全生产月"系列活动，全面提升员工安全意识', date: '2025-06-05', tag: '企业文化' }
                  ].map((news, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0 mr-2">{news.tag}</span>
                        <span className="text-[10px] text-gray-400 shrink-0">{news.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 leading-relaxed">{news.title}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {/* Claim Info Modal */}
      {showClaimModal && currentClaim && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowClaimModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">理赔详情</h3>
              <button 
                onClick={() => setShowClaimModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
                {[
                  { label: '报案号', value: currentClaim.reportNo },
                  { label: '保单号', value: currentClaim.policyNo },
                  { label: '产品名称', value: currentClaim.product },
                  { label: '报案时间', value: currentClaim.reportTime },
                  { label: '案件状态', value: currentClaim.status },
                  { label: '赔款金额', value: currentClaim.amount },
                  { label: '报案人', value: currentClaim.reporter },
                  { label: '出险日期', value: currentClaim.accidentDate },
                  { label: '出险原因', value: currentClaim.accidentReason },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {/* 基础信息弹窗 */}
      {showBasicInfoModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowBasicInfoModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">基础信息</h3>
              <button 
                onClick={() => setShowBasicInfoModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center"><Building2 className="w-4 h-4 mr-1.5 text-orange-500" /> 工商信息</h3>
                  <button className="text-xs text-orange-600 font-medium">更多</button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div><span className="text-gray-500 block mb-0.5">法定代表人</span><span className="font-medium">张三</span></div>
                  <div><span className="text-gray-500 block mb-0.5">注册资本</span><span className="font-medium">5000万人民币</span></div>
                  <div><span className="text-gray-500 block mb-0.5">成立日期</span><span className="font-medium">2010-05-12</span></div>
                  <div><span className="text-gray-500 block mb-0.5">经营状态</span><span className="font-medium text-green-600">存续</span></div>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
                  {[
                    { name: '经营范围', icon: FileText },
                    { name: '高管信息', icon: Users },
                    { name: '企业族谱', icon: Network },
                    { name: '处罚信息', icon: AlertTriangle },
                    { name: '股东信息', icon: Users },
                    { name: '分支机构', icon: Building2 },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setCompanyInfoModalType(item.name as any);
                        setShowCompanyInfoModal(true);
                      }}
                      className="flex items-center justify-center p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700 whitespace-nowrap"
                    >
                      <item.icon className="w-3.5 h-3.5 text-orange-500 mr-1.5" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 新闻动态 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center"><Activity className="w-4 h-4 mr-1.5 text-orange-500" /> 新闻动态</h3>
                  <button className="text-xs text-orange-600 font-medium">更多</button>
                </div>
                <div className="space-y-3">
                  <a href="#" className="block border-b border-gray-50 pb-2 hover:bg-gray-50 transition-colors">
                    <div className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">奥克坦姆系统科技（苏州）有限公司荣获“2025年度高新技术企业”称号</div>
                    <div className="text-[10px] text-gray-500 flex justify-between">
                      <span>苏州日报</span>
                      <span>2026-03-15</span>
                    </div>
                  </a>
                  <a href="#" className="block border-b border-gray-50 pb-2 hover:bg-gray-50 transition-colors">
                    <div className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">公司扩大生产规模，二期厂房正式投入使用</div>
                    <div className="text-[10px] text-gray-500 flex justify-between">
                      <span>企业官网</span>
                      <span>2026-02-28</span>
                    </div>
                  </a>
                  <a href="#" className="block hover:bg-gray-50 transition-colors">
                    <div className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">奥克坦姆系统科技参展2026国际工业制造展览会</div>
                    <div className="text-[10px] text-gray-500 flex justify-between">
                      <span>行业新闻网</span>
                      <span>2026-01-10</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center"><Network className="w-4 h-4 mr-1.5 text-orange-500" /> 同业洞察</h3>
                </div>
                <div className="flex space-x-2 mb-4">
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] border border-gray-100">道路货物运输</span>
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] border border-gray-100">中大客群</span>
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] border border-gray-100">客户数: 445</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-2 py-2 font-medium rounded-l-lg">Top3 成交产品</th>
                        <th className="px-2 py-2 font-medium">成交占比</th>
                        <th className="px-2 py-2 font-medium">客均保额</th>
                        <th className="px-2 py-2 font-medium rounded-r-lg">近3年赔付率</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="px-2 py-2.5 font-medium text-gray-900">安徽车主无忧</td>
                        <td className="px-2 py-2.5 text-gray-600">45%</td>
                        <td className="px-2 py-2.5 text-gray-600">200万</td>
                        <td className="px-2 py-2.5 text-orange-600 font-medium">68%</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2.5 font-medium text-gray-900">道路运输险</td>
                        <td className="px-2 py-2.5 text-gray-600">32%</td>
                        <td className="px-2 py-2.5 text-gray-600">150万</td>
                        <td className="px-2 py-2.5 text-gray-900">42%</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2.5 font-medium text-gray-900">交通责任险</td>
                        <td className="px-2 py-2.5 text-gray-600">18%</td>
                        <td className="px-2 py-2.5 text-gray-600">100万</td>
                        <td className="px-2 py-2.5 text-gray-900">35%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="w-full mt-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">查看更多</button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* 合作信息 Modal */}
      {showCoopInfoModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[60] transition-opacity max-w-[430px] mx-auto" onClick={() => setShowCoopInfoModal(false)} />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-2xl z-[70] flex flex-col max-h-[85vh] shadow-xl transform transition-transform">
            <div className="flex justify-between items-center px-4 py-3 bg-white rounded-t-2xl border-b border-gray-100 shrink-0">
              <h3 className="text-base font-bold text-gray-900">合作信息</h3>
              <button onClick={() => setShowCoopInfoModal(false)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center"><Briefcase className="w-4 h-4 mr-1.5 text-orange-500" /> 保险合作</h3>
                  <div className="flex bg-gray-200 rounded-full p-0.5">
                    <button onClick={() => setCoopScope('我司')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${coopScope === '我司' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>我司</button>
                    <button onClick={() => setCoopScope('我的')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${coopScope === '我的' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>我的</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-gray-400">团非产品合作数据，更新截止2026-03-18</span>
                    <select className="text-xs border-gray-200 rounded-md text-gray-600 py-1 pl-2 pr-6">
                      <option>近三年</option>
                      <option>2026年</option>
                      <option>2025年</option>
                      <option>2024年</option>
                    </select>
                  </div>
                  
                  {coopScope === '我的' ? (
                    <div className="space-y-4">
                      {/* 保单管理 */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 mb-2">保单管理</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="text-[10px] text-gray-500 mb-1">在保保单</div>
                            <div className="text-lg font-bold text-gray-900 flex items-center">
                              12 <span className="text-[10px] font-normal ml-1">份</span>
                              <ChevronRight className="w-3 h-3 text-gray-400 ml-auto" />
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="text-[10px] text-gray-500 mb-1">在保保费</div>
                            <div className="text-lg font-bold text-gray-900">35.6 <span className="text-[10px] font-normal">万</span></div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="text-[10px] text-gray-500 mb-1">最近承保时间</div>
                            <div className="text-sm font-bold text-gray-900 mt-1">2026-01-15</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 续保管理 */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 mb-2">续保管理</h4>
                        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500">应续保单: <span className="text-sm font-bold text-gray-900">3 份</span></div>
                          <div className="text-xs text-gray-500">应续保费: <span className="text-sm font-bold text-gray-900">12.5 万</span></div>
                          <div className="text-xs text-gray-500">应续时间: <span className="text-sm font-bold text-orange-600">2026-04-15</span></div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      {/* 经代公司管理 */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 mb-2">经代公司管理</h4>
                        <div className="space-y-2">
                          {[
                            { name: '明亚保险经纪', years: '3年', premium: '45.6万', lossRatio: '38.5%' },
                            { name: '大同保险经纪', years: '2年', premium: '28.3万', lossRatio: '52.1%' },
                          ].map((company, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                              <div className="text-sm font-medium text-gray-900 flex items-center">
                                {company.name}
                                <ChevronRight className="w-4 h-4 text-gray-400 ml-1" />
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-xs text-gray-500">合作<span className="font-medium text-gray-700">{company.years}</span></div>
                                <div className="text-xs text-gray-500">保费<span className="font-medium text-gray-700">{company.premium}</span></div>
                                <div className="text-xs text-gray-500">赔付<span className="font-medium text-gray-700">{company.lossRatio}</span></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* 承保信息 */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 mb-2">承保信息</h4>
                        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500">保单数: <span className="text-sm font-bold text-gray-900">45 份</span></div>
                          <div className="text-xs text-gray-500">保费: <span className="text-sm font-bold text-gray-900">128.2 万</span></div>
                          <div className="text-xs text-gray-500">在保保费: <span className="text-sm font-bold text-gray-900">85.6 万</span></div>
                        </div>
                      </div>
                      
                      {/* 赔付信息 */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 mb-2">赔付信息</h4>
                        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500">行业赔付率: <span className="text-sm font-bold text-gray-900">65%</span></div>
                          <div className="text-xs text-gray-500">客户赔付率: <span className="text-sm font-bold text-orange-600">45.2%</span></div>
                          <div className="text-xs text-gray-500">理赔状态: <span className="text-sm font-bold text-green-600">案件已结</span></div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      {/* 经代公司 */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 mb-2">经代公司</h4>
                        <div className="space-y-2">
                          {[
                            { name: '明亚保险经纪', years: '3年', premium: '45.6万', lossRatio: '38.5%' },
                            { name: '大同保险经纪', years: '2年', premium: '28.3万', lossRatio: '52.1%' },
                          ].map((company, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                              <div className="text-sm font-medium text-gray-900 flex items-center">
                                {company.name}
                                <ChevronRight className="w-4 h-4 text-gray-400 ml-1" />
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-xs text-gray-500">合作<span className="font-medium text-gray-700">{company.years}</span></div>
                                <div className="text-xs text-gray-500">保费<span className="font-medium text-gray-700">{company.premium}</span></div>
                                <div className="text-xs text-gray-500">赔付<span className="font-medium text-gray-700">{company.lossRatio}</span></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center"><Activity className="w-4 h-4 mr-1.5 text-orange-500" /> 企康合作</h3>
                  <div className="flex bg-gray-200 rounded-full p-0.5">
                    <button onClick={() => setQikangTab('企业达成')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${qikangTab === '企业达成' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>企业达成</button>
                    <button onClick={() => setQikangTab('员工活化')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${qikangTab === '员工活化' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>员工活化</button>
                  </div>
                </div>
                <div className="px-4 py-2 text-[10px] text-gray-400 border-b border-gray-100">口径说明：数据截止2026-03-18</div>
                <div className="p-4">
                  {qikangTab === '企业达成' ? (
                    <>
                      <h4 className="text-xs font-bold text-gray-900 mb-2">核心指标</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500">消耗率: <span className="text-sm font-bold text-gray-900">85%</span></div>
                          <div className="text-xs text-gray-500">活化率: <span className="text-sm font-bold text-gray-900">78%</span></div>
                        </div>
                      </div>
                      
                      <h4 className="text-xs font-bold text-gray-900 mb-2">规模余额</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500">缴费规模: <span className="text-sm font-bold text-gray-900">500 万元</span></div>
                          <div className="text-xs text-gray-500">集体保障余额: <span className="text-sm font-bold text-gray-900">120 万元</span></div>
                          <div className="text-xs text-gray-500">个人保障余额: <span className="text-sm font-bold text-gray-900">80 万元</span></div>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 mb-2">消费明细</h4>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <div className="text-[10px] text-gray-500 mb-1">线上商城</div>
                          <div className="text-xs font-bold text-gray-900">150<span className="text-[9px] font-normal ml-0.5">万</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <div className="text-[10px] text-gray-500 mb-1">线下商户</div>
                          <div className="text-xs font-bold text-gray-900">80<span className="text-[9px] font-normal ml-0.5">万</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <div className="text-[10px] text-gray-500 mb-1">健管</div>
                          <div className="text-xs font-bold text-gray-900">50<span className="text-[9px] font-normal ml-0.5">万</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <div className="text-[10px] text-gray-500 mb-1">理赔</div>
                          <div className="text-xs font-bold text-gray-900">20<span className="text-[9px] font-normal ml-0.5">万</span></div>
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-gray-400 text-center mb-4">当年委托消费概览，数据截止2026-03-18</div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">分享加微活动</button>
                        <button className="flex-1 py-2 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">到企活动</button>
                        <button className="flex-1 py-2 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">企业内宣</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-[10px] text-gray-500 mb-1">受益人数</div>
                          <div className="text-lg font-bold text-gray-900">500 <span className="text-[10px] font-normal">人</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-[10px] text-gray-500 mb-1">迁移率</div>
                          <div className="text-lg font-bold text-gray-900">92%</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-[10px] text-gray-500 mb-1">激活率</div>
                          <div className="text-lg font-bold text-gray-900">78%</div>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 mb-2">员工基础画像</h4>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <div className="text-[10px] text-gray-500 mb-1">平均余额</div>
                          <div className="text-sm font-bold text-gray-900">1600<span className="text-[9px] font-normal ml-0.5">元</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <div className="text-[10px] text-gray-500 mb-1">平均年龄</div>
                          <div className="text-sm font-bold text-gray-900">35<span className="text-[9px] font-normal ml-0.5">岁</span></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <div className="text-[10px] text-gray-500 mb-1">男女比例</div>
                          <div className="text-sm font-bold text-gray-900">6:4</div>
                        </div>
                      </div>

                      <button className="w-full py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mb-4">查看全部受益人</button>
                      
                      <div className="text-[10px] text-gray-400 text-center mb-4">企业下受益人迁移活化数据，数据截止2026-03-18</div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button className="py-2 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">受益人打标</button>
                        <button className="py-2 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">分享加微活动</button>
                        <button className="py-2 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">到企活动</button>
                        <button className="py-2 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">企业内宣</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[80] max-w-[430px] mx-auto"
            onClick={() => setShowAIAssistant(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-3xl z-[90] flex flex-col h-[70vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">AI展业助手帮帮</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors">
                  <History className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Initial greeting */}
              {aiMessages.length === 0 && (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-800 leading-relaxed">
                      你好，我是你的AI展业助手帮帮，关于{client.name}，你有什么想要了解的吗？
                    </div>
                  </div>
                  <div className="pl-11 space-y-2">
                    <button
                      onClick={() => setAiInput('帮我洞察客户风险')}
                      className="block w-full text-left px-4 py-2.5 bg-gray-100 text-gray-700 text-sm rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      帮我洞察客户风险
                    </button>
                    <button
                      onClick={() => setAiInput('总结一下公司动态及要闻')}
                      className="block w-full text-left px-4 py-2.5 bg-gray-100 text-gray-700 text-sm rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      总结一下公司动态及要闻
                    </button>
                    <button
                      onClick={() => setAiInput('帮我生成拜访手持')}
                      className="block w-full text-left px-4 py-2.5 bg-gray-100 text-gray-700 text-sm rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      帮我生成拜访手持
                    </button>
                  </div>
                </>
              )}

              {/* Chat messages */}
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl shadow-sm border text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-orange-500 text-white rounded-tr-none'
                      : 'bg-white border-gray-100 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {aiTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Function Buttons */}
            <div className="px-4 pb-2 shrink-0">
              <div className="flex gap-2 overflow-x-auto">
                <button className="px-4 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-full shrink-0 hover:bg-orange-50 transition-colors">
                  深度思考
                </button>
                <button className="px-4 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-full shrink-0 hover:bg-orange-50 transition-colors">
                  苏州智能体
                </button>
                <button className="px-4 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-full shrink-0 hover:bg-orange-50 transition-colors">
                  新建对话
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && aiInput.trim()) {
                      const userMsg = aiInput;
                      setAiMessages(prev => [...prev, { role: 'user', content: userMsg }]);
                      setAiInput('');
                      // Simulate AI response
                      setAiTyping(true);
                      setTimeout(() => {
                        setAiTyping(false);
                        setAiMessages(prev => [...prev, { role: 'assistant', content: `已收到：${userMsg}，这是模拟回复。` }]);
                      }, 1500);
                    }
                  }}
                  placeholder="发消息或按住说话.."
                  className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder-gray-400"
                />
                <button
                  onClick={() => {
                    if (aiInput.trim()) {
                      const userMsg = aiInput;
                      setAiMessages(prev => [...prev, { role: 'user', content: userMsg }]);
                      setAiInput('');
                      // Simulate AI response
                      setAiTyping(true);
                      setTimeout(() => {
                        setAiTyping(false);
                        setAiMessages(prev => [...prev, { role: 'assistant', content: `已收到：${userMsg}，这是模拟回复。` }]);
                      }, 1500);
                    }
                  }}
                  className="p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full ml-2 hover:opacity-90 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 时光轴弹窗 */}
      {showTimelineModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowTimelineModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">互动时光轴</h3>
              <button
                onClick={() => setShowTimelineModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-2">
                  {['拜访记录', '服务使用', '入企记录'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimelineFilter(filter as any)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        timelineFilter === filter
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
                  {timelineFilter === '服务使用' && mockServiceRecords.map((record, idx) => {
                    return (
                      <div key={record.id} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-orange-500 ring-4 ring-white z-10"></div>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 relative overflow-hidden">
                          <div className="flex justify-between items-start mb-3 relative z-0">
                            <div className="pr-12">
                              <div className="text-xs font-bold text-gray-900">{record.title}</div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{record.date}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                              record.channel === '队伍申请' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100'
                            }`}>
                              {record.channel}
                            </span>
                          </div>
                          <div className="space-y-2 relative z-0">
                            {record.services.map(s => {
                              const evaluatedNode = s.history.find(h => h.status === '已评价');
                              const maskName = (name?: string) => {
                                if (!name) return '';
                                if (name.length <= 2) return name.charAt(0) + '*';
                                return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
                              };
                              return (
                                <div key={s.id} className="bg-white p-2.5 rounded-lg border border-gray-100 flex flex-col">
                                  <div className="flex justify-between items-start mb-1.5">
                                    <span className="text-[11px] font-bold text-gray-800 flex-1 pr-2">{s.name}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                                      s.currentStatus === '已评价' ? 'bg-green-50 text-green-600' :
                                      s.currentStatus === '待评价' ? 'bg-orange-50 text-orange-600' :
                                      s.currentStatus === '待使用' ? 'bg-blue-50 text-blue-600' :
                                      'bg-gray-100 text-gray-600'
                                    }`}>
                                      {s.currentStatus}
                                    </span>
                                  </div>
                                  {(s.currentStatus === '已评价' || s.currentStatus === '待评价') && (s.userName || s.reviewerName) && (
                                    <div className="flex space-x-3 text-[10px] text-gray-500 mb-1.5">
                                      {s.userName && <span>使用人: {maskName(s.userName)}</span>}
                                      {s.reviewerName && <span>评价人: {maskName(s.reviewerName)}</span>}
                                    </div>
                                  )}
                                  {s.currentStatus === '已评价' && evaluatedNode && (
                                    <div className="mt-1 pt-2 border-t border-gray-50">
                                      <div className="flex items-center space-x-1 mb-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                          <Star key={star} className={`w-3 h-3 ${star <= (evaluatedNode.rating || 0) ? 'text-orange-400 fill-orange-400' : 'text-gray-200 fill-gray-200'}`} />
                                        ))}
                                      </div>
                                      <p className="text-[10px] text-gray-500 line-clamp-2">{evaluatedNode.feedback}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {timelineFilter === '拜访记录' && (
                    <>
                      <div className="relative pl-6 mb-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-purple-500 ring-4 ring-white z-10 flex items-center justify-center">
                          <Sparkles className="w-2.5 h-2.5 text-purple-500" />
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-3 border border-purple-100">
                          <div className="flex items-center mb-2">
                            <Sparkles className="w-4 h-4 text-purple-600 mr-1.5" />
                            <h4 className="text-xs font-bold text-purple-900">AI智能总结</h4>
                          </div>
                          <p className="text-[11px] text-purple-800 leading-relaxed">
                            近期客户沟通频繁，重点关注员工福利提升及海外项目风险保障。客户对企康方案表现出较高兴趣，建议下步重点跟进高管医疗险报价及海外工厂安责险的招投标进展。
                          </p>
                        </div>
                      </div>
                      {mockVisitRecords.map((record, idx) => {
                        return (
                          <div key={record.id} className="relative pl-6 mb-6 last:mb-0">
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white z-10"></div>
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="text-xs font-bold text-gray-900">{record.title}</div>
                                  <div className="text-[10px] text-gray-500 mt-0.5">{record.date}</div>
                                </div>
                                <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded text-orange-600 text-[10px] font-bold border border-orange-100">
                                  <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                                  <span>{record.score}星</span>
                                </div>
                              </div>
                              <div className="text-[11px] text-gray-700 mb-3 bg-white p-2 rounded-lg border border-gray-100">
                                {record.result}
                              </div>
                              <button
                                onClick={() => {
                                  setCurrentSummary(record.summary);
                                  setCompanyInfoModalType('智能拜访纪要');
                                  setShowCompanyInfoModal(true);
                                }}
                                className="w-full py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
                              >
                                <FileText className="w-3.5 h-3.5 mr-1.5" />
                                查看智能拜访纪要
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}

                  {timelineFilter === '入企记录' && mockEntryRecords.map((record, idx) => {
                    return (
                      <div key={record.id} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-green-500 ring-4 ring-white z-10"></div>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex justify-between items-center">
                          <div>
                            <div className="text-xs font-bold text-gray-900">{record.title}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5">{record.date}</div>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-medium ${
                            record.status === '已完成' ? 'bg-green-50 text-green-600 border border-green-100' :
                            record.status === '进行中' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI机器人悬浮按钮 - 右下角常驻 */}
      <button
        onClick={() => setShowAIAssistant(true)}
        className="fixed bottom-24 right-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all z-40 flex items-center justify-center"
        style={{ right: 'calc(50% - 215px + 16px)' }}
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* 关注成功Toast */}
      {showFollowToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white px-6 py-3 rounded-lg text-sm z-50">
          {followToastMessage}
        </div>
      )}

      {/* 分享Toast */}
      {showShareToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white px-6 py-3 rounded-lg text-sm z-50">
          即将拉起微信进行分享..
        </div>
      )}

      {/* 卡券详情弹窗 */}
      {showVoucherDetailModal && selectedVoucher && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowVoucherDetailModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white rounded-t-3xl z-50 flex flex-col max-h-[70vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">卡券详情</h3>
              <button
                onClick={() => setShowVoucherDetailModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <div className="bg-orange-50 rounded-xl p-4">
                <h4 className="text-base font-bold text-gray-900 mb-2">{selectedVoucher.name}</h4>
                <div className="flex gap-2">
                  <span className="text-[10px] text-orange-600 bg-orange-100 px-2 py-0.5 rounded">{selectedVoucher.category1}</span>
                  <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{selectedVoucher.category2}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">卡券名称</span>
                  <span className="text-sm text-gray-900">{selectedVoucher.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">一级分类</span>
                  <span className="text-sm text-gray-900">{selectedVoucher.category1}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">二级分类</span>
                  <span className="text-sm text-gray-900">{selectedVoucher.category2}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">截止时间</span>
                  <span className="text-sm text-gray-900">{selectedVoucher.expiry}</span>
                </div>
                <div className="py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1">卡券用途</span>
                  <span className="text-sm text-gray-900">{selectedVoucher.usage}</span>
                </div>
                <div className="py-2">
                  <span className="text-xs text-gray-500 block mb-1">使用说明</span>
                  <span className="text-sm text-gray-700">{selectedVoucher.instructions}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 理赔记录弹窗 */}
      {showClaimListModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowClaimListModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">理赔记录</h3>
              <button
                onClick={() => setShowClaimListModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {/* 核心指标 */}
              <div className="bg-white rounded-xl p-4 flex justify-around">
                <div className="text-center">
                  <div className="text-[11px] text-gray-500 mb-1">当年赔付率</div>
                  <div className="text-xl font-bold" style={{ color: colors.brand }}>45.2%</div>
                </div>
                <div className="text-center">
                  <div className="text-[11px] text-gray-500 mb-1">行业赔付率</div>
                  <div className="text-xl font-bold text-gray-900">62.8%</div>
                </div>
                <div className="text-center">
                  <div className="text-[11px] text-gray-500 mb-1">未决案件数</div>
                  <div className="text-xl font-bold text-gray-900">3件</div>
                </div>
              </div>

              {/* 理赔记录列表 */}
              <div className="space-y-3">
                {[
                  { title: '员工工伤骨折理赔', reportNo: 'BA20260215001', date: '2026-02-15', status: '已结案', amount: '¥50,000' },
                  { title: '厂房漏水财产损失', reportNo: 'BA20260301002', date: '2026-03-01', status: '处理中', amount: '¥20,000' },
                  { title: '车辆碰撞三者损失', reportNo: 'BA20260315003', date: '2026-03-15', status: '已结案', amount: '¥35,000' },
                  { title: '仓库货物被盗', reportNo: 'BA20260320004', date: '2026-03-20', status: '已结案', amount: '¥80,000' },
                  { title: '员工意外伤害', reportNo: 'BA20260325005', date: '2026-03-25', status: '处理中', amount: '¥15,000' },
                  { title: '设备损坏理赔', reportNo: 'BA20260328006', date: '2026-03-28', status: '已结案', amount: '¥42,000' },
                  { title: '自然灾害损失', reportNo: 'BA20260401007', date: '2026-04-01', status: '处理中', amount: '¥120,000' },
                ].map((record, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{record.title}</h4>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        record.status === '已结案'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 mb-1">报案号: {record.reportNo} | {record.date}</div>
                    <div className="text-xs font-medium" style={{ color: record.status === '已结案' ? colors.success : colors.warning }}>
                      {record.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 关注成功Toast */}
      {showFollowToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white px-6 py-3 rounded-lg text-sm z-50">
          {followToastMessage}
        </div>
      )}

      {/* 客户洞察弹窗 */}
      {showInsightModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowInsightModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">客户洞察</h3>
              <button
                onClick={() => setShowInsightModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {/* 加载状态 */}
              {!insightComplete && !insightLoading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">客户洞察分析</h3>
                  <p className="text-xs text-gray-500 mb-4">通过联网查询企查查、中国招投标等公开信息获取客户全方位洞察</p>
                  <button
                    onClick={loadCustomerInsights}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors"
                  >
                    开始分析
                  </button>
                </div>
              )}

              {/* 加载中状态 */}
              {insightLoading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-500 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">正在分析中...</h3>
                  <p className="text-xs text-gray-500">{insightProgress}</p>
                </div>
              )}

              {/* 客户洞察内容 */}
              {insightComplete && (
                <div className="space-y-4">
                  {/* 客户概况 */}
                  {customerOverview && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <Building2 className="w-4 h-4 mr-1.5 text-orange-500" />
                        客户概况
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 w-16 shrink-0">行业：</span>
                          <span className="text-xs text-gray-900">{customerOverview.industry}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 w-16 shrink-0">经营：</span>
                          <span className="text-xs text-gray-900">{customerOverview.businessStatus}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-xs text-gray-500 w-16 shrink-0">主业：</span>
                          <span className="text-xs text-gray-900">{customerOverview.mainBusiness}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 最新动态 */}
                  {latestNews.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <FileText className="w-4 h-4 mr-1.5 text-orange-500" />
                        最新动态
                      </h3>
                      <div className="space-y-3">
                        {latestNews.map((news, idx) => (
                          <div key={idx} className="border-l-2 border-orange-200 pl-3">
                            <div className="text-xs font-medium text-gray-900">{news.title}</div>
                            <div className="text-[10px] text-gray-500 mt-1">{news.summary}</div>
                            <div className="text-[10px] text-gray-400 mt-1">{news.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 行业分析及保险建议 */}
                  {industryAnalysis && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <TrendingUp className="w-4 h-4 mr-1.5 text-orange-500" />
                        行业分析及保险建议
                      </h3>
                      <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                        {industryAnalysis}
                      </div>
                    </div>
                  )}

                  {/* 企业关键人 */}
                  {keyPersons.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <Users className="w-4 h-4 mr-1.5 text-orange-500" />
                        企业关键人
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {keyPersons.map((person, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-2.5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-900">{person.name}</span>
                              <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded">{person.role}</span>
                            </div>
                            <div className="text-[10px] text-gray-500">{person.bio}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 客户招投标项目 */}
                  {biddingProjects.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <Briefcase className="w-4 h-4 mr-1.5 text-orange-500" />
                        客户招投标项目
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">项目名称</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">险种</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">发布日期</th>
                              <th className="text-right px-2 py-1.5 font-medium text-gray-500">招标金额</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-500">中标单位</th>
                              <th className="text-center px-2 py-1.5 font-medium text-gray-500">共保</th>
                              <th className="text-right px-2 py-1.5 font-medium text-gray-500">中标金额</th>
                            </tr>
                          </thead>
                          <tbody>
                            {biddingProjects.map((project, idx) => (
                              <tr key={idx} className="border-t border-gray-100">
                                <td className="px-2 py-1.5 text-gray-900">{project.projectName}</td>
                                <td className="px-2 py-1.5 text-gray-700">{project.insuranceType}</td>
                                <td className="px-2 py-1.5 text-gray-500">{project.publishDate}</td>
                                <td className="px-2 py-1.5 text-gray-900 text-right">{project.bidAmount}</td>
                                <td className="px-2 py-1.5 text-gray-700">{project.winner}</td>
                                <td className="px-2 py-1.5 text-center">
                                  <span className={`px-1.5 py-0.5 rounded ${project.isCoInsured === '是' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {project.isCoInsured}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-gray-900 text-right">{project.winAmount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 过往合作问题 */}
                  {cooperationIssues.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <AlertTriangle className="w-4 h-4 mr-1.5 text-orange-500" />
                        过往合作问题
                      </h3>
                      <div className="space-y-3">
                        {cooperationIssues.map((issue, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs font-medium text-gray-900 mb-2">{issue.project}</div>
                            <div className="mb-2">
                              <span className="text-[10px] text-gray-500 font-medium">问题：</span>
                              <div className="text-[10px] text-gray-700 whitespace-pre-line mt-1">{issue.issues}</div>
                            </div>
                            <div>
                              <span className="text-[10px] text-orange-600 font-medium">推进建议：</span>
                              <div className="text-[10px] text-gray-700 mt-1">{issue.suggestions}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 话术要点总结 */}
                  {speechPoints.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                        <MessageSquare className="w-4 h-4 mr-1.5 text-orange-500" />
                        话术要点总结
                      </h3>
                      <div className="space-y-3">
                        {speechPoints.map((item, idx) => (
                          <div key={idx} className="bg-orange-50 rounded-xl p-3">
                            <div className="text-xs font-medium text-orange-700 mb-1">{item.level}</div>
                            <div className="text-[10px] text-gray-700 whitespace-pre-line">{item.points}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 重新加载按钮 */}
                  <div className="text-center pt-2">
                    <button
                      onClick={() => {
                        setInsightComplete(false);
                        setInsightLoading(false);
                      }}
                      className="px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      重新分析
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 服务工具弹窗 */}
      {showServiceToolsModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowServiceToolsModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-50 rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">服务工具</h3>
              <button
                onClick={() => setShowServiceToolsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: '申请服务加投', sub: '增加服务投放力度' },
                  { name: '企康加微活动', sub: '企业健康加微活动' },
                  { name: '员工健康活动', sub: '员工健康主题活动' },
                  { name: '健康商城好礼', sub: '健康商城优惠好礼' },
                ].map((tool, idx) => (
                  <div
                    key={idx}
                    className={`bg-white p-3 rounded-xl shadow-sm ${tool.name === '申请服务加投' ? 'cursor-pointer hover:bg-orange-50 transition-colors' : ''}`}
                    onClick={() => { if (tool.name === '申请服务加投') { setShowServiceToolsModal(false); onApplyService(client); } }}
                  >
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{tool.name}</h4>
                    <p className="text-xs text-gray-500">{tool.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 图片预览 */}
      {imagePreview && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center max-w-[430px] mx-auto cursor-pointer"
          onClick={() => setImagePreview(null)}
        >
          <img
            src={imagePreview}
            alt="预览"
            className="max-w-[90%] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
          />
        </div>
      )}
    </div>
  );
}