import {
  LocationController,
  StartController,
  TimeController,
} from "../../../controllers";
import { container } from "../instance";

container.bind(LocationController).toSelf();
container.bind(StartController).toSelf();
container.bind(TimeController).toSelf();
