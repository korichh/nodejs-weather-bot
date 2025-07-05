import { container } from "../instance";

import { CommandRoutes, HearRoutes, MessageRoutes } from "@/routes";

container.bind(CommandRoutes).toSelf().inSingletonScope();
container.bind(HearRoutes).toSelf().inSingletonScope();
container.bind(MessageRoutes).toSelf().inSingletonScope();
