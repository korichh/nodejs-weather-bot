import { MESSAGE } from "../constants";
import { User, UserInfo } from "../types";
import { TFunction } from "i18next";

const { YES, NO } = MESSAGE;

export const parseUser = (t: TFunction, user: User): UserInfo => {
  return {
    firstName: user.firstName,
    username: user.username,
    location: user.location
      ? `${user.location.name}, ${user.location.state}, ${user.location.country}`
      : "N/A",
    time: user.time || "N/A",
    languageCode: user.languageCode,
    isSubscribed: user.isSubscribed ? YES(t) : NO(t),
  };
};
