import { fetchData } from "@/api";
import backgroundImage from "@/assets/images/pattern-bg-desktop.png";
import image from "@/assets/images/pattern-bg-mobile.png";
import Search from "@/components/Search";
import { Skeleton } from "@/components/ui/skeleton";
import { GeoLocationData } from "@/lib/utils/types";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Map from "@/components/Map";

const Home = () => {
  const [data, setData] = useState<GeoLocationData | null>(null);
  const [initialIpAddress, setInitialIpAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = async (searchValue: string) => {
    try {
      setLoading(true);
      const result = await fetchData(searchValue);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserIpData = async () => {
      try {
        setLoading(true);
        const result = await fetchData("");
        setData(result);
        setInitialIpAddress(result?.ip);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's IP data:", error);
        setLoading(false);
      }
    };

    fetchUserIpData();
  }, []);

  return (
    <>
      <div className="relative flex justify-center">
        <img
          src={backgroundImage}
          alt="background-image"
          className="w-full sm:hidden lg:block md:block md:h-64"
        />
        <img
          src={image}
          alt="background-image"
          className="w-full sm:block lg:hidden md:hidden h-96"
        />

        <h1 className="absolute top-9 text-2xl font-rubik font-medium text-white">
          IP Address Tracker
        </h1>

        <div className="absolute sm:w-2/3 lg:w-1/3 md:w-2/3">
          <Search onSearch={handleSearch} initialValue={initialIpAddress} />
        </div>

        <div className="absolute bg-white rounded-xl sm:p-6 lg:p-10 md:p-10 lg:w-2/3 sm:w-2/3 md:w-10/12 top-48 font-rubik shadow-lg z-10">
          <div className="flex lg:flex-row md:flex-row sm:flex-col sm:items-center sm:space-y-5 lg:space-y-0 md:space-y-0 lg:justify-between md:justify-between">
            <div className="flex flex-col space-y-1 sm:items-center lg:items-start md:items-start">
              <h1 className="text-secondary text-sm font-medium">IP ADDRESS</h1>
              <h1 className="text-primary font-bold text-label">
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  data?.ip ?? "N/A"
                )}
              </h1>
            </div>

            <div className="flex flex-col space-y-1 sm:items-center lg:items-start md:items-start">
              <h1 className="text-secondary text-sm font-medium">LOCATION</h1>
              <h1 className="text-primary font-bold text-label">
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  `${data?.location?.city ?? "N/A"}, ${
                    data?.location?.region ?? "N/A"
                  }`
                )}
              </h1>
            </div>

            <div className="flex flex-col space-y-1 sm:items-center lg:items-start md:items-start">
              <h1 className="text-secondary text-sm font-medium">TIMEZONE</h1>
              <h1 className="text-primary font-bold text-label">
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  `UTC ${data?.location?.timezone ?? "N/A"}`
                )}
              </h1>
            </div>

            <div className="flex flex-col space-y-1 sm:items-center lg:items-start md:items-start">
              <h1 className="text-secondary text-sm font-medium">ISP</h1>
              <h1 className="text-primary font-bold text-label">
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  data?.isp ?? "N/A"
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-0">
        {data && data?.location && (
          <Map
            data={data}
            latitude={data?.location?.lat}
            longitude={data?.location?.lng}
            city={data?.location?.city}
            region={data?.location?.region}
            country={data?.location?.country}
          />
        )}
      </div>
    </>
  );
};

export default Home;
