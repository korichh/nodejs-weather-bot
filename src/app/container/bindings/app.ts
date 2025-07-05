import { container } from "../instance";

import { App } from "@/app/classes";

container.bind(App).toSelf().inSingletonScope();
