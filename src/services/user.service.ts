import { userModel, UserModel } from "../models";
import { User } from "telegraf/typings/core/types/typegram";

export class UserService {
  constructor(private userModel: UserModel) {}

  subscribe = (user: User) => {
    const dbUser = this.userModel.get(user.id);

    if (!dbUser) {
      this.userModel.create(user);

      return true;
    }

    return false;
  };
}

export const userService = new UserService(userModel);
