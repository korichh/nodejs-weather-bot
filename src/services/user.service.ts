import { userModel, UserModel } from "../models";
import { TelegramUser, User } from "../types";

export class UserService {
  public constructor(private userModel: UserModel) {}

  public save = (telegramUser: TelegramUser): User => {
    let user = this.userModel.get(String(telegramUser.id));

    if (!user) {
      user = this.userModel.create({
        telegramId: String(telegramUser.id),
        isBot: telegramUser.is_bot,
        firstName: telegramUser.first_name,
        username: telegramUser.username || "",
        languageCode: telegramUser.language_code || "",
        location: "",
        notificationTime: "",
      });
    }

    return user;
  };
}

export const userService = new UserService(userModel);
