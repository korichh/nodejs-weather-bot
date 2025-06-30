import { I18NEXT } from "../configs";
import { UserModel } from "../models";
import { TelegrafUser, UserLocation } from "../types";
import { User } from "../types";
import { validatelanguage } from "../utils";
import { inject, injectable } from "inversify";

const { languages } = I18NEXT;

@injectable()
export class UserService {
  public constructor(@inject(UserModel) private userModel: UserModel) {}

  public saveUser = async (telegrafUser: TelegrafUser): Promise<User> => {
    validatelanguage(telegrafUser);

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
        time: "",
      });
    }

    return user;
  };

  public getUser = async (userId: string): Promise<User | null> => {
    const user = await this.userModel.get(userId);

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

  public setSubscribtion = async (
    userId: string,
    isSubscribed?: boolean
  ): Promise<User | null> => {
    let user: User | null = null;

    if (isSubscribed === undefined) {
      const existing = await this.userModel.get(userId);

      user = await this.userModel.update(userId, {
        isSubscribed: !existing?.isSubscribed,
      });
    } else {
      user = await this.userModel.update(userId, { isSubscribed });
    }

    return user;
  };

  public setLanguage = async (userId: string): Promise<User | null> => {
    let user = await this.userModel.get(userId);

    const curLang = user?.languageCode || "";
    const curIndex = languages.findIndex((lang) => lang === curLang);

    if (curIndex === -1) {
      return null;
    }

    const nextIndex = (curIndex + 1) % languages.length;
    const languageCode = languages[nextIndex];

    user = await this.userModel.update(userId, { languageCode });

    return user;
  };
}
