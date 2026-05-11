import React, { useState } from 'react';
import { ChevronLeft, Building2, Users, Network, Flag, AlertTriangle, ChevronRight } from 'lucide-react';

interface BasicInfoProps {
  client: { name: string };
  onBack: () => void;
}

type InfoTabType = '基础信息' | '股东信息' | '主要人员' | '同谱系企业' | '分支机构' | '处罚信息';

export default function BasicInfo({ client, onBack }: BasicInfoProps) {
  const [activeTab, setActiveTab] = useState<InfoTabType>('基础信息');

  const tabs: InfoTabType[] = ['基础信息', '股东信息', '主要人员', '同谱系企业', '分支机构', '处罚信息'];

  const handleTabClick = (tab: InfoTabType) => {
    setActiveTab(tab);
    const el = document.getElementById(`tab-${tab}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
        <h1 className="flex-1 text-center text-base font-bold text-gray-900">基本信息</h1>
        <div className="w-9" />
      </header>

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-10">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
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
      <main className="flex-1 overflow-y-auto pb-8">
        {/* 基础信息 */}
        <section id="tab-基础信息" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">企业信息</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-gray-500 mb-1">企业名称</div>
                <div className="text-gray-900 font-medium">{client.name}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">统一社会信用代码</div>
                <div className="text-gray-900 font-medium">91110000XXXXXX1234</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">法定代表人</div>
                <div className="text-gray-900 font-medium">张建国</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">注册资本</div>
                <div className="text-gray-900 font-medium">5000万人民币</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">成立日期</div>
                <div className="text-gray-900 font-medium">2010-03-15</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">经营状态</div>
                <div className="text-green-600 font-medium">存续</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">企业类型</div>
                <div className="text-gray-900 font-medium">有限责任公司</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">所属行业</div>
                <div className="text-gray-900 font-medium">商务服务业</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">工商信息</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-gray-500 mb-1">注册地址</div>
                <div className="text-gray-900 font-medium">北京市朝阳区建国路88号</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">营业期限</div>
                <div className="text-gray-900 font-medium">2010-03-15 至 2030-03-14</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">经营范围</div>
                <div className="text-gray-900 font-medium col-span-2">技术开发、技术服务、技术咨询；销售机械设备、电子产品；货物进出口</div>
              </div>
            </div>
          </div>
        </section>

        {/* 股东信息 */}
        <section id="tab-股东信息" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">股东信息</h3>
              <span className="text-xs text-gray-500">共4条</span>
            </div>
            {[
              { name: '北京国控集团', percent: '45%', amount: '2250万' },
              { name: '张建国', percent: '30%', amount: '1500万' },
              { name: '李明华', percent: '15%', amount: '750万' },
              { name: '王志远', percent: '10%', amount: '500万' },
            ].map((shareholder, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-xs font-medium text-gray-900">{shareholder.name}</div>
                  <div className="text-[10px] text-gray-500">认缴金额：{shareholder.amount}</div>
                </div>
                <div className="text-xs font-semibold text-orange-600">{shareholder.percent}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 主要人员 */}
        <section id="tab-主要人员" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">主要人员</h3>
              <span className="text-xs text-gray-500">共6人</span>
            </div>
            {[
              { name: '张建国', role: '执行董事、总经理' },
              { name: '李明华', role: '监事' },
              { name: '王志远', role: '副总经理' },
              { name: '刘芳', role: '财务总监' },
              { name: '陈静', role: '行政总监' },
              { name: '赵强', role: '技术总监' },
            ].map((person, idx) => (
              <div key={idx} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                  {person.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-900">{person.name}</div>
                  <div className="text-[10px] text-gray-500">{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 同谱系企业 */}
        <section id="tab-同谱系企业" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">同谱系企业</h3>
              <span className="text-xs text-gray-500">共3家</span>
            </div>
            {[
              { name: '北京国控科技有限公司', relation: '母公司', capital: '1亿' },
              { name: '上海国控贸易有限公司', relation: '兄弟公司', capital: '2000万' },
              { name: '广州国控物流有限公司', relation: '子公司', capital: '500万' },
            ].map((company, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-xs font-medium text-gray-900">{company.name}</div>
                  <div className="text-[10px] text-gray-500">{company.relation} · 注册资本{company.capital}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </section>

        {/* 分支机构 */}
        <section id="tab-分支机构" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">分支机构</h3>
              <span className="text-xs text-gray-500">共2家</span>
            </div>
            {[
              { name: '北京国控科技有限公司朝阳分公司', location: '北京市朝阳区' },
              { name: '北京国控科技有限公司海淀分公司', location: '北京市海淀区' },
            ].map((branch, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-xs font-medium text-gray-900">{branch.name}</div>
                  <div className="text-[10px] text-gray-500">{branch.location}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </section>

        {/* 处罚信息 */}
        <section id="tab-处罚信息" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">处罚信息</h3>
              <span className="text-xs text-gray-500">共0条</span>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
                <Flag className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-xs text-gray-500">暂无处罚信息</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
