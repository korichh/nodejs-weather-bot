import { botModel, BotModel } from "../models";

export class BotService {
  constructor(private botModel: BotModel) {}

  get = () => {
    return this.botModel.bot;
  };
}

export const botService = new BotService(botModel);
