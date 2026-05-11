/**
 * 好帮手 UI 组件展示页面
 * HbsShowcase - 展示所有 UI 组件
 */

import React, { useState } from 'react';
import {
  HbsButton,
  HbsInput,
  HbsCheckbox,
  HbsRadio,
  HbsToggle,
  HbsTag,
  HbsCard,
  HbsCardHeader,
} from './index';

const HbsShowcase: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [toggleValue, setToggleValue] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6F9] pb-20">
      {/* Header */}
      <div className="bg-[#FF6611] text-white px-6 py-12">
        <h1 className="text-2xl font-medium">好帮手 UI 组件库</h1>
        <p className="text-sm opacity-80 mt-2">基于好帮手设计规范 v3.2</p>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* 按钮组件 */}
        <HbsCard>
          <HbsCardHeader title="按钮组件 HbsButton" />
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <HbsButton variant="primary">主要按钮</HbsButton>
              <HbsButton variant="secondary">次要按钮</HbsButton>
              <HbsButton variant="text">文字按钮</HbsButton>
            </div>
            <div className="flex flex-wrap gap-3">
              <HbsButton variant="primary" size="sm">小按钮</HbsButton>
              <HbsButton variant="primary" size="md">中按钮</HbsButton>
              <HbsButton variant="primary" size="lg">大按钮</HbsButton>
            </div>
            <div className="flex flex-wrap gap-3">
              <HbsButton variant="primary" loading>加载中</HbsButton>
              <HbsButton variant="primary" disabled>禁用</HbsButton>
              <HbsButton variant="primary" fullWidth>全宽按钮</HbsButton>
            </div>
          </div>
        </HbsCard>

        {/* 输入框组件 */}
        <HbsCard>
          <HbsCardHeader title="输入框组件 HbsInput" />
          <div className="space-y-4">
            <HbsInput
              label="默认输入框"
              placeholder="请输入内容"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HbsInput
              label="错误状态"
              placeholder="请输入内容"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              error="输入内容不能为空"
            />
            <HbsInput
              label="禁用状态"
              placeholder="不可输入"
              disabled
              defaultValue="禁用内容"
            />
          </div>
        </HbsCard>

        {/* 多选框组件 */}
        <HbsCard>
          <HbsCardHeader title="多选框组件 HbsCheckbox" />
          <div className="space-y-4">
            <HbsCheckbox
              label="未选中状态"
              checked={false}
              onChange={(c) => console.log('unchecked:', c)}
            />
            <HbsCheckbox
              label="选中状态"
              checked={true}
              onChange={(c) => console.log('checked:', c)}
            />
            <HbsCheckbox
              label="半选状态 (indeterminate)"
              checked={true}
              indeterminate
            />
            <HbsCheckbox
              label="禁用状态"
              checked={true}
              disabled
            />
          </div>
        </HbsCard>

        {/* 单选框组件 */}
        <HbsCard>
          <HbsCardHeader title="单选框组件 HbsRadio" />
          <div className="space-y-4">
            <HbsRadio
              label="选项一"
              checked={radioValue === 'option1'}
              onChange={() => setRadioValue('option1')}
            />
            <HbsRadio
              label="选项二"
              checked={radioValue === 'option2'}
              onChange={() => setRadioValue('option2')}
            />
            <HbsRadio
              label="禁用状态"
              checked={false}
              disabled
            />
          </div>
        </HbsCard>

        {/* 开关组件 */}
        <HbsCard>
          <HbsCardHeader title="开关组件 HbsToggle" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base text-[#222222]">关闭状态</span>
              <HbsToggle
                checked={false}
                onChange={(c) => console.log('toggle off:', c)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-[#222222]">开启状态</span>
              <HbsToggle
                checked={true}
                onChange={(c) => console.log('toggle on:', c)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-[#222222]">禁用状态</span>
              <HbsToggle checked={true} disabled />
            </div>
          </div>
        </HbsCard>

        {/* 标签组件 */}
        <HbsCard>
          <HbsCardHeader title="标签组件 HbsTag" />
          <div className="flex flex-wrap gap-2">
            <HbsTag type="default">普通标签</HbsTag>
            <HbsTag type="primary">功能标签</HbsTag>
            <HbsTag type="success">成功</HbsTag>
            <HbsTag type="warning">待处理</HbsTag>
            <HbsTag type="error">错误</HbsTag>
            <HbsTag type="info">信息</HbsTag>
          </div>
        </HbsCard>

        {/* 卡片组件 */}
        <HbsCard>
          <HbsCardHeader
            title="大卡片 HbsCard"
            action={<span className="text-xs text-[#FF6611]">查看更多</span>}
          />
          <p className="text-sm text-[#737587]">
            这是大卡片内容，圆角 24px，左右留白 24px。
          </p>
        </HbsCard>

        <HbsCard variant="inner">
          <HbsCardHeader title="内部卡片 HbsCard (variant=inner)" />
          <p className="text-sm text-[#737587]">
            这是内部卡片内容，圆角 12px。
          </p>
        </HbsCard>

        {/* 颜色展示 */}
        <HbsCard>
          <HbsCardHeader title="品牌色系" />
          <div className="grid grid-cols-4 gap-2">
            {[
              { color: '#993A06', name: '最深' },
              { color: '#CC4E0A', name: '深色' },
              { color: '#FF6611', name: '标准' },
              { color: '#FFA370', name: '中等' },
              { color: '#FF8541', name: '较浅' },
              { color: '#FFC2A0', name: '浅色' },
              { color: '#FFE0CF', name: '极浅' },
              { color: '#FFEFE7', name: '最浅' },
            ].map((item) => (
              <div key={item.color} className="text-center">
                <div
                  className="w-full h-12 rounded-lg mb-1"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-[#737587]">{item.name}</span>
              </div>
            ))}
          </div>
        </HbsCard>

        <HbsCard>
          <HbsCardHeader title="功能色" />
          <div className="grid grid-cols-4 gap-2">
            {[
              { color: '#508CEE', name: '信息' },
              { color: '#56C468', name: '成功' },
              { color: '#F7B44C', name: '警告' },
              { color: '#E85757', name: '错误' },
            ].map((item) => (
              <div key={item.color} className="text-center">
                <div
                  className="w-full h-12 rounded-lg mb-1"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-[#737587]">{item.name}</span>
              </div>
            ))}
          </div>
        </HbsCard>
      </div>
    </div>
  );
};

export default HbsShowcase;
