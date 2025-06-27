import { ForecastJob } from "../../../jobs";
import { container } from "../instance";

container.bind(ForecastJob).toSelf().inSingletonScope();
