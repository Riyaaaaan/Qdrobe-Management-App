import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    label: string;
    color?: string;
  }>;
  route?: Array<[number, number]>;
  currentLocation?: [number, number];
}

const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

export const MapView = ({ center, zoom = 13, markers = [], route, currentLocation }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);

  const createCustomIcon = (color: string = '#f08fa0') => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} zoom={zoom} />

        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={createCustomIcon('#3B82F6')}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={createCustomIcon(marker.color || '#f08fa0')}
          >
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}

        {route && route.length > 1 && (
          <Polyline
            positions={route}
            color="#f08fa0"
            weight={4}
            opacity={0.7}
          />
        )}
      </MapContainer>
    </div>
  );
};

