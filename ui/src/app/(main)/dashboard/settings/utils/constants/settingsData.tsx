import {
  ISettingsTab,
  ICurrency,
  ILanguage,
  ITimezone,
  IDateFormat,
  IDataExport,
} from "../../types/settings";
import { IContentTab } from "@/interfaces/contentTab";

export const SETTINGS_TABS: ISettingsTab[] = [
  { id: "general", text: "General" },
  { id: "notifications", text: "Notifications" },
  { id: "security", text: "Security" },
  { id: "billing", text: "Billing" },
];

export const SETTINGS_CONTENT_TABS: IContentTab[] = [
  {
    active: true,
    icon: <span></span>,
    tab_key: "general",
    text: "General",
  },
  {
    active: false,
    icon: <span></span>,
    tab_key: "notifications",
    text: "Notifications",
  },
  {
    active: false,
    icon: <span></span>,
    tab_key: "security",
    text: "Security",
  },
  {
    active: false,
    icon: <span></span>,
    tab_key: "billing",
    text: "Billing",
  },
];

export const CURRENCIES: ICurrency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
];

export const LANGUAGES: ILanguage[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
];

export const TIMEZONES: ITimezone[] = [
  { code: "UTC-5", name: "Colombia Time (Bogotá)", offset: "(UTC-5)" },
  { code: "UTC-5", name: "Eastern Time", offset: "(UTC-5)" },
  { code: "UTC-6", name: "Central Time", offset: "(UTC-6)" },
  { code: "UTC-7", name: "Mountain Time", offset: "(UTC-7)" },
  { code: "UTC-8", name: "Pacific Time", offset: "(UTC-8)" },
  { code: "UTC+0", name: "Greenwich Mean Time", offset: "(UTC+0)" },
  { code: "UTC+1", name: "Central European Time", offset: "(UTC+1)" },
  { code: "UTC+2", name: "Eastern European Time", offset: "(UTC+2)" },
  { code: "UTC+9", name: "Japan Standard Time", offset: "(UTC+9)" },
];

export const DATE_FORMATS: IDateFormat[] = [
  { code: "MM/DD/YYYY", name: "MM/DD/YYYY", example: "12/31/2024" },
  { code: "DD/MM/YYYY", name: "DD/MM/YYYY", example: "31/12/2024" },
  { code: "YYYY-MM-DD", name: "YYYY-MM-DD", example: "2024-12-31" },
  { code: "DD-MM-YYYY", name: "DD-MM-YYYY", example: "31-12-2024" },
  { code: "MM-DD-YYYY", name: "MM-DD-YYYY", example: "12-31-2024" },
];

export const DATA_EXPORTS: IDataExport[] = [
  {
    id: "csv",
    title: "Export Data",
    description: "Download all your financial data as CSV",
    format: "CSV",
  },
  {
    id: "json",
    title: "Export Data (JSON)",
    description: "Download all your financial data as JSON",
    format: "JSON",
  },
  {
    id: "pdf",
    title: "Export Report",
    description: "Download a comprehensive financial report as PDF",
    format: "PDF",
  },
];

export const DEFAULT_REGIONAL_SETTINGS = {
  currency: CURRENCIES[0], // USD
  language: LANGUAGES[0], // English
  timezone: TIMEZONES[0], // Eastern Time
  dateFormat: DATE_FORMATS[0], // MM/DD/YYYY
};
