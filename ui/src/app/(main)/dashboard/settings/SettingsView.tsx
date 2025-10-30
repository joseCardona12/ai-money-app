"use client";
import SettingsContent from "./components/SettingsContent";
import useSettings from "./hooks/useSettings";

export default function SettingsView(): React.ReactNode {
  const settingsData = useSettings();

  return <SettingsContent settingsData={settingsData} />;
}
