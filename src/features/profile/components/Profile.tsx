import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProfile, useUpdateProfile } from '../hooks/useProfile';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Layout } from '@/features/dashboard/components/Layout';
import { Button, Input } from '@/shared/components';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { User } from '@/shared/types';
import { ArrowLeft, Edit, User as UserIcon, Bike, CreditCard, Bell, Globe, Map, HelpCircle, Scale, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  vehicleType: z.string().optional(),
  vehicleNumber: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const Profile = () => {
  const { data: profile, isLoading } = useProfile();
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const updateProfileMutation = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || user || {},
    mode: 'onTouched', // Only validate after user has interacted with the field
    reValidateMode: 'onBlur', // Re-validate on blur after first validation
  });

  React.useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4 p-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground flex-1">Profile</h1>
          <button className="text-primary hover:underline text-sm font-medium">
            Edit
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary-foreground">
                {user?.name?.charAt(0) || 'D'}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-foreground mb-1">{user?.name || 'Driver'}</div>
              <div className="text-sm text-muted-foreground mb-4">ID: {user?.id || 'N/A'}</div>
              <div className="flex gap-6">
                <div>
                  <div className="text-2xl font-bold text-foreground">4.9</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>⭐</span>
                    <span>Star Rating</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">2,512</div>
                  <div className="text-xs text-muted-foreground">Total Deliveries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="font-semibold text-foreground">Account</div>
          </div>
          <div className="divide-y divide-border">
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Personal Details</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Bike className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Vehicle Details</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Bank Account / Payouts</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* App Settings Section */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="font-semibold text-foreground">App Settings</div>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Push Notifications</span>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  true ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    true ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">English</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Map className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Navigation App</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Google Maps</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          </div>
        </div>

        {/* Support & Legal Section */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="font-semibold text-foreground">Support & Legal</div>
          </div>
          <div className="divide-y divide-border">
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Help & Support</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Terms & Conditions</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Privacy Policy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Log Out Button */}
        <Button
          variant="destructive"
          fullWidth
          className="h-12 bg-red-600 hover:bg-red-700"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </Layout>
  );
};
