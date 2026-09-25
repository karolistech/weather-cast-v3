import type { Location } from "@/types/locations";

type IpLocationResponse = {
  cityGeoNameId: number;
  city: string;
  latitude: number;
  longitude: number;
};

const url = "https://apiip.net/api/check?&accessKey=d9e9de8a-6d77-4934-8db0-a7e944865788";

export async function fetchIpLocation(): Promise<Location> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`IP location request failed with the status code ${response.status}`);
  }

  const data: IpLocationResponse = await response.json();

  return {
    id: data.cityGeoNameId,
    name: data.city,
    lat: data.latitude,
    lon: data.longitude
  };
}
