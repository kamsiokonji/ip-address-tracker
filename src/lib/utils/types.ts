export interface GeoLocationData {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
  };
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
}

export interface MapProps {
  data: GeoLocationData;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
}
