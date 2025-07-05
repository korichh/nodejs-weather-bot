import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";

import { Database } from "@/lib";
import { DatabaseData, User } from "@/types";

@injectable()
export class UserModel {
  public constructor(@inject(Database) private database: Database) {}

  private getData = async (): Promise<DatabaseData> => {
    const data = await this.database.read<DatabaseData>();

    if (!data.users) {
      data["users"] = [];

      await this.database.write(data);
    }

    return data;
  };

  public getAll = async (): Promise<User[]> => {
    const data = await this.getData();

    return data.users;
  };

  public get = async (userId: string): Promise<User | null> => {
    const data = await this.getData();

    const user = data.users.find(
      (user) => user.id === userId || user.telegramId === userId
    );

    return user || null;
  };

  public create = async (userData: Omit<User, "id">): Promise<User> => {
    const data = await this.getData();

    const user = {
      id: uuidv4(),
      ...userData,
    };

    data.users = [...data.users, user];

    await this.database.write(data);

    return user;
  };

  public update = async (
    userId: string,
    userData: Partial<Omit<User, "id">>
  ): Promise<User | null> => {
    const data = await this.getData();

    const userIndex = data.users.findIndex(
      (user) => user.id === userId || user.telegramId === userId
    );
    if (userIndex === -1) {
      return null;
    }

    const user: User = {
      ...data.users[userIndex],
      ...userData,
    };

    data.users[userIndex] = user;

    await this.database.write(data);

    return user;
  };

  public delete = async (userId: string): Promise<void> => {
    const data = await this.getData();

    data.users = data.users.filter(
      (user) => user.id !== userId && user.telegramId !== userId
    );

    await this.database.write(data);
  };
}
