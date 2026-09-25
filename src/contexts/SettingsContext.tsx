import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

import type { TempUnit } from "@/types/tempUnit";
import type { Theme } from "@/types/theme";

type SettingsContext = {
  tempUnit: TempUnit;
  theme: Theme;
  toggleTempUnit: () => void;
  toggleTheme: () => void;
};

const SettingsContext = createContext<SettingsContext | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tempUnit, setTempUnit] = useState<TempUnit>("celsius");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTempUnit() {
    setTempUnit(tempUnit => tempUnit === "celsius" ? "fahrenheit" : "celsius");
  }

  function toggleTheme() {
    setTheme(theme => theme === "light" ? "dark" : "light");
  }

  return (
    <SettingsContext value={{ tempUnit, theme, toggleTempUnit, toggleTheme }}>
      {children}
    </SettingsContext>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === null) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}
