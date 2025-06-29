import { WeatherGeo } from "./weather";

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
  time: string;
}

export interface UserInfo {
  firstName: string;
  username: string;
  location: string;
  time: string;
  languageCode: string;
  isSubscribed: string;
}
