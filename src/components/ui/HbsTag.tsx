/**
 * 好帮手标签组件 (HbsTag)
 * 基于 好帮手设计规范
 *
 * 类型: 普通、功能(品牌橙)、成功、警告、错误、信息
 * 圆角: 12px, 高度: 32px, 内边距: 8px
 */

import React from 'react';

type TagType = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

interface HbsTagProps {
  type?: TagType;
  children: React.ReactNode;
  className?: string;
}

const typeClasses: Record<TagType, string> = {
  default: 'bg-[#F4F6F9] text-[#222222] border border-[#D8DAE3]',
  primary: 'bg-[#FF6611] text-white',
  success: 'bg-[#56C468] text-white',
  warning: 'bg-[#F7B44C] text-white',
  error: 'bg-[#E85757] text-white',
  info: 'bg-[#508CEE] text-white',
};

export const HbsTag: React.FC<HbsTagProps> = ({
  type = 'default',
  children,
  className = '',
}) => {
  return (
    <span
      className={`
        inline-flex items-center
        h-8 px-2
        rounded-xl
        text-xs font-medium
        ${typeClasses[type]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default HbsTag;
