import { DateTime } from "luxon";

export const formatForecastDay = (dateTimeStr: string): string => {
  const dt = DateTime.fromSQL(dateTimeStr);

  return dt.toFormat("EEE, MMM d");
};

export const formatForecastTime = (dateTimeStr: string): string => {
  const dt = DateTime.fromSQL(dateTimeStr);

  return dt.toFormat("HH:mm");
};

export const formatForecastSun = (
  unixTimestamp: number,
  timezoneOffset: number
): string => {
  const dt = DateTime.fromSeconds(unixTimestamp + timezoneOffset).setZone(
    "UTC"
  );

  return dt.toFormat("HH:mm");
};
