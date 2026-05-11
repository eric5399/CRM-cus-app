import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Check } from 'lucide-react';

interface ServiceApprovalProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function ServiceApproval({ onBack, onSubmit }: ServiceApprovalProps) {
  const [approvalStatus, setApprovalStatus] = useState<'agree' | 'disagree' | null>(null);
  const [comment, setComment] = useState('');

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-gray-900 ml-2">服务权益申请审核</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 基础信息 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full mr-2"></span>
            基础信息
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-500">客户名称</span><span className="font-medium text-gray-900">佛山市顺德区中大物流有限公司</span></div>
            <div className="flex justify-between"><span className="text-gray-500">近三年保费规模</span><span className="font-medium text-gray-900">¥1,250,000</span></div>
            <div className="flex justify-between"><span className="text-gray-500">在保保费</span><span className="font-medium text-gray-900">¥450,000</span></div>
            <div className="flex justify-between"><span className="text-gray-500">申请业务员</span><span className="font-medium text-gray-900">张坤-zhangkun833</span></div>
            <div className="flex justify-between"><span className="text-gray-500">申请时间</span><span className="font-medium text-gray-900">2026-03-31 10:30</span></div>
          </div>
        </div>

        {/* 申请服务信息 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></span>
            申请服务信息
          </h4>
          <div className="space-y-3">
            {/* Service 1 */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <div className="font-bold text-xs text-gray-900">抖音全球总部参访</div>
                <div className="text-xs font-bold text-red-500">¥5,000</div>
              </div>
              <div className="flex space-x-2 mb-2">
                <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">企业研学</span>
                <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">研学</span>
              </div>
              <div className="text-[10px] text-gray-500">用途：走进抖音总部</div>
            </div>
            {/* Service 2 */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <div className="font-bold text-xs text-gray-900">基础洗车</div>
                <div className="text-xs font-bold text-red-500">¥50</div>
              </div>
              <div className="flex space-x-2 mb-2">
                <span className="text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">车主尊享</span>
                <span className="text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">洗车</span>
              </div>
              <div className="text-[10px] text-gray-500">用途：快速洗车服务</div>
            </div>
            {/* Service 3 */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <div className="font-bold text-xs text-gray-900">高端体检</div>
                <div className="text-xs font-bold text-red-500">¥8,000</div>
              </div>
              <div className="flex space-x-2 mb-2">
                <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">医健服务</span>
                <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">体检服务</span>
              </div>
              <div className="text-[10px] text-gray-500">用途：全面健康管理</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-900">本次申请的服务总价值</span>
            <span className="text-sm font-bold text-red-500">¥13,050</span>
          </div>
        </div>

        {/* 任务处理 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-1.5 h-4 bg-purple-500 rounded-full mr-2"></span>
            任务处理
          </h4>
          <div className="flex space-x-3 mb-3">
            <button
              onClick={() => setApprovalStatus('agree')}
              className={`flex-1 py-2 rounded-lg border text-xs font-bold flex items-center justify-center transition-colors ${
                approvalStatus === 'agree' ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> 同意
            </button>
            <button
              onClick={() => setApprovalStatus('disagree')}
              className={`flex-1 py-2 rounded-lg border text-xs font-bold flex items-center justify-center transition-colors ${
                approvalStatus === 'disagree' ? 'bg-red-50 border-red-500 text-red-600' : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <XCircle className="w-4 h-4 mr-1.5" /> 不同意
            </button>
          </div>
          <textarea
            placeholder="请录入审批说明..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none h-20"
          ></textarea>
        </div>

        {/* 审批链 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1.5 h-4 bg-indigo-500 rounded-full mr-2"></span>
            审批链
          </h4>
          <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
            {/* Node 1 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white ring-2 ring-green-100 z-10 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="text-xs font-bold text-gray-900">发起人：张坤</div>
              <div className="text-[10px] text-gray-500 mt-0.5">发起时间：2026-03-31 10:30</div>
            </div>
            {/* Node 2 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-100 z-10 flex items-center justify-center">
                <Clock className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="text-xs font-bold text-orange-600">VP审核：李总</div>
              <div className="text-[10px] text-orange-500 mt-0.5">待审批</div>
            </div>
            {/* Node 3 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-200 border-2 border-white z-10"></div>
              <div className="text-xs font-bold text-gray-500">团客中台审核：王总</div>
              <div className="text-[10px] text-gray-400 mt-0.5">待审批</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <button
          onClick={onSubmit}
          className="w-full py-3 text-sm font-bold text-white bg-orange-600 rounded-xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-colors"
        >
          完成审批
        </button>
      </div>
    </div>
  );
}
