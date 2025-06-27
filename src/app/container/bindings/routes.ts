import { CommandRoutes, HearRoutes, MessageRoutes } from "../../../routes";
import { container } from "../instance";

container.bind(CommandRoutes).toSelf();
container.bind(HearRoutes).toSelf();
container.bind(MessageRoutes).toSelf();
