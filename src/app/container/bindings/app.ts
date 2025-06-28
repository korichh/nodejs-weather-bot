import { App } from "../../classes";
import { container } from "../instance";

container.bind(App).toSelf().inSingletonScope();
