import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapProps } from "@/lib/utils/types";
import { Icon } from "leaflet";
import marker from "@/assets/images/icon-location.svg";
import { useEffect } from "react";

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

  const MapPositionUpdater = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    const map = useMap();

    useEffect(() => {
      map.setView([latitude, longitude]);
    }, [latitude, longitude, map]);

    return null;
  };

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
      <MapPositionUpdater latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default Map;
