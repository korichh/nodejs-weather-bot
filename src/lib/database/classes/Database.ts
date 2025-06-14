import { DATABASE_CONFIG } from "../config";
import * as fs from "fs";
import * as path from "path";

const { dbDir, dbName } = DATABASE_CONFIG;

export class Database {
  private dbPath: string;

  public constructor() {
    this.dbPath = path.join(".", dbDir, dbName.concat(".json"));

    fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });

    try {
      if (!fs.existsSync(this.dbPath)) {
        throw new Error();
      }

      const content = fs.readFileSync(this.dbPath, "utf-8").trim();

      if (!content) {
        throw new Error();
      }

      JSON.parse(content);
    } catch {
      fs.writeFileSync(this.dbPath, JSON.stringify({}, null, 2));
    }
  }

  public read = <T = unknown>(): T => {
    const fileContent = fs.readFileSync(this.dbPath, "utf-8");

    return JSON.parse(fileContent);
  };

  public write = (data: unknown): void => {
    const fileContent = JSON.stringify(data, null, 2);

    fs.writeFileSync(this.dbPath, fileContent, "utf-8");
  };
}

export const database = new Database();
