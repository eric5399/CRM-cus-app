import React, { useState } from 'react';
import { Client } from '../types';
import { mockClients } from '../data/mockData';
import { Search, Filter, Gift, ChevronRight, Calendar, Calculator, Navigation, ArrowLeft } from 'lucide-react';

interface DashboardProps {
  onSelectClient: (client: Client) => void;
  onApplyService: (client: Client) => void;
  onBack: () => void;
}

export default function Dashboard({ onSelectClient, onApplyService, onBack }: DashboardProps) {
  const [primaryTab, setPrimaryTab] = useState('团非车');
  const [secondaryTab, setSecondaryTab] = useState('全部');

  const primaryTabs = ['个车', '团车', '个非车', '团非车'];
  const secondaryTabs = ['全部', '待报价', '已报价', '脱保'];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-6">
      <div className="bg-orange-600 px-4 pt-12 pb-4 text-white rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-2 p-1 rounded-full hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">一键续保</h1>
          </div>
        </div>
        
        {/* Primary Tabs */}
        <div className="flex space-x-6 mb-4 overflow-x-auto no-scrollbar">
          {primaryTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setPrimaryTab(tab)}
              className={`text-sm font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
                primaryTab === tab ? 'border-white text-white' : 'border-transparent text-orange-200 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索客户名称/保单号"
              className="w-full pl-9 pr-4 py-2 bg-white/90 border-transparent rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-500"
            />
          </div>
          <button className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Tabs */}
      <div className="px-4 mt-4 flex space-x-4 overflow-x-auto no-scrollbar">
        {secondaryTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setSecondaryTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              secondaryTab === tab 
                ? 'bg-orange-100 text-orange-600 border border-orange-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4 space-y-4">
        {mockClients.map((client) => (
          <div key={client.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 pr-2">
                <button
                  onClick={() => onSelectClient(client)}
                  className="text-base font-bold text-gray-900 hover:text-orange-600 text-left flex items-center"
                >
                  {client.name}
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-1" />
                </button>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                {client.status}
              </span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {client.tags?.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">上年产品名称</span>
                <span className="text-xs font-medium text-gray-900">{client.lastYearProductName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">上年保单号</span>
                <span className="text-xs font-mono text-gray-700">{client.lastYearPolicyNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">上年保费</span>
                <span className="text-xs font-medium text-orange-600">¥{client.lastYearPremium.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">保险止期</span>
                <span className="text-xs font-medium text-red-600 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {client.insuranceEndDate}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              <button
                onClick={() => onApplyService(client)}
                className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Gift className="w-3.5 h-3.5 mr-1" />
                服务加投
              </button>
              <button className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">
                <Navigation className="w-3.5 h-3.5 mr-1" />
                续保拜访
              </button>
              <button className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700 transition-colors">
                <Calculator className="w-3.5 h-3.5 mr-1" />
                去询价
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
