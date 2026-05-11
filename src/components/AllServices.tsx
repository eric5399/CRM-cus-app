import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Search } from 'lucide-react';

interface AllServicesProps {
  client: { name: string };
  onBack: () => void;
}

const mockVouchers = [
  { id: 'v1', name: '名企参访体验券', type: '研学', status: '已下发待使用', expiry: '2026-12-31', owner: '张* (HRD)', ownerRole: 'HRD', category1: '产业研学', category2: '名企参访', usage: '用于走进世界500强企业参观学习', instructions: '凭此券可预约参与名企参访活动，请提前3天预约' },
  { id: 'v2', name: '机场贵宾厅权益', type: '出行', status: '已使用待评价', expiry: '2026-06-30', owner: '李明华', ownerRole: 'HRD', category1: '商旅出行', category2: '机场贵宾厅', usage: '覆盖国内主要机场贵宾厅服务', instructions: '凭此券可在指定机场贵宾厅享受休息服务' },
  { id: 'v3', name: '高管体检套餐', type: '健康', status: '已评价-差评', expiry: '2026-05-15', owner: '王芳', ownerRole: '保险经办人', category1: '高端医健', category2: '体检套餐', usage: '三甲医院VIP体检服务', instructions: '需提前预约，携带身份证到指定体检中心' },
  { id: 'v4', name: '车主尊享洗车卡', type: '出行', status: '即将过期', expiry: '2026-04-30', owner: '黄丽丽', ownerRole: '保险经办人', category1: '车主尊享', category2: '洗车服务', usage: '覆盖全国数千家洗车门店', instructions: '凭卡到指定门店享受洗车服务' },
  { id: 'v5', name: '员工健康大讲堂', type: '健康', status: '已下发待使用', expiry: '2026-12-31', owner: '张* (HRD)', ownerRole: 'HRD', category1: '高端医健', category2: '健康讲座', usage: '专业医师团队提供健康讲座', instructions: '可预约上门讲座或线上参与' },
  { id: 'v6', name: '法务咨询VIP服务', type: '服务', status: '已评价-好评', expiry: '2026-08-31', owner: '赵强', ownerRole: '车队管理员', category1: '产业研学', category2: '法务咨询', usage: '专业律师团队提供法律咨询', instructions: '可通过APP预约专业律师' },
  { id: 'v7', name: '高端齿科护理套餐', type: '健康', status: '已下发待使用', expiry: '2026-10-31', owner: '孙丽', ownerRole: '保险经办人', category1: '高端医健', category2: '齿科护理', usage: '包含洗牙、抛光、检查等服务', instructions: '需提前预约到指定齿科诊所' },
  { id: 'v8', name: '心理咨询服务', type: '服务', status: '已使用待评价', expiry: '2026-07-31', owner: '周杰', ownerRole: 'HRD', category1: '高端医健', category2: '心理咨询', usage: '专业心理咨询师提供心理疏导', instructions: '可通过APP预约咨询时间' },
];

export default function AllServices({ client, onBack }: AllServicesProps) {
  const [voucherSearchQuery, setVoucherSearchQuery] = useState('');
  const [serviceDistPerson, setServiceDistPerson] = useState('全部');
  const [serviceDistStatus, setServiceDistStatus] = useState('全部');
  const [serviceDistType, setServiceDistType] = useState('全部');
  const [showShareToast, setShowShareToast] = useState(false);

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
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">全部服务</h1>
        <div className="w-9" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={voucherSearchQuery}
            onChange={(e) => setVoucherSearchQuery(e.target.value)}
            placeholder="输入卡券名称筛选"
            className="w-full bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-4 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* 筛选栏 */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <select
              value={serviceDistPerson}
              onChange={(e) => setServiceDistPerson(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="全部">全部发放人</option>
              <option value="超级管理员">超级管理员</option>
              <option value="保险经办人">保险经办人</option>
              <option value="HRD">HRD</option>
              <option value="车队管理员">车队管理员</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select
              value={serviceDistStatus}
              onChange={(e) => setServiceDistStatus(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="全部">全部状态</option>
              <option value="已下发待使用">已下发待使用</option>
              <option value="已使用待评价">已使用待评价</option>
              <option value="已评价-好评">已评价-好评</option>
              <option value="已评价-差评">已评价-差评</option>
              <option value="即将过期">即将过期</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select
              value={serviceDistType}
              onChange={(e) => setServiceDistType(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="全部">全部类型</option>
              <option value="产业研学">产业研学</option>
              <option value="高端医健">高端医健</option>
              <option value="车主尊享">车主尊享</option>
              <option value="商旅出行">商旅出行</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* 服务卡片列表 - 排序：红色状态(即将过期、已评价-差评)置顶，显示全部 */}
        {[...mockVouchers].sort((a, b) => {
          const redStatuses = ['即将过期', '已评价-差评'];
          const aIsRed = redStatuses.includes(a.status);
          const bIsRed = redStatuses.includes(b.status);
          if (aIsRed && !bIsRed) return -1;
          if (!aIsRed && bIsRed) return 1;
          return 0;
        }).filter(v => !voucherSearchQuery || v.name.includes(voucherSearchQuery)).map((voucher, idx) => (
          <div key={voucher.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px] mr-2">{voucher.type}</span>
                <div className="text-sm font-bold text-gray-900 flex items-center">
                  {voucher.name}
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
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
      </main>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-50">
          已分享到微信
        </div>
      )}
    </div>
  );
}