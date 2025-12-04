import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '@/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { Eye, EyeOff } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Invalid phone number'),
  vehicleType: z.string().optional(),
  vehicleNumber: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const { register: registerUser, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched', // Only validate after user has interacted with the field
    reValidateMode: 'onBlur', // Re-validate on blur after first validation
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground">Join as a driver</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
              <div className="text-sm text-destructive">
                {(error as any)?.message || 'An error occurred during registration'}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              {...register('name')}
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.name?.message}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            <Input
              {...register('email')}
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            <Input
              {...register('phone')}
              type="tel"
              label="Phone Number"
              placeholder="Enter your phone number"
              error={errors.phone?.message}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Create a password"
                error={errors.password?.message}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <Input
              {...register('vehicleType')}
              type="text"
              label="Vehicle Type (Optional)"
              placeholder="e.g., Bike, Car"
              error={errors.vehicleType?.message}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
            <Input
              {...register('vehicleNumber')}
              type="text"
              label="Vehicle Number (Optional)"
              placeholder="e.g., DL-01-AB-1234"
              error={errors.vehicleNumber?.message}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
          >
            Sign Up
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="text-primary hover:underline font-medium"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
