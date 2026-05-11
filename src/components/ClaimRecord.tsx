import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Filter, X } from 'lucide-react';

interface ClaimRecordProps {
  client: { name: string };
  onBack: () => void;
}

const timeOptions = ['近三年', '2026年', '2025年', '2024年'];
const statusOptions = ['全部状态', '已结案', '处理中'];
const productOptions = ['全部产品', '团体意外险', '雇主责任险', '财产险'];

export default function ClaimRecord({ client, onBack }: ClaimRecordProps) {
  const [selectedTime, setSelectedTime] = useState('近三年');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('全部状态');
  const [selectedProduct, setSelectedProduct] = useState('全部产品');

  const records = [
    { title: '员工工伤骨折理赔', reportNo: 'BA20260215001', date: '2026-02-15', status: '已结案', amount: '¥50,000', reason: '工伤', product: '团体意外险', reporter: '张建国' },
    { title: '厂房漏水财产损失', reportNo: 'BA20260301002', date: '2026-03-01', status: '处理中', amount: '¥20,000', reason: '水灾', product: '财产险', reporter: '李明华' },
    { title: '车辆碰撞三者损失', reportNo: 'BA20260315003', date: '2026-03-15', status: '已结案', amount: '¥35,000', reason: '车祸', product: '雇主责任险', reporter: '王志远' },
    { title: '仓库货物被盗', reportNo: 'BA20260320004', date: '2026-03-20', status: '已结案', amount: '¥80,000', reason: '盗窃', product: '财产险', reporter: '刘芳' },
    { title: '员工意外伤害', reportNo: 'BA20260325005', date: '2026-03-25', status: '处理中', amount: '¥15,000', reason: '意外', product: '团体意外险', reporter: '陈静' },
    { title: '设备损坏理赔', reportNo: 'BA20260328006', date: '2026-03-28', status: '已结案', amount: '¥42,000', reason: '设备故障', product: '财产险', reporter: '赵强' },
    { title: '自然灾害损失', reportNo: 'BA20260401007', date: '2026-04-01', status: '处理中', amount: '¥120,000', reason: '自然灾害', product: '财产险', reporter: '孙丽' },
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
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">理赔记录</h1>
        <div className="w-9" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-8">
        {/* 理赔概况标题 + 时间筛选 */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">理赔概况</h3>
          <div className="relative">
            <button
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-gray-600">{selectedTime}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {showTimeDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowTimeDropdown(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 min-w-[100px]">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedTime(option);
                        setShowTimeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 ${
                        selectedTime === option ? 'text-orange-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 看板指标 */}
        <div className="px-4">
          <div className="bg-white rounded-xl p-4">
            {/* 第一行：3个指标 */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-[11px] text-gray-500 mb-1">客户赔付率</div>
                <div className="text-xl font-bold text-orange-600">45.2%</div>
              </div>
              <div className="text-center">
                <div className="text-[11px] text-gray-500 mb-1">近3年行业赔付率</div>
                <div className="text-xl font-bold text-gray-900">62.8%</div>
              </div>
              <div className="text-center">
                <div className="text-[11px] text-gray-500 mb-1">未决案件数</div>
                <div className="text-xl font-bold text-gray-900">3件</div>
              </div>
            </div>
            {/* 第二行：2个指标 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[11px] text-gray-500 mb-1">未决金额</div>
                <div className="text-xl font-bold text-gray-900">¥155,000</div>
              </div>
              <div className="text-center">
                <div className="text-[11px] text-gray-500 mb-1">已决金额</div>
                <div className="text-xl font-bold text-gray-900">¥207,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* 理赔记录标题 */}
        <div className="px-4 mb-3 mt-4">
          <h3 className="text-sm font-bold text-gray-900">理赔记录</h3>
        </div>

        {/* 筛选栏 */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            {/* 报案时间筛选 */}
            <div className="relative shrink-0">
              <select className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-600">
                <option>报案时间</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {/* 产品名称筛选 */}
            <div className="relative shrink-0">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-600"
              >
                {productOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {/* 状态筛选 */}
            <div className="relative shrink-0">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-600"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 理赔记录列表 */}
        <div className="px-4 space-y-3">
          {records.map((record, idx) => (
            <div key={idx} className="bg-white rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-gray-900">{record.title}</h4>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  record.status === '已结案'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-orange-50 text-orange-600'
                }`}>
                  {record.status}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-1">报案号: {record.reportNo} | {record.date} | 报案人: {record.reporter}</div>
              <div className="text-xs text-gray-500 mb-1">出险原因: {record.reason}</div>
              <div className="text-xs text-gray-500 mb-1">产品名称: {record.product}</div>
              <div className="text-sm font-semibold mt-1" style={{ color: record.status === '已结案' ? '#56C468' : '#F7B44C' }}>
                {record.amount}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}