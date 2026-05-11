/**
 * 好帮手多选框组件 (HbsCheckbox)
 * 基于 好帮手设计规范
 *
 * 状态: Default, Hover, Selected, Disabled
 * 尺寸: 44px × 44px
 * 圆角: 4px
 */

import React from 'react';
import { Check } from 'lucide-react';

interface HbsCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const HbsCheckbox: React.FC<HbsCheckboxProps> = ({
  checked = false,
  disabled = false,
  indeterminate = false,
  label,
  onChange,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const checkboxClasses = `
    w-11 h-11
    rounded
    flex items-center justify-center
    transition-all duration-200
    flex-shrink-0
    ${disabled
      ? 'bg-[#E8ECF2] border border-[#E8ECF2] cursor-not-allowed'
      : checked || indeterminate
        ? 'bg-[#FF6611] border border-[#FF6611] cursor-pointer'
        : 'bg-white border border-[#D8DAE3] cursor-pointer hover:border-[#AFB3C2]'
    }
  `;

  return (
    <div
      className={`inline-flex items-center ${disabled ? '' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
    >
      <div className={checkboxClasses}>
        {(checked || indeterminate) && (
          <Check
            className={`w-5 h-5 ${disabled ? 'text-[#AFB3C2]' : 'text-white'}`}
            strokeWidth={3}
          />
        )}
      </div>
      {label && (
        <span className={`ml-3 text-base ${disabled ? 'text-[#AFB3C2]' : 'text-[#222222]'}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default HbsCheckbox;
