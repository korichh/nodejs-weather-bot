import fs from "fs";

export const readFile = <T = unknown>(filePath: string): T => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(fileContent);
};

export const writeFile = (filePath: string, data: unknown): void => {
  const fileContent = JSON.stringify(data, null, 2);

  fs.writeFileSync(filePath, fileContent, "utf-8");
};
