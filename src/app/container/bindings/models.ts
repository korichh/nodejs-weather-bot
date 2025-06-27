import { UserModel } from "../../../models";
import { container } from "../instance";

container.bind(UserModel).toSelf();
