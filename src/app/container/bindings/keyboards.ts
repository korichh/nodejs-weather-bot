import { MainKeyboard } from "../../../keyboards";
import { container } from "../instance";

container.bind(MainKeyboard).toSelf().inSingletonScope();
