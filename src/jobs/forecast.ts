// import { UserModel } from "../models";
// import { WeatherService } from "../services";
// import { ErrorHandler, TelegrafContext } from "../types";
// import { parseForecast } from "../utils/weather";
// import { CronJob } from "cron";
// import { inject, injectable } from "inversify";
// import { Telegraf } from "telegraf";
// import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

// @injectable()
// export class ForecastJob {
//   public constructor(
//     @inject(Telegraf) private bot: Telegraf<TelegrafContext>,
//     @inject(UserModel) private userModel: UserModel,
//     @inject(WeatherService) private weatherService: WeatherService
//   ) {}

//   public init = async (): Promise<void> => {
//     const users = await this.userModel.getAll();
//     const extra: ExtraReplyMessage = { parse_mode: "Markdown" };

//     const errorHandler: ErrorHandler = (err) => {
//       console.error(err);
//     };

//     for (const user of users) {
//       if (!user.location || !user.time) {
//         continue;
//       }

//       const onTick = async (): Promise<void> => {
//         if (!user.location) {
//           return;
//         }

//         const forecast = await this.weatherService.getForecast({
//           lat: user.location.lat,
//           lon: user.location.lon,
//         });

//         const { cityMeta, dayList } = parseForecast(forecast);

//         await this.bot.telegram.sendMessage(
//           user.telegramId,
//           cityMeta,
//           extra
//         );

//         dayList.forEach(async (dayMeta) => {
//           await this.bot.telegram.sendMessage(
//             user.telegramId,
//             dayMeta,
//             extra
//           );
//         });
//       };

//       const [hour, minute] = user.time.split(":");
//       const cronTime = `${minute} ${hour} * * *`;
//       const timeZone = user.location.timeZone;

//       CronJob.from({
//         cronTime,
//         timeZone,
//         onTick,
//         errorHandler,
//         start: true,
//       });
//     }
//   };
// }
