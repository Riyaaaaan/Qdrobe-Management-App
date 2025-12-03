interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ title, value, icon, trend, className = '' }: StatsCardProps) => {
  return (
    <div className={`backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl border border-pink-100/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-3">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-3">
              <span className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center text-3xl shadow-lg shadow-primary-500/10">
          {icon}
        </div>
      </div>
    </div>
  );
};

