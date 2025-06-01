import { userModel, UserModel } from "../models";
import { TelegrafUser } from "../types";
import { User } from "../types";

export class UserService {
  public constructor(private userModel: UserModel) {}

  public save = (telegrafUser: TelegrafUser): User => {
    let user = this.userModel.get(String(telegrafUser.id));

    if (!user) {
      user = this.userModel.create({
        telegramId: String(telegrafUser.id),
        isBot: telegrafUser.is_bot,
        firstName: telegrafUser.first_name,
        username: telegrafUser.username || "",
        languageCode: telegrafUser.language_code || "",
        isSubscribed: true,
        location: "",
        notificationTime: "",
      });
    }

    return user;
  };
}

export const userService = new UserService(userModel);
