import { IData } from "../interfaces";
import fs from "fs";

// TODO: create DB interface
export const readDB = (dbPath: string): IData | null => {
  try {
    const fileContent = fs.readFileSync(dbPath, "utf-8");

    return JSON.parse(fileContent);
  } catch (err) {
    console.error(err);

    return null;
  }
};

export const writeDB = (dbPath: string, data: IData): boolean => {
  try {
    const fileContent = JSON.stringify(data, null, 2);

    fs.writeFileSync(dbPath, fileContent, "utf-8");

    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
};
