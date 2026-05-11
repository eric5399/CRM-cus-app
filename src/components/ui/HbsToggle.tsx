/**
 * 好帮手开关组件 (HbsToggle)
 * 基于 好帮手设计规范
 *
 * 状态: Off, On, Disabled
 * 尺寸: 56px × 32px
 * 圆角: 16px (胶囊形)
 */

import React from 'react';

interface HbsToggleProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const HbsToggle: React.FC<HbsToggleProps> = ({
  checked = false,
  disabled = false,
  onChange,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={`
        inline-flex items-center
        ${disabled ? '' : 'cursor-pointer'}
        ${className}
      `}
      onClick={handleClick}
    >
      <div
        className={`
          relative
          w-14 h-8
          rounded-full
          transition-all duration-200
          ${disabled
            ? 'bg-[#E8ECF2]'
            : checked
              ? 'bg-[#56C468]'
              : 'bg-[#D8DAE3]'
          }
        `}
      >
        <div
          className={`
            absolute
            top-1
            w-7 h-7
            rounded-full
            bg-white
            shadow-sm
            transition-all duration-200
            ${disabled
              ? 'left-1 bg-[#AFB3C2]'
              : checked
                ? 'left-[26px]'
                : 'left-1'
            }
          `}
        />
      </div>
    </div>
  );
};

export default HbsToggle;
