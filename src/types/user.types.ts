import { WeatherGeo } from "./weather.types";

export type UserLocation = Omit<WeatherGeo, "local_names">;

export interface User {
  id: string;
  telegramId: string;
  isBot: boolean;
  firstName: string;
  username: string;
  languageCode: string;
  isSubscribed: boolean;
  location: UserLocation | null;
  notificationTime: string;
}
