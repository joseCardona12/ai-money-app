/**
 * Format time from a date string using the user's locale
 * This function handles timezone-aware time formatting
 * @param dateString - ISO date string from backend
 * @param locale - Locale code (e.g., 'es-CO' for Colombia)
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (dateString: string, locale: string = "es-CO"): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
};

/**
 * Format time with timezone offset
 * @param dateString - ISO date string from backend
 * @param timezoneOffset - Timezone offset in hours (e.g., -5 for UTC-5)
 * @returns Formatted time string
 */
export const formatTimeWithTimezone = (
  dateString: string,
  timezoneOffset: number = -5
): string => {
  try {
    const date = new Date(dateString);
    
    // Get UTC time
    const utcTime = date.getTime();
    
    // Apply timezone offset
    const localTime = new Date(utcTime + timezoneOffset * 60 * 60 * 1000);
    
    return localTime.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting time with timezone:", error);
    return "Invalid time";
  }
};

