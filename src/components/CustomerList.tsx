/**
 * 客户管理列表页 (CustomerList)
 * 基于好帮手设计规范 v3.2
 *
 * 色彩: 品牌色 #FF6611, 主文本 #222222, 辅助文本 #737587
 * 字体: T2(34px)标题, T3(32px)列表标题, T4(28px)次要文本, T7(22px)标签
 * 圆角: 大卡片 24px, 内部卡片/按钮 12px
 * 间距: 页边距 24px, 模块间距 16px
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, ChevronDown, MapPin, ChevronRight, Star } from 'lucide-react';
import { Client } from '../types';
import { mockClients } from '../data/mockData';

interface CustomerListProps {
  onSelectClient: (client: Client) => void;
  onBack: () => void;
  onNavigateToTodo?: () => void;
}

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

export default function CustomerList({ onSelectClient, onBack, onNavigateToTodo }: CustomerListProps) {
  const [notificationIndex, setNotificationIndex] = useState(0);

  const weeklyTodos = [
    { type: '续保提醒', content: '菲林科技2个续保待跟进，剩余3天到期', action: '去处理', actionType: 'process' },
    { type: '报价查看', content: '中天农业集团团意险方案已报价', action: '去查看', actionType: 'view' },
    { type: '保费认领', content: '5个客户保费待认领', action: '去处理', actionType: 'process' },
    { type: '理赔服务', content: '深圳大唐科技有5笔报案，金额预计20w', action: '去查看', actionType: 'view' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNotificationIndex((prev) => (prev + 1) % weeklyTodos.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const primaryTabs = [
    { name: '我关注的', count: 8, status: ['全部', '待询价', '待报价', '已投保', '已出单'] },
    { name: '商机潜客', count: 38, status: ['全部', '待联系', '报价中', '投标中', '意向强'] },
    { name: '合作客户', count: 6, status: ['全部', '已续', '未续'] },
    { name: '流失客户', count: 4, status: ['全部', '已脱保待赢回', '长期脱保'] },
  ];

  const [primaryTab, setPrimaryTab] = useState('我关注的');
  const [scale, setScale] = useState('全部');
  const [status, setStatus] = useState('全部');
  const [product, setProduct] = useState('全部');
  const [industry, setIndustry] = useState('全部');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setStatus('全部');
  }, [primaryTab]);

  const scaleOptions = ['全部', '至尊', '超大', '中大', '小微', '其他'];
  const statusOptionsMap: Record<string, string[]> = {
    '我关注的': ['全部', '临近续保', '近期报案', '核保预警', '即将出单', '服务差评'],
    '商机潜客': ['全部', '待联系', '报价中', '投标中', '意向强'],
    '合作客户': ['全部', '已续', '未续'],
    '流失客户': ['全部', '已脱保待赢回', '长期脱保'],
  };
  const currentStatusOptions = statusOptionsMap[primaryTab] || [];
  const productOptions = ['全部', '团体财意险', '个人财意健险'];
  const industryOptions = [
    { name: '全部', sub: [] },
    { name: '农、林、牧、渔业', sub: ['全部', '农业', '林业', '畜牧业', '渔业'] },
    { name: '制造业', sub: ['全部', '食品制造业', '纺织业', '医药制造业', '汽车制造业'] },
    { name: '信息传输、软件和信息技术服务业', sub: ['全部', '电信、广播电视和卫星传输服务', '互联网和相关服务', '软件和信息技术服务业'] }
  ];

  const [selectedIndustryLevel1, setSelectedIndustryLevel1] = useState('全部');

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleSelectFilter = (type: string, value: string) => {
    if (type === 'scale') setScale(value);
    if (type === 'status') setStatus(value);
    if (type === 'product') setProduct(value);
    if (type === 'industry') setIndustry(value);
    if (type !== 'industryLevel1') {
      setActiveDropdown(null);
    }
  };

  const listData = [
    {
      id: '1',
      name: '奥克坦姆系统科技（苏州）有限公司',
      status: '未到期',
      policiesCount: 3,
      premium: '1.1 万元',
      date: '2026-03-31',
      clientData: { ...mockClients[0], name: '奥克坦姆系统科技（苏州）有限公司' }
    },
    {
      id: '2',
      name: '中国铁建电气化局集团有限公司',
      status: '未到期',
      policiesCount: 1,
      premium: '0 元',
      date: '2026-04-09',
      clientData: { ...(mockClients[1] || mockClients[0]), name: '中国铁建电气化局集团有限公司' }
    },
    {
      id: '3',
      name: '苏州市鼎盛广告装饰有限公司',
      status: '未到期',
      policiesCount: 1,
      premium: '530 元',
      date: '2026-04-11',
      clientData: { ...mockClients[0], name: '苏州市鼎盛广告装饰有限公司' }
    },
    {
      id: '4',
      name: '苏州市吴中区东山镇人民政府',
      status: '未到期',
      policiesCount: 4,
      premium: '12.4 万元',
      date: '2026-04-23',
      clientData: { ...mockClients[0], name: '苏州市吴中区东山镇人民政府' }
    },
    {
      id: '5',
      name: '苏州高新区（虎丘区）关心下一代工作委员会',
      status: '未到期',
      policiesCount: 1,
      premium: '9120 元',
      date: '2026-04-30',
      clientData: { ...mockClients[0], name: '苏州高新区（虎丘区）关心下一代工作委员会' }
    },
    {
      id: '6',
      name: '苏州雅运汽车租赁有限公司',
      status: '未到期',
      policiesCount: 1,
      premium: '710 元',
      date: '2026-05-09',
      clientData: { ...mockClients[0], name: '苏州雅运汽车租赁有限公司' }
    }
  ];

  const getTabData = (item: any, index: number, tab: string) => {
    // 4类标签定义
    const category1Tags = ['临近续保', '服务差评', '近期报案', '即将出单', '核保预警'];
    const category2Tags = ['至尊', '超大', '中大', '小微'];
    const category3Tags = ['保险已客', '企康已客', '保险+企康已客'];
    const category4Tags = ['近3年赔付89%', '活化率21%'];

    // 每类随机取一个
    const c1Tag = category1Tags[index % category1Tags.length];
    const c2Tag = category2Tags[index % category2Tags.length];
    const c3Tag = category3Tags[index % category3Tags.length];
    const c4Tag = category4Tags[index % category4Tags.length];

    if (tab === '我关注的') {
      const amounts = ['5 万元', '10 万元', '2 万元', '50 万元', '8 万元', '3 万元'];
      return {
        status: null,
        label1: '询价单数',
        val1: item.policiesCount,
        label2: '预估保费',
        val2: item.premium,
        label3: '预估委托金额',
        val3: amounts[index % amounts.length],
        c1Tag,
        c2Tag,
        c3Tag,
        c4Tag,
      };
    } else if (tab === '流失客户') {
      const probabilities = ['10%', '30%', '5%', '50%', '20%', '15%'];
      const days = [45, 120, 300, 60, 90, 200];
      const dates = ['2025-10-12', '2025-08-01', '2025-02-15', '2025-09-30', '2025-09-01', '2025-05-20'];
      return {
        status: `续回概率 ${probabilities[index % probabilities.length]}`,
        label1: '脱保天数',
        val1: days[index % days.length],
        label2: '应续保费',
        val2: item.premium,
        label3: '脱保时间',
        val3: dates[index % dates.length],
        c1Tag,
        c2Tag,
        c3Tag,
        c4Tag,
      };
    } else {
      return {
        status: item.status,
        label1: '应续保单',
        val1: item.policiesCount,
        label2: '应续保费',
        val2: item.premium,
        label3: '应续时间',
        val3: item.date,
        c1Tag,
        c2Tag,
        c3Tag,
        c4Tag,
      };
    }
  };

  // 第1类标签样式 - 功能标签（品牌色半透明背景+品牌色文字+品牌色边框）
  const primaryTagStyle: React.CSSProperties = {
    backgroundColor: `${colors.brand}15`,
    color: colors.brand,
    border: `1px solid ${colors.brand}40`,
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: 500,
  };

  // 第2、3、4类标签样式 - 普通标签（灰底灰字灰边框）
  const secondaryTagStyle: React.CSSProperties = {
    backgroundColor: '#F4F6F9',
    color: colors.textSecondary,
    border: '1px solid #D8DAE3',
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: 500,
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-y-auto relative">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-30 bg-white">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">客户管理</h1>
          <button className="p-2 -mr-2">
            <Search className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      </div>

      {/* Immersive Header: Notification + Toolbar */}
      <div className="bg-white px-6 pb-3">
        {/* Notification Bar */}
        <div className="rounded-xl px-4 py-2.5 overflow-hidden" style={{ backgroundColor: colors.bgNotice }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-bold" style={{ color: colors.brand }}>本周客户待办</span>
            <button
              onClick={onNavigateToTodo}
              className="flex items-center text-xs"
              style={{ color: colors.textSecondary }}
            >
              全部(5) <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="relative h-6">
            <div
              key={notificationIndex}
              className="absolute inset-0 flex items-center space-x-2"
              style={{
                animation: 'slideUp 0.4s ease-out forwards'
              }}
            >
              <span className="text-xs text-gray-700">
                【{weeklyTodos[notificationIndex].type}】
              </span>
              <span className="text-xs text-gray-700 flex-1 leading-tight truncate">{weeklyTodos[notificationIndex].content}</span>
              <button
                className="text-xs font-medium whitespace-nowrap px-2.5 py-1 rounded text-white flex-shrink-0"
                style={{ backgroundColor: colors.brand }}
              >
                {weeklyTodos[notificationIndex].action}
              </button>
            </div>
          </div>
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="sticky top-[100px] bg-white z-20 shadow-sm">
        {/* Primary Tabs */}
        <div className="flex px-6 border-b" style={{ borderColor: colors.borderLight }}>
          {primaryTabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setPrimaryTab(tab.name)}
              className={`flex-1 py-3 text-sm font-medium relative ${
                primaryTab === tab.name ? '' : ''
              }`}
              style={{
                color: primaryTab === tab.name ? colors.brand : colors.textSecondary
              }}
            >
              {tab.name}({tab.count})
              {primaryTab === tab.name && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full" style={{ backgroundColor: colors.brand }} />
              )}
            </button>
          ))}
        </div>

        {/* Filter Row - 隐藏"我关注的"tab下的状态栏筛选 */}
        {primaryTab !== '我关注的' && (
        <div className="relative">
          <div
            className="flex px-6 py-3"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            {[
              { key: 'scale', label: scale === '全部' ? '规模' : scale, value: scale },
              { key: 'status', label: status === '全部' ? '状态' : status, value: status },
              { key: 'product', label: product === '全部' ? '产品' : product, value: product },
              { key: 'industry', label: industry === '全部' ? '行业' : industry, value: industry },
              { key: 'more', label: '更多', value: '' },
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => filter.key !== 'more' && toggleDropdown(filter.key)}
                className="flex-1 flex items-center justify-center text-xs font-medium whitespace-nowrap"
                style={{
                  color: filter.value !== '全部' || activeDropdown === filter.key ? colors.brand : colors.textSecondary
                }}
              >
                {filter.label}
                {filter.key !== 'more' && <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${activeDropdown === filter.key ? 'rotate-180' : ''}`} />}
              </button>
            ))}
          </div>

          {/* Dropdowns */}
          {activeDropdown && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setActiveDropdown(null)} />
              <div
                className="absolute top-full left-0 w-full bg-white z-40 border-b overflow-y-auto"
                style={{ borderColor: colors.borderLight, maxHeight: '320px' }}
              >
                {activeDropdown === 'scale' && (
                  <div className="p-2">
                    {scaleOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleSelectFilter('scale', opt)}
                        className="block w-full text-left px-4 py-3 text-sm"
                        style={{
                          color: scale === opt ? colors.brand : colors.textPrimary,
                          backgroundColor: scale === opt ? `${colors.brand}10` : 'transparent',
                          fontWeight: scale === opt ? 500 : 400,
                          borderRadius: '12px'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {activeDropdown === 'status' && (
                  <div className="p-2">
                    {currentStatusOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleSelectFilter('status', opt)}
                        className="block w-full text-left px-4 py-3 text-sm"
                        style={{
                          color: status === opt ? colors.brand : colors.textPrimary,
                          backgroundColor: status === opt ? `${colors.brand}10` : 'transparent',
                          fontWeight: status === opt ? 500 : 400,
                          borderRadius: '12px'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {activeDropdown === 'product' && (
                  <div className="p-2">
                    {productOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleSelectFilter('product', opt)}
                        className="block w-full text-left px-4 py-3 text-sm"
                        style={{
                          color: product === opt ? colors.brand : colors.textPrimary,
                          backgroundColor: product === opt ? `${colors.brand}10` : 'transparent',
                          fontWeight: product === opt ? 500 : 400,
                          borderRadius: '12px'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {activeDropdown === 'industry' && (
                  <div className="flex h-64">
                    <div className="w-1/2 overflow-y-auto" style={{ backgroundColor: colors.bgPage }}>
                      {industryOptions.map(opt => (
                        <button
                          key={opt.name}
                          onClick={() => {
                            setSelectedIndustryLevel1(opt.name);
                            if (opt.sub.length === 0) {
                              handleSelectFilter('industry', opt.name);
                            }
                          }}
                          className="block w-full text-left px-4 py-3 text-sm"
                          style={{
                            color: selectedIndustryLevel1 === opt.name ? colors.brand : colors.textPrimary,
                            backgroundColor: selectedIndustryLevel1 === opt.name ? '#FFFFFF' : 'transparent',
                            fontWeight: selectedIndustryLevel1 === opt.name ? 500 : 400
                          }}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                    <div className="w-1/2 bg-white overflow-y-auto">
                      {industryOptions.find(opt => opt.name === selectedIndustryLevel1)?.sub.map(subOpt => (
                        <button
                          key={subOpt}
                          onClick={() => handleSelectFilter('industry', subOpt === '全部' ? selectedIndustryLevel1 : subOpt)}
                          className="block w-full text-left px-4 py-3 text-sm"
                          style={{
                            color: industry === (subOpt === '全部' ? selectedIndustryLevel1 : subOpt) ? colors.brand : colors.textPrimary,
                            fontWeight: industry === (subOpt === '全部' ? selectedIndustryLevel1 : subOpt) ? 500 : 400
                          }}
                        >
                          {subOpt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        )}
      </div>

      {/* List Content */}
      <div className="p-6 space-y-4 pb-8">
        {listData.map((item, index) => {
          const tabData = getTabData(item, index, primaryTab);
          const isFirstCard = primaryTab === '我关注的' && index === 0;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative"
              onClick={() => onSelectClient(item.clientData)}
            >
              {/* 距你最近角标 */}
              {isFirstCard && (
                <div
                  className="absolute -top-0 -right-0 pl-2 pr-2.5 py-0.5 text-xs font-medium text-white rounded-bl-xl rounded-tr-xl flex items-center space-x-0.5"
                  style={{ backgroundColor: colors.brand }}
                >
                  <MapPin className="w-2.5 h-2.5" />
                  <span>距你最近</span>
                </div>
              )}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-4">
                  <h3 className="text-base font-bold text-gray-900 leading-tight truncate flex items-center">
                    {item.name}
                    {primaryTab === '合作客户' && index < 2 && (
                      <Star className="w-3.5 h-3.5 ml-1 flex-shrink-0 fill-current" style={{ color: colors.warning }} />
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span style={primaryTagStyle}>{tabData.c1Tag}</span>
                    <span style={secondaryTagStyle}>{tabData.c2Tag}</span>
                    <span style={secondaryTagStyle}>{tabData.c3Tag}</span>
                    <span style={secondaryTagStyle}>{tabData.c4Tag}</span>
                  </div>
                </div>
                {tabData.status && (
                  <span className="text-xs font-medium whitespace-nowrap mt-0.5" style={{ color: colors.brand }}>
                    {tabData.status}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{tabData.val1}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{tabData.label1}</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {String(tabData.val2).replace(/[^0-9.]/g, '')}
                    <span className="text-xs font-normal ml-0.5">{String(tabData.val2).replace(/[0-9.]/g, '')}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">{tabData.label2}</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">{tabData.val3}</div>
                  <div className="text-[10px] text-gray-500 mt-1.5">{tabData.label3}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
