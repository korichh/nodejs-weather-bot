import { container } from "../instance";

import { MainKeyboard } from "@/keyboards";

container.bind(MainKeyboard).toSelf().inSingletonScope();
