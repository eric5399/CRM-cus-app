/**
 * 好帮手按钮组件 (HbsButton)
 * 基于 好帮手设计规范
 *
 * 命名规则: Button/Primary/Default/Large
 * 状态: Default, Hover, Active, Disabled, Loading
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface HbsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#FF6611] text-white hover:bg-[#CC4E0A] active:bg-[#993A06] disabled:bg-[#D8DAE3] disabled:text-[#AFB3C2]',
  secondary: 'bg-white text-[#FF6611] border border-[#FF6611] hover:bg-[#FFEFE7] active:bg-[#FFE0CF] disabled:border-[#D8DAE3] disabled:text-[#AFB3C2]',
  text: 'bg-transparent text-[#FF6611] hover:bg-[#FFEFE7] active:bg-[#FFE0CF] disabled:text-[#AFB3C2]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-13 px-6 text-lg',
};

export const HbsButton: React.FC<HbsButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-xl font-medium
        transition-all duration-200
        min-h-[44px] min-w-[64px]
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      )}
      {children}
    </button>
  );
};

export default HbsButton;
