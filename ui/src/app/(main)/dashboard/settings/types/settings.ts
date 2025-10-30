export interface ISettingsTab {
  id: string;
  text: string;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface ILanguage {
  code: string;
  name: string;
}

export interface ITimezone {
  code: string;
  name: string;
  offset: string;
}

export interface IDateFormat {
  code: string;
  name: string;
  example: string;
}

export interface IRegionalSettings {
  currency: ICurrency;
  language: ILanguage;
  timezone: ITimezone;
  dateFormat: IDateFormat;
}

export interface IDataExport {
  id: string;
  title: string;
  description: string;
  format: string;
}

export interface IUseSettings {
  // State
  activeTab: string;
  regionalSettings: IRegionalSettings;
  isLoading: boolean;
  isSaving: boolean;
  contentTabs: import("@/interfaces/contentTab").IContentTab[];

  // Actions
  setActiveTab: (tab: string) => void;
  setContentTabs: (
    tabs: import("@/interfaces/contentTab").IContentTab[]
  ) => void;
  updateRegionalSettings: (settings: Partial<IRegionalSettings>) => void;
  saveSettings: () => Promise<void>;
  exportData: (format: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export interface ISettingsContentProps {
  settingsData: IUseSettings;
}

export interface IRegionalSettingsProps {
  settings: IRegionalSettings;
  onUpdate: (settings: Partial<IRegionalSettings>) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export interface IDataManagementProps {
  onExportData: (format: string) => Promise<void>;
  onDeleteAccount: () => Promise<void>;
  isLoading: boolean;
}

export interface ISettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
