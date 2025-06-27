import { Database } from "../../../lib";
import { container } from "../instance";

container.bind(Database).toSelf().inSingletonScope();
