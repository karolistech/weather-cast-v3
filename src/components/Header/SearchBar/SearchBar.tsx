import { type ChangeEvent, useState } from "react";

import type { GeocodedLocation } from "@/types/locations";

import { fetchGeocodedLocations } from "@/api/geocoding";

import { useLocations } from "@/contexts/LocationsContext";

import "./SearchBar.css";
import uiIcons from "@/assets/icons/ui-icons/ui-icons.svg";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<GeocodedLocation[]>([]);

  const { setLocation } = useLocations();

  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setQuery(value);

    try {
      const locations = await fetchGeocodedLocations(value);

      setLocations(locations);
    } catch (error) {
      console.error(error);
    }
  }

  function clearSearch() {
    setQuery("");
    setLocations([]);
  }

  function selectLocation(location: GeocodedLocation) {
    setLocation({ id: location.id, name: location.name, lat: location.lat, lon: location.lon });
    clearSearch();
  }

  return (
    <div className="search-bar">
      <svg className="search-bar__icon search-bar__icon--search">
        <use href={`${uiIcons}#search`} />
      </svg>

      <input
        type="search" className="search-bar__input" placeholder="Search for a location..."
        value={query} onChange={handleSearch}
      />

      {query !== "" && (
        <button className="search-bar__clear-button" onClick={clearSearch}>
          <svg className="search-bar__icon">
            <use href={`${uiIcons}#clear`} />
          </svg>
        </button>
      )}

      <ul className="search-bar__locations">
        {locations.map(location => (
          <Location key={location.id} location={location} selectLocation={selectLocation} />
        ))}
      </ul>
    </div>
  );
}

type LocationProps = {
  location: GeocodedLocation;
  selectLocation: (location: GeocodedLocation) => void;
};

function Location({ location, selectLocation }: LocationProps) {
  const flag = getCountryFlag(location.countryCode);

  return (
    <li className="search-bar__location">
      <button className="search-bar__location-button" onClick={() => selectLocation(location)}>
        <img src={flag} alt={`${location.country} flag`} className="search-bar__location-flag" />

        <div className="search-bar__location-data">
          <span className="search-bar__location-name">
            {location.name}
          </span>

          <span className="search-bar__location-region">
            {[location.region, location.country].filter(Boolean).join(", ")}
          </span>
        </div>
      </button>
    </li>
  );
}

function getCountryFlag(countryCode: string): string {
  return `https://open-meteo.com/images/country-flags/${countryCode}.svg`;
}
