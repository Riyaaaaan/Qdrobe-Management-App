import { useLocation } from '../hooks/useLocation';
import { useDriverLocation } from '../hooks/useDriverLocation';
import { Signal, MapPin, Clock, Wifi, WifiOff } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const LocationStatus = () => {
  const { location, error, loading } = useLocation();
  const { data: serverLocation, isError: serverError, dataUpdatedAt } = useDriverLocation();

  const getAccuracyLevel = (accuracy?: number) => {
    if (!accuracy) return 'unknown';
    if (accuracy < 10) return 'excellent';
    if (accuracy < 30) return 'good';
    if (accuracy < 100) return 'fair';
    return 'poor';
  };

  const getAccuracyColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const accuracyLevel = getAccuracyLevel(location?.accuracy);
  const serverConnected = !serverError && serverLocation;

  return (
    <div className="bg-card rounded-lg p-3 border border-border space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Signal className={`h-4 w-4 ${getAccuracyColor(accuracyLevel)}`} />
          <span className="text-muted-foreground">GPS:</span>
          <span className={`font-medium ${getAccuracyColor(accuracyLevel)}`}>
            {loading ? 'Loading...' : error ? 'Error' : accuracyLevel}
          </span>
        </div>
        {location?.accuracy && (
          <span className="text-muted-foreground">±{Math.round(location.accuracy)}m</span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Position:</span>
          <span className="font-medium text-foreground">
            {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Unknown'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {serverConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-muted-foreground">Server:</span>
          <span className={`font-medium ${serverConnected ? 'text-green-500' : 'text-red-500'}`}>
            {serverConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        {dataUpdatedAt && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(dataUpdatedAt, { addSuffix: true })}</span>
          </div>
        )}
      </div>

      {location?.speed !== undefined && location.speed !== null && (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Speed:</span>
          <span className="font-medium text-foreground">
            {Math.round((location.speed || 0) * 3.6)} km/h
          </span>
        </div>
      )}
    </div>
  );
};

