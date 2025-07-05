import { container } from "../instance";

import {
  HelperController,
  LanguageController,
  LocationController,
  ProfileController,
  StartController,
  SubscriptionController,
  TimeController,
  WeatherController,
} from "@/controllers";

container.bind(HelperController).toSelf().inSingletonScope();
container.bind(LocationController).toSelf().inSingletonScope();
container.bind(StartController).toSelf().inSingletonScope();
container.bind(TimeController).toSelf().inSingletonScope();
container.bind(WeatherController).toSelf().inSingletonScope();
container.bind(ProfileController).toSelf().inSingletonScope();
container.bind(LanguageController).toSelf().inSingletonScope();
container.bind(SubscriptionController).toSelf().inSingletonScope();
