import { UserService, WeatherService } from "../../../services";
import { container } from "../instance";

container.bind(UserService).toSelf();
container.bind(WeatherService).toSelf();
