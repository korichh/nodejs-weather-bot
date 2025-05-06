import { dbConfig, DBConfig } from "../configs";
import { readDB, writeDB } from "../utils";
import { User } from "telegraf/typings/core/types/typegram";

export class UserModel {
  constructor(private dbConfig: DBConfig) {
    try {
      const data = readDB(this.dbConfig.dbName);
      if (!data) {
        throw new Error("Invalid db");
      }

      if (!data.users) {
        data["users"] = [];

        writeDB(this.dbConfig.dbName, data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getAll = () => {
    try {
      const data = readDB(this.dbConfig.dbName);
      if (!data) {
        throw new Error("Invalid db");
      }

      return data.users;
    } catch (err) {
      console.error(err);
    }
  };

  get = (userId: number) => {
    try {
      const data = readDB(this.dbConfig.dbName);
      if (!data) {
        throw new Error("Invalid db");
      }

      return data.users.find((user) => user.id === userId);
    } catch (err) {
      console.error(err);
    }
  };

  create = (user: User) => {
    try {
      const data = readDB(this.dbConfig.dbName);
      if (!data) {
        throw new Error("Invalid db");
      }

      data.users = [...data.users, user];

      writeDB(this.dbConfig.dbName, data);

      return user;
    } catch (err) {
      console.error(err);
    }
  };

  delete = (userId: number) => {
    try {
      const data = readDB(this.dbConfig.dbName);
      if (!data) {
        throw new Error("Invalid db");
      }

      data.users = data.users.filter((user) => user.id !== userId);

      writeDB(this.dbConfig.dbName, data);

      return userId;
    } catch (err) {
      console.error(err);
    }
  };
}

export const userModel = new UserModel(dbConfig);
