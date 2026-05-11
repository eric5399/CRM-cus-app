/**
 * 好帮手卡片组件 (HbsCard)
 * 基于 好帮手设计规范
 *
 * 类型: 大卡片、内部卡片
 * 圆角: 24px (大卡片) / 12px (内部卡片)
 * 左右留白: 24px
 */

import React from 'react';

interface HbsCardProps {
  variant?: 'large' | 'inner';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const HbsCard: React.FC<HbsCardProps> = ({
  variant = 'large',
  children,
  className = '',
  onClick,
}) => {
  const variantClasses = variant === 'large'
    ? 'rounded-3xl px-6 py-4'
    : 'rounded-xl p-4';

  return (
    <div
      className={`
        bg-white
        ${variantClasses}
        ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
        ${className}
      `.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface HbsCardHeaderProps {
  title: string;
  action?: React.ReactNode;
  className?: string;
}

export const HbsCardHeader: React.FC<HbsCardHeaderProps> = ({
  title,
  action,
  className = '',
}) => {
  return (
    <div className={`flex justify-between items-center mb-3 ${className}`}>
      <h3 className="text-base font-bold text-[#222222]">{title}</h3>
      {action}
    </div>
  );
};

export default HbsCard;
