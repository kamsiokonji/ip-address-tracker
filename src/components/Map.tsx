import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapProps } from "@/lib/utils/types";
import { Icon } from "leaflet";
import marker from "@/assets/images/icon-location.svg";

const Map: React.FC<MapProps> = ({
  latitude,
  longitude,
  city,
  region,
  country,
}) => {
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [35, 40],
  });

  console.log(latitude, longitude);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>{`${city}, ${region}, ${country}`}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
