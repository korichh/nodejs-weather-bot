import { addAlias } from "module-alias";
import path from "path";

if (process.env.NODE_ENV === "development") {
  addAlias("@", path.join(process.cwd(), "./src"));
} else {
  addAlias("@", path.join(process.cwd(), "./dist"));
}
