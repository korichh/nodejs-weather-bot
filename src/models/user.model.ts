import { dbConfig, DBConfig } from "../configs";
import { logger, readDB, writeDB } from "../utils";
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
      if (err instanceof Error) {
        logger.error(err.message);
      }
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
      if (err instanceof Error) {
        logger.error(err.message);
      }
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
      if (err instanceof Error) {
        logger.error(err.message);
      }
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
      if (err instanceof Error) {
        logger.error(err.message);
      }
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
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  };
}

export const userModel = new UserModel(dbConfig);
