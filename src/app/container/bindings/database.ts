import { container } from "../instance";

import { Database } from "@/lib";

container.bind(Database).toSelf().inSingletonScope();
