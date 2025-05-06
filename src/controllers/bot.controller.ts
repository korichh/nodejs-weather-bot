import {
  botService,
  BotService,
  userService,
  UserService,
} from "../services";

export class BotController {
  constructor(
    private botService: BotService,
    private userService: UserService
  ) {}

  start = () => {
    const bot = this.botService.get();

    bot.command("start", (ctx) => {
      const user = ctx.from;

      const subscribeRes = this.userService.subscribe(user);

      let response = "";

      if (subscribeRes) {
        response = "You are successfully subscribed!";
      } else {
        response = "You are already subscribed!";
      }

      ctx.reply(response);
    });

    bot.launch();
  };
}

export const botController = new BotController(botService, userService);
