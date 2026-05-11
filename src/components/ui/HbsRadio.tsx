/**
 * 好帮手单选框组件 (HbsRadio)
 * 基于 好帮手设计规范
 *
 * 状态: Default, Hover, Selected, Disabled
 * 尺寸: 44px × 44px
 */

import React from 'react';

interface HbsRadioProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const HbsRadio: React.FC<HbsRadioProps> = ({
  checked = false,
  disabled = false,
  label,
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
      className={`inline-flex items-center ${disabled ? '' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
    >
      <div
        className={`
          w-11 h-11
          rounded-full
          border
          flex items-center justify-center
          transition-all duration-200
          flex-shrink-0
          ${disabled
            ? 'border-[#E8ECF2] cursor-not-allowed'
            : checked
              ? 'border-[#FF6611] cursor-pointer'
              : 'border-[#D8DAE3] cursor-pointer hover:border-[#AFB3C2]'
          }
        `}
      >
        <div
          className={`
            w-[18px] h-[18px]
            rounded-full
            transition-all duration-200
            ${disabled
              ? checked ? 'bg-[#AFB3C2]' : 'bg-transparent'
              : checked ? 'bg-[#FF6611]' : 'bg-transparent'
            }
          `}
        />
      </div>
      {label && (
        <span className={`ml-3 text-base ${disabled ? 'text-[#AFB3C2]' : 'text-[#222222]'}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default HbsRadio;
