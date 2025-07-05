import { container } from "../instance";

import { ForecastJob } from "@/jobs";

container.bind(ForecastJob).toSelf().inSingletonScope();
