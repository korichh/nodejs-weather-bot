import {
  HelperController,
  LanguageController,
  LocationController,
  ProfileController,
  StartController,
  SubscriptionController,
  TimeController,
} from "@controllers";
import { container } from "@app/container/instance";

container.bind(HelperController).toSelf().inSingletonScope();
container.bind(LocationController).toSelf().inSingletonScope();
container.bind(StartController).toSelf().inSingletonScope();
container.bind(TimeController).toSelf().inSingletonScope();
container.bind(ProfileController).toSelf().inSingletonScope();
container.bind(LanguageController).toSelf().inSingletonScope();
container.bind(SubscriptionController).toSelf().inSingletonScope();
