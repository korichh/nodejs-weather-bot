import { UserService, WeatherService } from "../../../services";
import { container } from "../instance";

container.bind(UserService).toSelf().inSingletonScope();
container.bind(WeatherService).toSelf().inSingletonScope();
