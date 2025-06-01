import { dbConfig, DBConfig } from "../configs";
import { DBData, User } from "../types";
import { readFile, writeFile } from "../utils";
import { v4 as uuidv4 } from "uuid";

export class UserModel {
  public constructor(private dbConfig: DBConfig) {
    const data = readFile<DBData>(this.dbConfig.dbName);

    if (!data.users) {
      data["users"] = [];

      writeFile(this.dbConfig.dbName, data);
    }
  }

  public getAll = (): User[] => {
    const data = readFile<DBData>(this.dbConfig.dbName);

    return data.users;
  };

  public get = (userId: string): User | null => {
    const data = readFile<DBData>(this.dbConfig.dbName);

    const user = data.users.find(
      (user) => user.id === userId || user.telegramId === userId
    );

    return user || null;
  };

  public create = (userData: Omit<User, "id">): User => {
    const data = readFile<DBData>(this.dbConfig.dbName);

    const user = {
      id: uuidv4(),
      ...userData,
    };

    data.users = [...data.users, user];

    writeFile(this.dbConfig.dbName, data);

    return user;
  };

  public update = (
    userId: string,
    userData: Partial<Omit<User, "id">>
  ): User | null => {
    const data = readFile<DBData>(this.dbConfig.dbName);

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

    writeFile(this.dbConfig.dbName, data);

    return user;
  };

  public delete = (userId: string): void => {
    const data = readFile<DBData>(this.dbConfig.dbName);

    data.users = data.users.filter(
      (user) => user.id !== userId && user.telegramId !== userId
    );

    writeFile(this.dbConfig.dbName, data);
  };
}

export const userModel = new UserModel(dbConfig);
