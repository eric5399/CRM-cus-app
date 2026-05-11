import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AgencyCustomerDetailsProps {
  onBack: () => void;
}

export default function AgencyCustomerDetails({ onBack }: AgencyCustomerDetailsProps) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-gray-900 ml-2">经代客户详情页</h1>
      </header>
      <div className="p-4">
        <p className="text-sm text-gray-600">这里是经代客户详情页内容，参考My App中的D经代公司页面元素。</p>
      </div>
    </div>
  );
}
