import { InputHTMLAttributes, forwardRef } from 'react';
import { Input as ShadcnInput } from './ui/input';
import { cn } from '@/shared/lib/utils';
import { Label } from './ui/label';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <Label className="mb-2">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <ShadcnInput
          ref={ref}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

