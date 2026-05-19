import React, { useState } from 'react';
import { ChevronLeft, Building2, Users, Network, Flag, AlertTriangle, ChevronRight } from 'lucide-react';

interface BasicInfoProps {
  client: { name: string };
  onBack: () => void;
}

type InfoTabType = '客户信息' | '股东信息' | '高管信息' | '招投标' | '同谱系企业' | '分支机构' | '处罚信息';

export default function BasicInfo({ client, onBack }: BasicInfoProps) {
  const [activeTab, setActiveTab] = useState<InfoTabType>('客户信息');

  const tabs: InfoTabType[] = ['客户信息', '高管信息', '股东信息', '招投标', '同谱系企业', '分支机构', '处罚信息'];

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
        {/* 客户信息 */}
        <section id="tab-客户信息" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">客户信息</h3>
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
              <div>
                <div className="text-gray-500 mb-1">人员规模</div>
                <div className="text-gray-900 font-medium">500-999人</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">企业性质</div>
                <div className="text-gray-900 font-medium">民营企业</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">企业联系电话</div>
                <div className="text-gray-900 font-medium">010-8888****</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">邮箱</div>
                <div className="text-gray-900 font-medium">hr@guokong.com</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">注册地址</div>
                <div className="text-gray-900 font-medium">北京市朝阳区建国路88号</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">营业期限</div>
                <div className="text-gray-900 font-medium">2010-03-15 至 2030-03-14</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500 mb-1">经营范围</div>
                <div className="text-gray-900 font-medium">技术开发、技术服务、技术咨询；销售机械设备、电子产品；货物进出口</div>
              </div>
            </div>
          </div>
        </section>

        {/* 高管信息 */}
        <section id="tab-高管信息" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">高管信息</h3>
              <span className="text-xs text-gray-500">共6人</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: '张建国', role: '执行董事、总经理', relatedCount: 12 },
                { name: '李明华', role: '监事', relatedCount: 8 },
                { name: '王志远', role: '副总经理', relatedCount: 5 },
                { name: '刘芳', role: '财务总监', relatedCount: 3 },
                { name: '陈静', role: '行政总监', relatedCount: 6 },
                { name: '赵强', role: '技术总监', relatedCount: 4 },
              ].map((person, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mb-2">
                    {person.name.charAt(0)}
                  </div>
                  <div className="text-xs font-medium text-gray-900">{person.name}</div>
                  <div className="text-[10px] text-gray-500">{person.role}</div>
                  <div className="text-[10px] text-orange-600 mt-1">关联{person.relatedCount}家企业</div>
                </div>
              ))}
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
              { name: '北京国控集团', percent: '45%', finalBenefit: '42%', pedigree: '中国投资有限责任公司' },
              { name: '张建国', percent: '30%', finalBenefit: '28%', pedigree: '北京国控企业管理有限公司' },
              { name: '李明华', percent: '15%', finalBenefit: '15%', pedigree: '上海明华投资有限公司' },
              { name: '王志远', percent: '10%', finalBenefit: '8%', pedigree: '广州远达控股有限公司' },
            ].map((shareholder, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-xs font-medium text-gray-900">{shareholder.name}</div>
                  <div className="text-[10px] text-gray-500">谱系：{shareholder.pedigree}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-900">持股比例{shareholder.percent}</div>
                  <div className="text-[10px] text-gray-500">最终受益股份{shareholder.finalBenefit}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 招投标 */}
        <section id="tab-招投标" className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">招投标</h3>
              <span className="text-xs text-gray-500">共4条</span>
            </div>
            <div className="space-y-2">
              {[
                { name: '2025年度智慧物流园区建设项目', budget: '580万', date: '2025-11-20', tag: '工程' },
                { name: '城市供应链数字化平台采购', budget: '320万', date: '2025-08-15', tag: '报案' },
                { name: '冷链物流仓储设备招标', budget: '150万', date: '2025-06-10', tag: '新车' },
                { name: '跨境贸易物流服务采购', budget: '260万', date: '2025-03-22', tag: '企康' },
              ].map((bid, idx) => (
                <div key={idx} className="py-2 border-b border-gray-100 last:border-0">
                  <div className="text-xs font-medium text-gray-900 mb-1 flex items-center gap-2">
                    {bid.name}
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
                      bid.tag === '工程' ? 'bg-blue-50 text-blue-600' :
                      bid.tag === '报案' ? 'bg-orange-50 text-orange-600' :
                      bid.tag === '新车' ? 'bg-green-50 text-green-600' :
                      'bg-purple-50 text-purple-600'
                    }`}>{bid.tag}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <span>项目预算：{bid.budget}</span>
                    <span>发布时间：{bid.date}</span>
                  </div>
                </div>
              ))}
            </div>
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
              { name: '北京国控科技有限公司朝阳分公司', status: '存续', manager: '张建国' },
              { name: '北京国控科技有限公司海淀分公司', status: '注销', manager: '李明华' },
            ].map((branch, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-xs font-medium text-gray-900 flex items-center gap-2">
                    {branch.name}
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      branch.status === '存续' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                    }`}>{branch.status}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">负责人：{branch.manager}</div>
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
              <span className="text-xs text-gray-500">共3条</span>
            </div>
            <div className="space-y-3">
              {[
                { id: 'CF-2025-00123', content: '未按规定期限公示年度报告', agency: '北京市市场监督管理局', decisionDate: '2025-08-15', publishDate: '2025-08-20' },
                { id: 'CF-2024-00567', content: '违反安全生产管理规定', agency: '北京市应急管理局', decisionDate: '2024-11-03', publishDate: '2024-11-08' },
                { id: 'CF-2024-00345', content: '未依法为从业人员缴纳工伤保险费', agency: '北京市人力资源和社会保障局', decisionDate: '2024-06-22', publishDate: '2024-06-28' },
              ].map((penalty, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">处罚编号</span>
                    <span className="text-xs font-medium text-gray-900">{penalty.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">处罚内容</span>
                    <span className="text-xs text-gray-900 text-right max-w-[200px]">{penalty.content}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">处罚机构</span>
                    <span className="text-xs text-gray-900">{penalty.agency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">决定日期</span>
                    <span className="text-xs text-gray-900">{penalty.decisionDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">发布日期</span>
                    <span className="text-xs text-gray-900">{penalty.publishDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
