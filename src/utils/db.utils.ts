import { logger } from "./logger.utils";
import fs from "fs";

export const readDB = (dbPath: string): unknown | null => {
  try {
    const fileContent = fs.readFileSync(dbPath, "utf-8");

    return JSON.parse(fileContent);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
    }

    return null;
  }
};

export const writeDB = (dbPath: string, data: unknown): boolean => {
  try {
    const fileContent = JSON.stringify(data, null, 2);

    fs.writeFileSync(dbPath, fileContent, "utf-8");

    return true;
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
    }

    return false;
  }
};
