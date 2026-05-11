import React, { useState } from 'react';
import { ChevronLeft, Briefcase, Activity, HelpCircle, X, ChevronRight } from 'lucide-react';

interface CoopInfoProps {
  client: { name: string };
  onBack: () => void;
}

type CoopScopeType = '我司' | '我的';
type QikangTabType = '企业达成' | '员工活化';

export default function CoopInfo({ client, onBack }: CoopInfoProps) {
  const [coopScope, setCoopScope] = useState<CoopScopeType>('我司');
  const [qikangTab, setQikangTab] = useState<QikangTabType>('企业达成');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showQikangTooltip, setShowQikangTooltip] = useState(false);

  const tooltipContent = [
    { term: '保单数', definition: '统计周期内已生效的保单总数量' },
    { term: '保费', definition: '统计周期内已实收的保费总额' },
    { term: '赔付率', definition: '赔付金额/保费收入×100%' },
    { term: '在保保费', definition: '当前有效保单的保费合计' },
  ];

  const qikangTooltipContent = [
    { term: '消耗率', definition: '已使用额度/总额度×100%' },
    { term: '活化率', definition: '激活用户/总用户×100%' },
    { term: '缴费规模', definition: '客户缴纳的保费总额' },
    { term: '迁移率', definition: '从上一周期迁移到本周期的用户比例' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center sticky top-0 z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-900 shrink-0 -ml-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">合作信息</h1>
        <div className="w-9" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-8">
        <div className="p-4 space-y-4">
          {/* 保险合作 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900 flex items-center">
                  <Briefcase className="w-4 h-4 mr-1.5 text-orange-500" />
                  保险合作
                </h3>
                <div className="relative">
                  <button
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  {showTooltip && (
                    <div className="absolute top-8 left-0 bg-gray-900 text-white text-xs rounded-lg p-3 z-50 w-64 shadow-xl">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">指标释义</span>
                        <button onClick={() => setShowTooltip(false)} className="text-gray-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {tooltipContent.map((item, idx) => (
                          <div key={idx}>
                            <span className="text-orange-400">{item.term}</span>
                            <span className="text-gray-300 ml-1">{item.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex bg-gray-200 rounded-full p-0.5">
                <button onClick={() => setCoopScope('我司')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${coopScope === '我司' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>我司</button>
                <button onClick={() => setCoopScope('我的')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${coopScope === '我的' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>我的</button>
              </div>
            </div>
            <div className="p-4">
              {coopScope === '我司' ? (
                <div className="space-y-4">
                  {/* 承保信息 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">承保信息</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">近3年保单</div>
                        <div className="text-lg font-bold text-gray-900">45 <span className="text-[10px] font-normal">份</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">近3年保费</div>
                        <div className="text-lg font-bold text-gray-900">128.2 <span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">在保保费</div>
                        <div className="text-lg font-bold text-gray-900">85.6 <span className="text-[10px] font-normal">万</span></div>
                      </div>
                    </div>
                  </div>

                  {/* 赔付信息 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">赔付信息</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">行业赔付率</div>
                        <div className="text-lg font-bold text-gray-900">65%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">客户赔付率</div>
                        <div className="text-lg font-bold text-orange-600">45.2%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">理赔状态</div>
                        <div className="text-lg font-bold text-green-600">案件已结</div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="space-y-4">
                  {/* 保单管理 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">保单管理</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="text-[10px] text-gray-500 mb-1">在保保单</div>
                        <div className="text-lg font-bold text-gray-900">12 <span className="text-[10px] font-normal">份</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">在保保费</div>
                        <div className="text-lg font-bold text-gray-900">35.6 <span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">最近承保时间</div>
                        <div className="text-sm font-bold text-gray-900">2026-01-15</div>
                      </div>
                    </div>
                  </div>

                  {/* 续保管理 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">续保管理</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">应续保单</div>
                        <div className="text-lg font-bold text-gray-900">3 <span className="text-[10px] font-normal">份</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">应续保费</div>
                        <div className="text-lg font-bold text-gray-900">12.5 <span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">应续时间</div>
                        <div className="text-lg font-bold text-orange-600">2026-04-15</div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* 企康合作 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900 flex items-center">
                  <Activity className="w-4 h-4 mr-1.5 text-orange-500" />
                  企康合作
                </h3>
                <div className="relative">
                  <button
                    onClick={() => setShowQikangTooltip(!showQikangTooltip)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  {showQikangTooltip && (
                    <div className="absolute top-8 left-0 bg-gray-900 text-white text-xs rounded-lg p-3 z-50 w-64 shadow-xl">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">指标释义</span>
                        <button onClick={() => setShowQikangTooltip(false)} className="text-gray-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {qikangTooltipContent.map((item, idx) => (
                          <div key={idx}>
                            <span className="text-orange-400">{item.term}</span>
                            <span className="text-gray-300 ml-1">{item.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex bg-gray-200 rounded-full p-0.5">
                <button onClick={() => setQikangTab('企业达成')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${qikangTab === '企业达成' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>企业达成</button>
                <button onClick={() => setQikangTab('员工活化')} className={`px-3 py-1 text-[10px] font-medium rounded-full transition-colors ${qikangTab === '员工活化' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>员工活化</button>
              </div>
            </div>
            <div className="px-4 py-2 text-[10px] text-gray-400 border-b border-gray-100">口径说明：数据截止2026-03-18</div>
            <div className="p-4">
              {qikangTab === '企业达成' ? (
                <div className="space-y-4">
                  {/* 核心率值 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">核心率值</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">消耗率</div>
                        <div className="text-lg font-bold text-gray-900">72%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">活化率</div>
                        <div className="text-lg font-bold text-gray-900">85%</div>
                      </div>
                    </div>
                  </div>

                  {/* 规模余额 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">规模余额</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">缴费规模</div>
                        <div className="text-lg font-bold text-gray-900">128.5<span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">集体保障余额</div>
                        <div className="text-lg font-bold text-gray-900">85.6<span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">个人保障余额</div>
                        <div className="text-lg font-bold text-gray-900">42.9<span className="text-[10px] font-normal">万</span></div>
                      </div>
                    </div>
                  </div>

                  {/* 消费明细 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">消费明细</h4>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">线上商城</div>
                        <div className="text-lg font-bold text-gray-900">15.2<span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">线上商户</div>
                        <div className="text-lg font-bold text-gray-900">8.6<span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">健管</div>
                        <div className="text-lg font-bold text-gray-900">12.3<span className="text-[10px] font-normal">万</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">理赔</div>
                        <div className="text-lg font-bold text-gray-900">6.8<span className="text-[10px] font-normal">万</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 概览 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">概览</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">受益人数</div>
                        <div className="text-lg font-bold text-gray-900">186<span className="text-[10px] font-normal">人</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">迁移率</div>
                        <div className="text-lg font-bold text-gray-900">92%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">激活率</div>
                        <div className="text-lg font-bold text-gray-900">85%</div>
                      </div>
                    </div>
                  </div>

                  {/* 员工画像 */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">员工画像</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">平均余额</div>
                        <div className="text-lg font-bold text-gray-900">1280<span className="text-[10px] font-normal">元</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">平均年龄</div>
                        <div className="text-lg font-bold text-gray-900">35<span className="text-[10px] font-normal">岁</span></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1">男女比例</div>
                        <div className="text-lg font-bold text-gray-900">1.2:1</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 经代公司 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 flex items-center">
                <Briefcase className="w-4 h-4 mr-1.5 text-orange-500" />
                经代公司
              </h3>
            </div>
            <div className="p-4">
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
        </div>
      </main>
    </div>
  );
}
