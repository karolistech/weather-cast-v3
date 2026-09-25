import { type ReactNode, createContext, useContext, useEffect, useReducer } from "react";

import type { Location, Locations } from "@/types/locations";

import { fetchIpLocation } from "@/api/ipLocation";

type LocationsContext = {
  locations: Locations;
  setLocation: (location: Location) => void;
  pinLocation: () => void;
  saveLocation: () => void;
  removeLocation: (id: number) => void;
};

type State = Locations | null;

type Action =
  | { type: "INIT"; locations: Locations }
  | { type: "SET"; location: Location }
  | { type: "PIN" }
  | { type: "SAVE" }
  | { type: "REMOVE"; id: number };

const LocationsContext = createContext<LocationsContext | null>(null);

function locationsReducer(state: State, action: Action): State {
  if (action.type === "INIT") return action.locations;
  if (state === null) return state;

  switch (action.type) {
    case "SET":
      return { ...state, current: action.location };

    case "PIN":
      return { ...state, pinned: state.current };

    case "SAVE":
      const saved = state.saved.some(location => location.id === state.current.id);

      if (saved === true) return state;

      return { ...state, saved: [...state.saved, state.current] };

    case "REMOVE":
      return { ...state, saved: state.saved.filter(location => location.id !== action.id) };
  }
}

export function LocationsProvider({ children }: { children: ReactNode }) {
  const [locations, dispatch] = useReducer(locationsReducer, null);

  useEffect(() => {
    async function init() {
      try {
        // const location = await fetchIpLocation();

        const location = {
          id: 597231,
          name: "Marijampolė",
          lat: 54.5656,
          lon: 23.3446
        };

        dispatch({
          type: "INIT",
          locations: { current: location, pinned: location, saved: [location, location, location, location, location, location, location, location, location, location, location, location, location, location] }
        });
      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, []);

  if (locations === null) return "Loading Screen";

  const value: LocationsContext = {
    locations: locations,
    setLocation: location => dispatch({ type: "SET", location: location }),
    pinLocation: () => dispatch({ type: "PIN" }),
    saveLocation: () => dispatch({ type: "SAVE" }),
    removeLocation: id => dispatch({ type: "REMOVE", id })
  };

  return (
    <LocationsContext value={value}>
      {children}
    </LocationsContext>
  );
}

export function useLocations() {
  const context = useContext(LocationsContext);

  if (context === null) {
    throw new Error("useLocations must be used within a LocationsProvider");
  }

  return context;
}
