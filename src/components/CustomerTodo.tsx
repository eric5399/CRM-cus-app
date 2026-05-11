import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomerTodoProps {
  onBack: () => void;
}

type TodoTabType = '全部' | '待查看报价' | '待续保跟进' | '待认领保费' | '待关注赔案' | '大灾预警';

const mockTodos = [
  { id: 1, customer: '菲林科技', type: '待续保跟进', deadline: '2026-04-30', amount: '3.5万' },
  { id: 2, customer: '中天农业集团', type: '待查看报价', deadline: '2026-05-01', amount: '8.2万' },
  { id: 3, customer: '深圳大唐科技', type: '待关注赔案', deadline: '2026-04-28', amount: '20万' },
  { id: 4, customer: '蔚来集团', type: '待查看报价', deadline: '2026-05-03', amount: '50万' },
  { id: 5, customer: '华南物流中心', type: '待续保跟进', deadline: '2026-05-05', amount: '12万' },
  { id: 6, customer: '北京国控', type: '待认领保费', deadline: '2026-04-25', amount: '5.6万' },
  { id: 7, customer: '上海德邦', type: '大灾预警', deadline: '2026-04-29', amount: '35万' },
  { id: 8, customer: '广州白云', type: '待续保跟进', deadline: '2026-05-02', amount: '6.8万' },
];

const tabTypeColors: Record<string, { bg: string; text: string }> = {
  '待查看报价': { bg: '#FFF7E6', text: '#F7B44C' },
  '待续保跟进': { bg: '#E6F3FF', text: '#508CEE' },
  '待认领保费': { bg: '#F0FFF0', text: '#56C468' },
  '待关注赔案': { bg: '#FFF0F0', text: '#E85757' },
  '大灾预警': { bg: '#FFE6E6', text: '#CC0000' },
};

export default function CustomerTodo({ onBack }: CustomerTodoProps) {
  const [activeTab, setActiveTab] = useState<TodoTabType>('全部');

  const tabs: TodoTabType[] = ['全部', '待查看报价', '待续保跟进', '待认领保费', '待关注赔案', '大灾预警'];

  const getFilteredTodos = () => {
    if (activeTab === '全部') return mockTodos;
    return mockTodos.filter(todo => todo.type === activeTab);
  };

  const getCountForTab = (tab: TodoTabType) => {
    if (tab === '全部') return mockTodos.length;
    return mockTodos.filter(todo => todo.type === tab).length;
  };

  const filteredTodos = getFilteredTodos();

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
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">客户待办</h1>
        <div className="w-9" />
      </header>

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-10">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50/30'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab}({getCountForTab(tab)})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
        {filteredTodos.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-500">暂无待办事项</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-gray-900">{todo.customer}</h3>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">
                    {todo.type}
                  </div>
                  <div className="text-xs text-gray-500">
                    截止时间：<span className="text-gray-900">{todo.deadline}</span>
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-50 transition-colors"
                >
                  去处理
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
