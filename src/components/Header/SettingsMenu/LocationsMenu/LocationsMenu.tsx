import { useLocations } from "@/contexts/LocationsContext";

import "./LocationsMenu.css";
import uiIcons from "@/assets/icons/ui-icons/ui-icons.svg";

type LocationsMenuProps = {
  closeLocationsMenu: () => void;
};

export default function LocationsMenu({ closeLocationsMenu }: LocationsMenuProps) {
  const { locations, setLocation, pinLocation, saveLocation, removeLocation } = useLocations();

  return (
    <>
      <div className="locations-menu__backdrop" />

      <div className="locations-menu">
        <header className="locations-menu__header">
          <h2 className="locations-menu__title">Locations Menu</h2>

          <button
            className="locations-menu__button locations-menu__button--close"
            onClick={closeLocationsMenu}
          >
            <svg className="locations-menu__icon">
              <use href={`${uiIcons}#close`} />
            </svg>
          </button>
        </header>

        <div className="locations-menu__section">
          <h3 className="locations-menu__section-title">Current Location</h3>

          <div className="locations-menu__current-location">
            <span className="locations-menu__current-location-name">
              {locations.current.name}
            </span>

            <div className="locations-menu__current-location-actions">
              <button
                className="locations-menu__button locations-menu__button--save"
                onClick={saveLocation}
              >
                <svg className="locations-menu__icon">
                  <use href={`${uiIcons}#save`} />
                </svg>
              </button>

              <button
                className="locations-menu__button locations-menu__button--pin"
                onClick={pinLocation}
              >
                <svg className="locations-menu__icon">
                  <use href={`${uiIcons}#pin`} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="locations-menu__section">
          <h3 className="locations-menu__section-title">Pinned Location</h3>

          <button
            className="locations-menu__pinned-location-button"
            onClick={() => setLocation(locations.pinned)}
          >
            {locations.pinned.name}
          </button>
        </div>

        <div className="locations-menu__section">
          <h3 className="locations-menu__section-title">Saved Locations</h3>

          <ul className="locations-menu__saved-locations">
            {locations.saved.map(location => (
              <li key={location.id} className="locations-menu__saved-location">
                <button
                  className="locations-menu__saved-location-button"
                  onClick={() => setLocation(location)}
                >
                  {location.name}
                </button>

                <button
                  className="locations-menu__button locations-menu__button--remove"
                  onClick={() => removeLocation(location.id)}
                >
                  <svg className="locations-menu__icon">
                    <use href={`${uiIcons}#clear`} />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
