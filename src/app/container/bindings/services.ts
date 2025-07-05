import { container } from "../instance";

import { UserService, WeatherService } from "@/services";

container.bind(UserService).toSelf().inSingletonScope();
container.bind(WeatherService).toSelf().inSingletonScope();
