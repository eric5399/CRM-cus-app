import React, { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';

type OverviewTab = '发放服务' | '使用服务' | '未使用的' | '有评价的';

interface ServiceOverviewProps {
  client: { name: string };
  onBack: () => void;
  initialTab: OverviewTab;
}

const mockBenefits = [
  { id: 'b1', name: '名企参访体验券', value: 5000, personName: '张建国', personPhone: '138****8888', status: '已发放', issueTime: '2026-03-15', issueMethod: '业务员申请', expiry: '2026-12-31' },
  { id: 'b2', name: '道路救援服务卡', value: 800, personName: '李明华', personPhone: '139****9999', status: '已发放', issueTime: '2026-02-20', issueMethod: '企业宝下发', expiry: '2026-08-20' },
  { id: 'b3', name: '高管体检套餐', value: 8000, personName: '王志远', personPhone: '137****7777', status: '已使用', issueTime: '2026-01-10', issueMethod: '业务员申请', useTime: '2026-04-15', userName: '王志远', userPhone: '137****7777' },
  { id: 'b4', name: '机场贵宾厅权益', value: 1500, personName: '张建国', personPhone: '138****8888', status: '已使用', issueTime: '2025-12-01', issueMethod: '企业宝下发', useTime: '2026-02-28', userName: '张建国', userPhone: '138****8888' },
  { id: 'b5', name: '心理咨询服务', value: 2000, personName: '刘芳', personPhone: '136****6666', status: '未使用', issueTime: '2026-03-01', issueMethod: '业务员申请', expiry: '2026-05-31' },
  { id: 'b6', name: '法务咨询VIP服务', value: 3000, personName: '赵强', personPhone: '135****5555', status: '未使用', issueTime: '2026-02-01', issueMethod: '企业宝下发', expiry: '2026-08-31' },
  { id: 'b7', name: '高端齿科护理套餐', value: 3500, personName: '陈静', personPhone: '133****3333', status: '未使用', issueTime: '2026-04-01', issueMethod: '业务员申请', expiry: '2026-10-31' },
  { id: 'b8', name: '员工健康大讲堂', value: 1200, personName: '张建国', personPhone: '138****8888', status: '已评价', issueTime: '2026-01-15', issueMethod: '企业宝下发', reviewTime: '2026-03-20', reviewerName: '张建国', reviewerPhone: '138****8888', reviewContent: '服务很好，讲师专业，员工反馈积极' },
  { id: 'b9', name: '车主尊享洗车卡', value: 500, personName: '李明华', personPhone: '139****9999', status: '已评价', issueTime: '2026-02-10', issueMethod: '业务员申请', reviewTime: '2026-04-10', reviewerName: '李明华', reviewerPhone: '139****9999', reviewContent: '洗车服务方便快捷，覆盖门店多，体验不错' },
  { id: 'b10', name: '安全生产培训', value: 2500, personName: '王志远', personPhone: '137****7777', status: '已发放', issueTime: '2026-04-20', issueMethod: '企业宝下发', expiry: '2026-12-31' },
  { id: 'b11', name: '海外医疗咨询', value: 6000, personName: '刘芳', personPhone: '136****6666', status: '已使用', issueTime: '2026-01-05', issueMethod: '业务员申请', useTime: '2026-03-01', userName: '刘芳', userPhone: '136****6666' },
  { id: 'b12', name: '企康加微活动', value: 1800, personName: '赵强', personPhone: '135****5555', status: '已评价', issueTime: '2025-11-20', issueMethod: '企业宝下发', reviewTime: '2026-01-15', reviewerName: '赵强', reviewerPhone: '135****5555', reviewContent: '活动组织得当，增加了企业健康管理意识' },
  { id: 'b13', name: '健康商城好礼', value: 800, personName: '陈静', personPhone: '133****3333', status: '已发放', issueTime: '2026-05-01', issueMethod: '业务员申请', expiry: '2026-11-01' },
  { id: 'b14', name: '商旅出行套餐', value: 4000, personName: '张建国', personPhone: '138****8888', status: '已使用', issueTime: '2026-02-15', issueMethod: '业务员申请', useTime: '2026-05-10', userName: '张建国', userPhone: '138****8888' },
  { id: 'b15', name: '企业风险管理咨询', value: 5000, personName: '李明华', personPhone: '139****9999', status: '未使用', issueTime: '2026-04-10', issueMethod: '企业宝下发', expiry: '2026-10-10' },
];

export default function ServiceOverview({ client, onBack, initialTab }: ServiceOverviewProps) {
  const [activeTab, setActiveTab] = useState<OverviewTab>(initialTab);
  const [searchName, setSearchName] = useState('');
  const [searchPerson, setSearchPerson] = useState('');

  const filterByTab = (benefit: typeof mockBenefits[0]) => {
    switch (activeTab) {
      case '发放服务':
        return benefit.status === '已发放';
      case '使用服务':
        return benefit.status === '已使用';
      case '未使用的':
        return benefit.status === '未使用';
      case '有评价的':
        return benefit.status === '已评价';
      default:
        return true;
    }
  };

  const filteredBenefits = mockBenefits.filter(b => {
    if (!filterByTab(b)) return false;
    if (searchName && !b.name.includes(searchName)) return false;
    if (searchPerson && !b.personName.includes(searchPerson)) return false;
    return true;
  });

  const tabs: OverviewTab[] = ['发放服务', '使用服务', '未使用的', '有评价的'];

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
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">服务总览</h1>
        <div className="w-9" />
      </header>

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-10">
        <div className="flex overflow-x-auto scrollbar-hide px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'text-orange-600 border-orange-500'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="输入权益名称搜索"
              className="w-full bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-4 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchPerson}
              onChange={(e) => setSearchPerson(e.target.value)}
              placeholder="输入关键人姓名搜索"
              className="w-full bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-4 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Benefit List */}
        <div className="space-y-3">
          {filteredBenefits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">暂无匹配的权益记录</p>
            </div>
          ) : (
            filteredBenefits.map((benefit) => (
              <div key={benefit.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-bold text-gray-900">{benefit.name}</h4>
                  <span className="text-sm font-semibold text-orange-600 shrink-0 ml-3">
                    ¥{benefit.value.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1.5 mb-3">
                  {activeTab === '发放服务' && (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">关键人</span>
                        <span className="text-gray-900">{benefit.personName} {benefit.personPhone}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">权益状态</span>
                        <span className="text-green-600">{benefit.status}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">发放时间</span>
                        <span className="text-gray-900">{benefit.issueTime}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">发放方式</span>
                        <span className="text-gray-900">{benefit.issueMethod}</span>
                      </div>
                    </>
                  )}

                  {activeTab === '使用服务' && (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">使用人</span>
                        <span className="text-gray-900">{benefit.userName} {benefit.userPhone}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">使用时间</span>
                        <span className="text-gray-900">{benefit.useTime}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">发放方式</span>
                        <span className="text-gray-900">{benefit.issueMethod}</span>
                      </div>
                    </>
                  )}

                  {activeTab === '未使用的' && (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">关键人</span>
                        <span className="text-gray-900">{benefit.personName} {benefit.personPhone}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">有效期</span>
                        <span className="text-orange-600">{benefit.expiry}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">发放方式</span>
                        <span className="text-gray-900">{benefit.issueMethod}</span>
                      </div>
                    </>
                  )}

                  {activeTab === '有评价的' && (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">评价人</span>
                        <span className="text-gray-900">{benefit.reviewerName} {benefit.reviewerPhone}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">评价时间</span>
                        <span className="text-gray-900">{benefit.reviewTime}</span>
                      </div>
                      <div className="flex text-xs">
                        <span className="text-gray-500 shrink-0 mr-2">评价内容</span>
                        <span className="text-gray-900 text-right">{benefit.reviewContent}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-3 border-t border-gray-100">
                  {activeTab === '发放服务' && (
                    <button className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                      查看卡券
                    </button>
                  )}
                  {activeTab === '使用服务' && (
                    <button className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                      查看卡券
                    </button>
                  )}
                  {activeTab === '未使用的' && (
                    <button className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                      转发提醒
                    </button>
                  )}
                  {activeTab === '有评价的' && (
                    <button className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                      查看评价
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
