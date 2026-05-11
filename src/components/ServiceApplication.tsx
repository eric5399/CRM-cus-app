import React, { useState } from 'react';
import { Client, KeyPerson } from '../types';
import { ArrowLeft, Search, Plus, ChevronRight, X } from 'lucide-react';

interface ServiceApplicationProps {
  client: Client;
  onBack: () => void;
  onSubmit: () => void;
}

// Mock data
const mockKeyPersons: KeyPerson[] = [
  { id: 'kp1', name: '张三', phone: '13800138000', role: '超级管理员', position: '人力资源总监' },
  { id: 'kp2', name: '李四', phone: '13900139000', role: '经办人' },
];

// Hierarchical service catalog
const serviceCatalog = {
  '企业研学': {
    '全部': [
      { id: 's1', name: '抖音全球总部参访', desc: '走进抖音总部', price: 5000, stock: 10, icon: '🏢' },
      { id: 's2', name: '腾讯总部参访', desc: '走进腾讯总部', price: 6000, stock: 5, icon: '🐧' },
      { id: 's3', name: '企业管理实战课', desc: '深度管理培训', price: 8000, stock: 8, icon: '📚' },
      { id: 's4', name: '安全生产讲座', desc: '企业安全培训', price: 2000, stock: 15, icon: '🛡️' },
      { id: 's5', name: '风险减量评估', desc: '企业风险评估', price: 3000, stock: 12, icon: '📉' },
    ],
    '行业论坛': [
      { id: 's6', name: '年度行业峰会', desc: '行业前沿交流', price: 1000, stock: 100, icon: '🎤' },
    ],
    '安全生产': [
      { id: 's4', name: '安全生产讲座', desc: '企业安全培训', price: 2000, stock: 15, icon: '🛡️' },
    ],
    '风险减量': [
      { id: 's5', name: '风险减量评估', desc: '企业风险评估', price: 3000, stock: 12, icon: '📉' },
    ]
  },
  '车主尊享': {
    '全部': [
      { id: 's7', name: '基础洗车', desc: '快速洗车服务', price: 50, stock: 100, icon: '🚗' },
      { id: 's8', name: '商务代驾', desc: '专业代驾服务', price: 150, stock: 50, icon: '👤' },
      { id: 's9', name: '全车喷漆', desc: '原厂工艺喷漆', price: 3000, stock: 5, icon: '🎨' },
      { id: 's10', name: '精细打蜡', desc: '车漆养护打蜡', price: 200, stock: 40, icon: '✨' },
      { id: 's11', name: '加油卡', desc: '加油优惠卡', price: 500, stock: 200, icon: '⛽' },
      { id: 's12', name: '快速充电', desc: '新能源充电', price: 100, stock: 100, icon: '⚡' },
      { id: 's13', name: '深度保养', desc: '车辆定期保养', price: 1000, stock: 20, icon: '🔧' },
      { id: 's14', name: '全车消毒', desc: '车内深度消毒', price: 300, stock: 30, icon: '🧼' },
    ],
    '洗车': [{ id: 's7', name: '基础洗车', desc: '快速洗车服务', price: 50, stock: 100, icon: '🚗' }],
    '代驾': [{ id: 's8', name: '商务代驾', desc: '专业代驾服务', price: 150, stock: 50, icon: '👤' }],
    '喷漆': [{ id: 's9', name: '全车喷漆', desc: '原厂工艺喷漆', price: 3000, stock: 5, icon: '🎨' }],
    '打蜡': [{ id: 's10', name: '精细打蜡', desc: '车漆养护打蜡', price: 200, stock: 40, icon: '✨' }],
    '加油': [{ id: 's11', name: '加油卡', desc: '加油优惠卡', price: 500, stock: 200, icon: '⛽' }],
    '充电': [{ id: 's12', name: '快速充电', desc: '新能源充电', price: 100, stock: 100, icon: '⚡' }],
    '保养': [{ id: 's13', name: '深度保养', desc: '车辆定期保养', price: 1000, stock: 20, icon: '🔧' }],
    '消毒': [{ id: 's14', name: '全车消毒', desc: '车内深度消毒', price: 300, stock: 30, icon: '🧼' }],
  },
  '医健服务': {
    '全部': [
      { id: 's15', name: '洁牙券', desc: '深度洁牙服务', price: 300, stock: 50, icon: '🦷' },
      { id: 's16', name: '深度洁牙券', desc: '全面深度洁牙', price: 600, stock: 30, icon: '🦷' },
      { id: 's17', name: '高端体检', desc: '全面健康管理', price: 8000, stock: 20, icon: '🏥' },
    ],
    '口腔健康': [
      { id: 's15', name: '洁牙券', desc: '深度洁牙服务', price: 300, stock: 50, icon: '🦷' },
      { id: 's16', name: '深度洁牙券', desc: '全面深度洁牙', price: 600, stock: 30, icon: '🦷' },
    ],
    '体检服务': [
      { id: 's17', name: '高端体检', desc: '全面健康管理', price: 8000, stock: 20, icon: '🏥' },
    ]
  },
  '商旅生活': {
    '全部': [
      { id: 's18', name: '五星酒店券', desc: '高端酒店住宿', price: 1500, stock: 10, icon: '🏨' },
      { id: 's19', name: '机场接送', desc: '高端商务接送', price: 400, stock: 30, icon: '🚗' },
      { id: 's20', name: '名师辅导班', desc: '子女教育辅导', price: 5000, stock: 15, icon: '🎓' },
      { id: 's21', name: '足球赛门票', desc: '体育赛事观赛', price: 800, stock: 20, icon: '⚽' },
    ],
    '酒店权益': [{ id: 's18', name: '五星酒店券', desc: '高端酒店住宿', price: 1500, stock: 10, icon: '🏨' }],
    '高端接送': [{ id: 's19', name: '机场接送', desc: '高端商务接送', price: 400, stock: 30, icon: '🚗' }],
    '子女教育': [{ id: 's20', name: '名师辅导班', desc: '子女教育辅导', price: 5000, stock: 15, icon: '🎓' }],
    '体育赛事': [{ id: 's21', name: '足球赛门票', desc: '体育赛事观赛', price: 800, stock: 20, icon: '⚽' }],
  }
};

export default function ServiceApplication({ client, onBack, onSubmit }: ServiceApplicationProps) {
  const [applySelectedPerson, setApplySelectedPerson] = useState<string | null>(mockKeyPersons[0]?.id || null);
  const [keyPersonSearch, setKeyPersonSearch] = useState('');
  const [applyCategory, setApplyCategory] = useState('企业研学');
  const [applySubCategory, setApplySubCategory] = useState<string>('全部');
  const [showAddKeyPersonModal, setShowAddKeyPersonModal] = useState(false);
  const [newKeyPerson, setNewKeyPerson] = useState<Omit<KeyPerson, 'id'>>({ name: '', phone: '', role: '经办人', position: '' });
  const [keyPersons, setKeyPersons] = useState<KeyPerson[]>(mockKeyPersons);
  const [selectedServices, setSelectedServices] = useState<Array<{id: string, name: string}>>([]);

  const filteredKeyPersons = keyPersons.filter(p => p.name.includes(keyPersonSearch));
  const subCategories = Object.keys(serviceCatalog[applyCategory as keyof typeof serviceCatalog] || {});
  const services = serviceCatalog[applyCategory as keyof typeof serviceCatalog]?.[applySubCategory as keyof typeof serviceCatalog['企业研学']] || [];

  const handleAddKeyPerson = () => {
    const kp: KeyPerson = { ...newKeyPerson, id: 'kp' + Date.now() };
    setKeyPersons([...keyPersons, kp]);
    setApplySelectedPerson(kp.id);
    setNewKeyPerson({ name: '', phone: '', role: '经办人', position: '' });
    setShowAddKeyPersonModal(false);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-gray-900 ml-2">服务权益申请</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col p-4 space-y-4">
        {/* Section 1: Select Key Person */}
        <div className="p-4 bg-white rounded-xl">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></span>
              选关键人
            </div>
            <button onClick={() => setShowAddKeyPersonModal(true)} className="text-xs text-orange-600 font-bold flex items-center">
              <Plus className="w-3 h-3 mr-1" /> 新增
            </button>
          </h4>
          
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="搜索关键人..."
              value={keyPersonSearch}
              onChange={(e) => setKeyPersonSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="flex overflow-x-auto pb-2 space-x-3 hide-scrollbar">
            {filteredKeyPersons.map(person => (
              <button
                key={person.id}
                onClick={() => setApplySelectedPerson(person.id)}
                className={`flex-shrink-0 flex flex-col items-start p-3 rounded-xl border transition-colors ${
                  applySelectedPerson === person.id ? 'bg-orange-50 border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center mb-1">
                  <span className="text-xs font-bold text-gray-900">{person.name}</span>
                  <span className="text-[10px] text-gray-500 ml-1">| {person.role}</span>
                </div>
                <div className="text-[10px] text-gray-500">{person.phone}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Select Service */}
        <div className="flex-1 flex flex-col bg-white rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></span>
              选服务
            </h4>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="搜索服务名称..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-xs" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {['企业研学', '车主尊享', '医健服务', '商旅生活'].map(cat => (
              <button
                key={cat}
                onClick={() => { setApplyCategory(cat); setApplySubCategory('全部'); }}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 ${
                  applyCategory === cat ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service Hierarchy */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sub-categories */}
            <div className="w-24 bg-gray-50 overflow-y-auto border-r border-gray-100">
              {subCategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setApplySubCategory(sub)}
                  className={`w-full text-left px-3 py-4 text-xs ${
                    applySubCategory === sub
                      ? 'bg-white font-bold text-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
            
            {/* Service List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {services.map(service => (
                <div key={service.id} className="flex items-center p-3 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                  <div className="text-2xl mr-3">{service.icon}</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-900 flex items-center">
                      {service.name}
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-1" />
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{service.desc}</div>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-[10px] text-red-500 font-bold">¥{service.price}</span>
                      <span className="text-[10px] text-gray-400">库存: {service.stock}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (!selectedServices.find(s => s.id === service.id)) {
                        setSelectedServices([...selectedServices, { id: service.id, name: service.name }]);
                      }
                    }}
                    className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors shrink-0 ml-2"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white border-t border-gray-100 flex flex-col shrink-0">
        {/* Selected Services Area */}
        {selectedServices.length > 0 && (
          <div className="p-3 border-b border-gray-50 flex flex-wrap gap-2 max-h-24 overflow-y-auto bg-orange-50/30">
            <span className="text-xs text-gray-500 py-1 mr-1">已选:</span>
            {selectedServices.map(s => (
              <div key={s.id} className="flex items-center bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs border border-orange-100">
                <span>{s.name}</span>
                <button 
                  onClick={() => setSelectedServices(selectedServices.filter(item => item.id !== s.id))}
                  className="ml-1.5 text-orange-400 hover:text-orange-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="p-4 flex space-x-3">
          <button onClick={onBack} className="flex-1 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl">取消</button>
          <button onClick={handleSubmit} className="flex-[2] py-3 text-sm font-bold text-white bg-orange-600 rounded-xl shadow-lg shadow-orange-600/20">发起申请</button>
        </div>
      </div>

      {/* Add Key Person Modal */}
      {showAddKeyPersonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900">新增关键人</h3>
            <input type="text" placeholder="姓名" value={newKeyPerson.name} onChange={(e) => setNewKeyPerson({...newKeyPerson, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            <input type="text" placeholder="手机号" value={newKeyPerson.phone} onChange={(e) => setNewKeyPerson({...newKeyPerson, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            <select value={newKeyPerson.role} onChange={(e) => setNewKeyPerson({...newKeyPerson, role: e.target.value as any})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="超级管理员">超级管理员</option>
              <option value="经办人">经办人</option>
              <option value="其他">其他</option>
            </select>
            <input type="text" placeholder="职位 (选填)" value={newKeyPerson.position} onChange={(e) => setNewKeyPerson({...newKeyPerson, position: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowAddKeyPersonModal(false)} className="flex-1 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded-lg">取消</button>
              <button onClick={handleAddKeyPerson} className="flex-1 py-2 text-sm font-bold text-white bg-orange-500 rounded-lg">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
