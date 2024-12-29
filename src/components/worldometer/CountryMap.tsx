import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import type { CountryStats } from '../../services/worldometerService';

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface CountryMapProps {
  country: CountryStats;
}

export default function CountryMap({ country }: CountryMapProps) {
  const position: [number, number] = [country.countryInfo.lat, country.countryInfo.long];

  return (
    <div className="h-64 rounded-lg overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={4} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>
            <div className="text-sm">
              <strong>{country.country}</strong>
              <br />
              Population: {country.population.toLocaleString()}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}