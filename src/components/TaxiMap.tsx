import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl = undefined;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  className?: string;
}

export default function TaxiMap({ className = "" }: Props) {
  return (
    <div className={`rounded-2xl overflow-hidden border border-border ${className}`}>
      <MapContainer
        center={[55.7558, 37.6176]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
      </MapContainer>
    </div>
  );
}
