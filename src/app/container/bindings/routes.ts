import { CommandRoutes, HearRoutes, MessageRoutes } from "../../../routes";
import { container } from "../instance";

container.bind(CommandRoutes).toSelf().inSingletonScope();
container.bind(HearRoutes).toSelf().inSingletonScope();
container.bind(MessageRoutes).toSelf().inSingletonScope();
