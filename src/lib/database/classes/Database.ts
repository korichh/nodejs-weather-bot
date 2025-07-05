import * as fss from "fs";
import * as fs from "fs/promises";
import { injectable } from "inversify";
import * as path from "path";

import { Mutex } from "./Mutex";

import { DATABASE_CONFIG } from "@/configs";

const { dbDir, dbName } = DATABASE_CONFIG;

@injectable()
export class Database {
  private mutex: Mutex = new Mutex();
  private dbPath: string = path.join(".", dbDir, dbName.concat(".json"));

  public init = async (): Promise<void> => {
    await fs.mkdir(path.dirname(this.dbPath), {
      recursive: true,
    });

    try {
      if (!fss.existsSync(this.dbPath)) {
        throw new Error();
      }

      const content = await fs.readFile(this.dbPath, "utf-8");

      JSON.parse(content);
    } catch {
      await fs.writeFile(this.dbPath, JSON.stringify({}, null, 2));
    }
  };

  public read = async <T = unknown>(): Promise<T> => {
    const release = await this.mutex.lock();

    try {
      const fileContent = await fs.readFile(this.dbPath, "utf-8");

      return JSON.parse(fileContent);
    } finally {
      release();
    }
  };

  public write = async (data: unknown): Promise<void> => {
    const release = await this.mutex.lock();

    try {
      const fileContent = JSON.stringify(data, null, 2);

      await fs.writeFile(this.dbPath, fileContent, "utf-8");
    } finally {
      release();
    }
  };
}
