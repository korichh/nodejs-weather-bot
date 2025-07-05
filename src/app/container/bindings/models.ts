import { container } from "../instance";

import { UserModel } from "@/models";

container.bind(UserModel).toSelf().inSingletonScope();
