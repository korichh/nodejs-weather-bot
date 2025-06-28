import {
  LocationController,
  StartController,
  SubscriptionController,
  TimeController,
} from "../../../controllers";
import { container } from "../instance";

container.bind(LocationController).toSelf().inSingletonScope();
container.bind(StartController).toSelf().inSingletonScope();
container.bind(TimeController).toSelf().inSingletonScope();
container.bind(SubscriptionController).toSelf().inSingletonScope();
