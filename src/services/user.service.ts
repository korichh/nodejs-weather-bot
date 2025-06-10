import { userModel, UserModel } from "../models";
import { TelegrafUser, UserLocation } from "../types";
import { User } from "../types";

export class UserService {
  public constructor(private userModel: UserModel) {}

  public get = (telegrafUser: TelegrafUser): User => {
    let user = this.userModel.get(String(telegrafUser.id));

    if (!user) {
      user = this.userModel.create({
        telegramId: String(telegrafUser.id),
        isBot: telegrafUser.is_bot,
        firstName: telegrafUser.first_name,
        username: telegrafUser.username || "",
        languageCode: telegrafUser.language_code || "",
        isSubscribed: true,
        location: null,
        notificationTime: "",
      });
    }

    return user;
  };

  public setLocation = (
    userId: string,
    location: UserLocation | null
  ): User | null => {
    const user = this.userModel.update(userId, { location });

    return user;
  };

  public setNotificationTime = (
    userId: string,
    notificationTime: string
  ): User | null => {
    const user = this.userModel.update(userId, { notificationTime });

    return user;
  };
}

export const userService = new UserService(userModel);
