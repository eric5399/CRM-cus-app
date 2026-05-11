/**
 * 好帮手输入框组件 (HbsInput)
 * 基于 好帮手设计规范
 *
 * 状态: Default, Focus, Filled, Error, Disabled, ReadOnly
 * 圆角: 12px, 高度: 56px
 */

import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface HbsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const HbsInput = forwardRef<HTMLInputElement, HbsInputProps>(({
  label,
  error,
  helperText,
  disabled,
  className = '',
  ...props
}, ref) => {
  const baseClasses = `
    w-full h-14
    rounded-xl
    border
    px-4
    text-base
    transition-all duration-200
    placeholder:text-[#AFB3C2]
  `;

  const stateClasses = error
    ? 'border-[#E85757] bg-[#FFEAE9] text-[#E85757] focus:outline-none'
    : disabled
      ? 'border-[#E8ECF2] bg-[#F4F6F9] text-[#AFB3C2] cursor-not-allowed'
      : 'border-[#D8DAE3] bg-white text-[#222222] focus:border-[#FF6611] focus:outline-none';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#222222] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          className={`
            ${baseClasses}
            ${stateClasses}
            ${className}
          `.trim()}
          disabled={disabled}
          {...props}
        />
        {error && (
          <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E85757]" />
        )}
      </div>
      {(error || helperText) && (
        <p className={`mt-1 text-xs ${error ? 'text-[#E85757]' : 'text-[#AFB3C2]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

HbsInput.displayName = 'HbsInput';

export default HbsInput;
