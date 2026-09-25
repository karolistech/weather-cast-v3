import { useState } from "react";

import { useSettings } from "@/contexts/SettingsContext";

import LocationsMenu from "./LocationsMenu/LocationsMenu";

import "./SettingsMenu.css";
import uiIcons from "@/assets/icons/ui-icons/ui-icons.svg";

export default function SettingsMenu() {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [locationsMenuOpen, setLocationsMenuOpen] = useState(false);

  const { tempUnit, theme, toggleTempUnit, toggleTheme } = useSettings();

  function toggleSettingsMenu() {
    setSettingsMenuOpen(open => !open);
  }

  function openLocationsMenu() {
    setLocationsMenuOpen(true);
  }

  function closeLocationsMenu() {
    setLocationsMenuOpen(false);
  }

  return (
    <div className="settings-menu">
      <button className="settings-menu__button" onClick={toggleSettingsMenu}>
        <svg className="settings-menu__icon">
          <use href={`${uiIcons}#settings`} />
        </svg>
      </button>

      {settingsMenuOpen && (
        <div className="settings-menu__settings">
          <button className="settings-menu__setting-button" onClick={toggleTempUnit}>
            <svg className="settings-menu__setting-icon">
              <use href={`${uiIcons}#thermometer`} />
            </svg>

            <span className="settings-menu__setting-label">
              {tempUnit === "celsius" ? "Celsius" : "Fahrenheit"}
            </span>
          </button>

          <button className="settings-menu__setting-button" onClick={toggleTheme}>
            <svg className="settings-menu__setting-icon">
              <use href={`${uiIcons}#${theme === "light" ? "light-theme" : "dark-theme"}`} />
            </svg>

            <span className="settings-menu__setting-label">
              {theme === "light" ? "Light theme" : "Dark theme"}
            </span>
          </button>

          <button className="settings-menu__setting-button" onClick={openLocationsMenu}>
            <svg className="settings-menu__setting-icon">
              <use href={`${uiIcons}#location`} />
            </svg>

            <span className="settings-menu__setting-label">
              Locations
            </span>
          </button>
        </div>
      )}

      {settingsMenuOpen && locationsMenuOpen && (
        <LocationsMenu closeLocationsMenu={closeLocationsMenu} />
      )}
    </div>
  );
}
