"use client";
import { IconGlobe } from "@tabler/icons-react";
import Select from "@/ui/components/Select";
import Button from "@/ui/components/Button";
import { SelectOption } from "@/interfaces/selectOption";
import { IRegionalSettingsProps } from "../types/settings";
import {
  CURRENCIES,
  LANGUAGES,
  TIMEZONES,
  DATE_FORMATS,
} from "../utils/constants/settingsData";

export default function RegionalSettings({
  settings,
  onUpdate,
  onSave,
  isSaving,
}: IRegionalSettingsProps): React.ReactNode {
  // Convert data to SelectOption format
  const currencyOptions: SelectOption[] = CURRENCIES.map((currency) => ({
    value: currency.code,
    label: `${currency.name} (${currency.symbol})`,
  }));

  const languageOptions: SelectOption[] = LANGUAGES.map((language) => ({
    value: language.code,
    label: language.name,
  }));

  const timezoneOptions: SelectOption[] = TIMEZONES.map((timezone) => ({
    value: timezone.code,
    label: `${timezone.name} ${timezone.offset}`,
  }));

  const dateFormatOptions: SelectOption[] = DATE_FORMATS.map((format) => ({
    value: format.code,
    label: `${format.name} (${format.example})`,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <IconGlobe className="text-[var(--color-text-gray)]" size={20} />
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">
            Regional Settings
          </h3>
          <p className="text-sm text-[var(--color-text-gray)]">
            Configure your currency, language, and timezone preferences
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <div className="space-y-6">
        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Currency
          </label>
          <Select
            options={currencyOptions}
            value={settings.currency.code}
            onChange={(value) => {
              const currency = CURRENCIES.find((c) => c.code === value);
              if (currency) onUpdate({ currency });
            }}
            placeholder="Select currency"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Language
          </label>
          <Select
            options={languageOptions}
            value={settings.language.code}
            onChange={(value) => {
              const language = LANGUAGES.find((l) => l.code === value);
              if (language) onUpdate({ language });
            }}
            placeholder="Select language"
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Timezone
          </label>
          <Select
            options={timezoneOptions}
            value={settings.timezone.code}
            onChange={(value) => {
              const timezone = TIMEZONES.find((t) => t.code === value);
              if (timezone) onUpdate({ timezone });
            }}
            placeholder="Select timezone"
          />
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Date Format
          </label>
          <p className="text-sm text-[var(--color-text-gray)] mb-2">
            Choose how dates are displayed
          </p>
          <Select
            options={dateFormatOptions}
            value={settings.dateFormat.code}
            onChange={(value) => {
              const dateFormat = DATE_FORMATS.find((d) => d.code === value);
              if (dateFormat) onUpdate({ dateFormat });
            }}
            placeholder="Select date format"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button onClick={onSave} disabled={isSaving} variant="primary">
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
