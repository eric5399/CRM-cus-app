import React, { useState } from 'react';
import { ChevronLeft, Star, Sparkles, FileText, X, ChevronRight } from 'lucide-react';
import { mockServiceRecords, mockVisitRecords, mockEntryRecords } from '../data/mockData';

interface TimelinePageProps {
  client: { name: string };
  onBack: () => void;
}

type TimelineFilter = '拜访记录' | '服务记录' | '入企记录';

export default function TimelinePage({ client, onBack }: TimelinePageProps) {
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('拜访记录');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<string>('');

  const handleViewSummary = (summary: string) => {
    setCurrentSummary(summary);
    setShowSummaryModal(true);
  };

  const visitTitles = ['商机拜访', '续保拜访', '商机拜访'];

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
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">互动时光轴</h1>
        <div className="w-9" />
      </header>

      {/* Tab Bar - 一级tab样式 */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-10">
        <div className="flex">
          {(['拜访记录', '服务记录', '入企记录'] as TimelineFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimelineFilter(filter)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                timelineFilter === filter
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50/30'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* 拜访记录 */}
        {timelineFilter === '拜访记录' && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
                {/* AI智能总结 */}
                <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-3 border border-purple-100 mb-6">
                  <div className="flex items-center mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600 mr-1.5" />
                    <h4 className="text-xs font-bold text-purple-900">AI智能总结</h4>
                  </div>
                  <p className="text-[11px] text-purple-800 leading-relaxed">
                    近期客户沟通频繁，重点关注员工福利提升及海外项目风险保障。客户对企康方案表现出较高兴趣，建议下步重点跟进高管医疗险报价及海外工厂安责险的招投标进展。
                  </p>
                </div>

                {/* 拜访记录列表 */}
                {mockVisitRecords.map((record, idx) => (
                  <div key={record.id} className="relative pl-6 mb-6 last:mb-0">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white z-10"></div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1">
                          <div className="text-xs font-bold text-gray-900">{visitTitles[idx] || record.title}</div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5 mb-2">{record.date}</div>
                      <div className="text-[11px] text-gray-700 mb-3 bg-white p-2 rounded-lg border border-gray-100">
                        {record.result}
                      </div>
                      <button
                        onClick={() => handleViewSummary(record.summary)}
                        className="w-full py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1.5" />
                        查看智能拜访纪要
                      </button>
                    </div>
                  </div>
                ))}

                {/* 加载更多 */}
                <div className="flex justify-center pt-2">
                  <button className="px-6 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    加载更多
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 服务记录 */}
        {timelineFilter === '服务记录' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
              {/* AI智能总结 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 mb-6">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600 mr-1.5" />
                  <h4 className="text-xs font-bold text-blue-900">AI智能总结</h4>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  客户对服务权益使用活跃，机场贵宾厅、健康讲座等高频使用，整体服务满意度良好。近期有新的体检套餐和洗车权益转发记录，建议持续跟进服务使用反馈。
                </p>
              </div>

              {/* 服务使用节点 */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white z-10"></div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-xs font-bold text-gray-900">服务使用</div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2">2026-03-15 14:30</div>
                  <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                    <div className="text-[11px] text-gray-700">关键人宝德龙使用了'机场贵宾厅'权益</div>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-3 h-3 text-orange-400 fill-orange-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 转发权益节点 */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white z-10"></div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-xs font-bold text-gray-900">转发权益</div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2">2026-03-10 09:15</div>
                  <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                    <div className="text-[11px] text-gray-700">业务员黄丽丽转发了'车主尊享洗车体验卡'</div>
                  </div>
                </div>
              </div>

              {/* 新增节点1：健康讲座 */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white z-10"></div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-xs font-bold text-gray-900">服务使用</div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2">2026-02-28 10:00</div>
                  <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                    <div className="text-[11px] text-gray-700">关键人李明华使用了'员工健康大讲堂'服务</div>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4].map(star => (
                        <Star key={star} className="w-3 h-3 text-orange-400 fill-orange-400" />
                      ))}
                      {[5].map(star => (
                        <Star key={star} className="w-3 h-3 text-gray-200 fill-gray-200" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 新增节点2：高管体检 */}
              <div className="relative pl-6 mb-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white z-10"></div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-xs font-bold text-gray-900">转发权益</div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2">2026-02-20 16:45</div>
                  <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                    <div className="text-[11px] text-gray-700">业务员王芳转发了'高管体检套餐'体验券</div>
                  </div>
                </div>
              </div>

              {/* 查看全部 */}
              <div className="flex justify-center pt-2">
                <button className="px-6 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  查看全部
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 入企记录 */}
        {timelineFilter === '入企记录' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
              {/* AI智能总结 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 mb-6">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600 mr-1.5" />
                  <h4 className="text-xs font-bold text-blue-900">AI智能总结</h4>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  客户入企服务覆盖健康宣讲、员工活化等多场景。近期正在进行健康大讲堂活动，建议持续跟踪活动效果并推进下一步入企服务计划。
                </p>
              </div>

              {mockEntryRecords.map((record, idx) => {
                const activityTypes = ['入企服务', '宣讲培训', '职场活动'];
                return (
                  <div key={record.id} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white z-10"></div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-1">
                            <div className="text-xs font-bold text-gray-900">{record.title}</div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{activityTypes[idx] || '入企服务'}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{record.date}</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-[10px] font-medium shrink-0 ${
                          record.status === '已完成' ? 'bg-green-50 text-green-600 border border-green-100' :
                          record.status === '进行中' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 查看全部 */}
              <div className="flex justify-center pt-2">
                <button className="px-6 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  查看全部
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 智能拜访纪要弹窗 */}
      {showSummaryModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 max-w-[430px] mx-auto"
            onClick={() => setShowSummaryModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white rounded-t-3xl z-50 flex flex-col max-h-[70vh] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-gray-900">智能拜访纪要</h3>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{currentSummary}</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="w-full py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
