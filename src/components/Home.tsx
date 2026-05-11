import React from 'react';
import { Search, Scan, FileText, BarChart2, Users, Cpu, Shield, Store, Bot, Umbrella, Grid, ChevronRight, Home as HomeIcon, CheckSquare, MessageSquare, BookOpen, User as UserIcon } from 'lucide-react';

interface HomeProps {
  onNavigateToRenewal: () => void;
  onNavigateToCustomer: () => void;
  onNavigateToApproval?: () => void;
}

export default function Home({ onNavigateToRenewal, onNavigateToCustomer, onNavigateToApproval }: HomeProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col relative w-full h-full pb-16">
      {/* Header Section with Orange Background */}
      <div className="bg-gradient-to-b from-orange-400 to-orange-300 px-4 pt-12 pb-12 rounded-b-3xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-6 relative z-10">
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="保单中心" 
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            <Scan className="w-4 h-4 text-gray-400 ml-2" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 4 Main Icons */}
        <div className="grid grid-cols-4 gap-4 text-white text-center relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-1">
              <FileText className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">出单作业</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-1">
              <BarChart2 className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">业绩管理</span>
          </div>
          <button onClick={onNavigateToCustomer} className="flex flex-col items-center focus:outline-none hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex items-center justify-center mb-1">
              <Users className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">客户管理</span>
          </button>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-1">
              <Cpu className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">AI武器</span>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl p-0 shadow-sm overflow-hidden border border-gray-100 flex items-center">
           <div className="p-4 flex-1">
             <div className="text-xs font-bold text-gray-800 mb-1">健康计划</div>
             <h2 className="text-xl font-black text-gray-900 italic tracking-tight">减重行动进行时</h2>
             <div className="inline-block bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full mt-1 font-medium">
               开启减重行动，为健康加分
             </div>
           </div>
           <div className="pr-4">
             <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-white">
               GO
             </div>
           </div>
        </div>
      </div>

      {/* 5 Secondary Icons */}
      <div className="bg-white mx-4 mt-3 rounded-2xl p-4 shadow-sm grid grid-cols-5 gap-2 text-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-1">
            <Shield className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-[10px] text-gray-700">企康助手</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-1">
            <Store className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-[10px] text-gray-700">微店</span>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mb-1">
            <Bot className="w-5 h-5 text-indigo-500" />
          </div>
          <span className="text-[10px] text-gray-700">AI助理</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
        </div>
        <button onClick={onNavigateToRenewal} className="flex flex-col items-center focus:outline-none hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-1">
            <Umbrella className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-[10px] text-gray-700">一键续保</span>
        </button>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center mb-1">
            <Grid className="w-5 h-5 text-yellow-500" />
          </div>
          <span className="text-[10px] text-gray-700">更多</span>
        </div>
      </div>

      {/* 最新消息 */}
      <div className="bg-white mx-4 mt-3 rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-gray-900">最新消息</h3>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden">
              <span className="text-xs font-bold text-gray-900 mr-2 shrink-0">应收提醒</span>
              <span className="text-xs text-gray-500 truncate">你有新的保单需补传影像，客户...</span>
            </div>
            <span className="text-[10px] text-gray-400 shrink-0 ml-2">14分钟前</span>
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 -mx-1 rounded" onClick={onNavigateToApproval}>
            <div className="flex items-center overflow-hidden">
              <span className="text-xs font-bold text-gray-900 mr-2 shrink-0">审核任务</span>
              <span className="text-xs text-gray-500 truncate">张坤提交了3张服务权益下发申请，请审批&gt;</span>
            </div>
            <span className="text-[10px] text-gray-400 shrink-0 ml-2">19分钟前</span>
          </div>
        </div>
      </div>

      {/* 两个卡片: 公司导向 & 渠道重点 */}
      <div className="flex mx-4 mt-3 space-x-3">
        <div className="flex-1 bg-white rounded-2xl p-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-900">公司导向</h3>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg mr-2 flex-shrink-0 flex items-center justify-center">
                <span className="text-lg">🏆</span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">产险明星会</div>
                <div className="text-[10px] text-gray-500">火热进行中</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg mr-2 flex-shrink-0 flex items-center justify-center">
                <span className="text-lg">📱</span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">数字营销</div>
                <div className="text-[10px] text-gray-500">AI赋能创作</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-900">渠道重点</h3>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg mr-2 flex-shrink-0 flex items-center justify-center">
                <span className="text-lg">👥</span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">团体销售队伍</div>
                <div className="text-[10px] text-gray-500">课程专区</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg mr-2 flex-shrink-0 flex items-center justify-center">
                <span className="text-lg">👨‍💼</span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">招投标专区</div>
                <div className="text-[10px] text-gray-500">2025年招投标</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 大家都在聊 */}
      <div className="bg-white mx-4 mt-3 rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-gray-900 italic">大家都在聊</h3>
          <div className="flex items-center text-[10px] text-orange-500">
            <div className="flex -space-x-1 mr-1">
              <div className="w-4 h-4 rounded-full bg-gray-200 border border-white"></div>
              <div className="w-4 h-4 rounded-full bg-gray-300 border border-white"></div>
            </div>
            1305人热聊中 🔥
            <ChevronRight className="w-3 h-3 ml-1" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-full px-3 py-2 flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-200 mr-2 flex-shrink-0"></div>
            <span className="text-xs text-gray-500 mr-2 shrink-0">衣雪军</span>
            <span className="text-xs text-gray-900 truncate">农险如何协同公司其他业务，互相赋能，协同...</span>
          </div>
          <div className="bg-gray-50 rounded-full px-3 py-2 flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-200 mr-2 flex-shrink-0"></div>
            <span className="text-xs text-gray-500 mr-2 shrink-0">牛牧原</span>
            <span className="text-xs text-gray-900 truncate">科技如何赋能队伍 #【六大主...</span>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 flex justify-around py-2 pb-6 z-50">
        <div className="flex flex-col items-center">
          <HomeIcon className="w-5 h-5 text-orange-500 mb-1" />
          <span className="text-[10px] text-orange-500 font-medium">首页</span>
        </div>
        <div className="flex flex-col items-center">
          <CheckSquare className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-[10px] text-gray-500">产品</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageSquare className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-[10px] text-gray-500">工作台</span>
        </div>
        <div className="flex flex-col items-center">
          <BookOpen className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-[10px] text-gray-500">学习</span>
        </div>
        <div className="flex flex-col items-center">
          <UserIcon className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-[10px] text-gray-500">我的</span>
        </div>
      </div>
    </div>
  );
}
