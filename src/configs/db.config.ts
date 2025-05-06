import * as fs from "fs";
import * as path from "path";

export class DBConfig {
  dbDir: string;
  dbName: string;

  constructor() {
    this.dbDir = "database";
    this.dbName = path.join(".", this.dbDir, "db.json");

    fs.mkdirSync(path.dirname(this.dbName), { recursive: true });

    try {
      if (!fs.existsSync(this.dbName)) {
        throw new Error("File does not exist");
      }

      const content = fs.readFileSync(this.dbName, "utf-8").trim();

      if (!content) {
        throw new Error("File is empty");
      }

      JSON.parse(content);
    } catch {
      fs.writeFileSync(this.dbName, JSON.stringify({}, null, 2));
    }
  }
}

export const dbConfig = new DBConfig();
