import { TFunction } from "i18next";

import { MESSAGE } from "@/constants";
import { User, UserInfo, UserLocation, WeatherGeo } from "@/types";

const { YES, NO } = MESSAGE;

export const parseUser = (t: TFunction, user: User): UserInfo => {
  return {
    firstName: user.firstName,
    username: user.username,
    location: user.location?.name || "N/A",
    time: user.time || "N/A",
    languageCode: user.languageCode,
    isSubscribed: user.isSubscribed ? YES(t) : NO(t),
  };
};

export const parseUserLocation = (
  user: User,
  locationGeo: WeatherGeo
): UserLocation => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { local_names, country, state, ...userLocation } = locationGeo;

  userLocation.name = local_names[user.languageCode] || locationGeo.name;

  return userLocation;
};
