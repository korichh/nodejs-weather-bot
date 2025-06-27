import { UserModel } from "../models";
import { TelegrafUser, UserLocation } from "../types";
import { User } from "../types";
import { inject, injectable } from "inversify";

@injectable()
export class UserService {
  public constructor(@inject(UserModel) private userModel: UserModel) {}

  public getUser = async (telegrafUser: TelegrafUser): Promise<User> => {
    let user = await this.userModel.get(String(telegrafUser.id));

    if (!user) {
      user = await this.userModel.create({
        telegramId: String(telegrafUser.id),
        isBot: telegrafUser.is_bot,
        firstName: telegrafUser.first_name,
        username: telegrafUser.username || "",
        languageCode: telegrafUser.language_code || "",
        isSubscribed: true,
        location: null,
        time: "9:00",
      });
    }

    return user;
  };

  public setLocation = async (
    userId: string,
    location: UserLocation | null
  ): Promise<User | null> => {
    const user = await this.userModel.update(userId, { location });

    return user;
  };

  public setTime = async (
    userId: string,
    time: string
  ): Promise<User | null> => {
    const user = await this.userModel.update(userId, { time });

    return user;
  };
}
