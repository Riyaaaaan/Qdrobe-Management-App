import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from './ui/button';
import { cn } from '@/shared/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'default' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'default' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantMap: Record<string, ShadcnButtonProps['variant']> = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  danger: 'destructive',
  default: 'default',
  destructive: 'destructive',
  link: 'link',
};

const sizeMap: Record<string, ShadcnButtonProps['size']> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
  default: 'default',
  icon: 'icon',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variantMap[variant] || 'default'}
        size={sizeMap[size] || 'default'}
        className={cn(
          fullWidth && 'w-full',
          isLoading && 'opacity-50 cursor-not-allowed',
          variant === 'primary' && 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/30',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';

