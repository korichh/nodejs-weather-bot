import { database, Database } from "../lib";
import { DatabaseData, User } from "../types";
import { v4 as uuidv4 } from "uuid";

export class UserModel {
  public constructor(private database: Database) {
    const data = this.database.read<DatabaseData>();

    if (!data.users) {
      data["users"] = [];

      this.database.write(data);
    }
  }

  public getAll = (): User[] => {
    const data = this.database.read<DatabaseData>();

    return data.users;
  };

  public get = (userId: string): User | null => {
    const data = this.database.read<DatabaseData>();

    const user = data.users.find(
      (user) => user.id === userId || user.telegramId === userId
    );

    return user || null;
  };

  public create = (userData: Omit<User, "id">): User => {
    const data = this.database.read<DatabaseData>();

    const user = {
      id: uuidv4(),
      ...userData,
    };

    data.users = [...data.users, user];

    this.database.write(data);

    return user;
  };

  public update = (
    userId: string,
    userData: Partial<Omit<User, "id">>
  ): User | null => {
    const data = this.database.read<DatabaseData>();

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

    this.database.write(data);

    return user;
  };

  public delete = (userId: string): void => {
    const data = this.database.read<DatabaseData>();

    data.users = data.users.filter(
      (user) => user.id !== userId && user.telegramId !== userId
    );

    this.database.write(data);
  };
}

export const userModel = new UserModel(database);
