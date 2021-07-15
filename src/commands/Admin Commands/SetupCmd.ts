import { RunFunction } from "../../interfaces/Command";
import {
  CategoryChannel,
  Collection,
  GuildChannel,
  Message,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import { Config } from "../../interfaces/Config";
import * as File from "../../../resources/configs/config.json";
import * as fs from "fs";

export const run: RunFunction = async (
  client,
  message: Message,
  args: string[]
) => {
  console.log("TESTT GIVEAWAY");

  let config = File;

  const categoryChannels: Collection<string, CategoryChannel> =
    message.guild.channels
      .valueOf()
      .filter((channel) => channel.type === "category") as Collection<
      string,
      CategoryChannel
    >;

  categoryChannels.forEach((category: CategoryChannel) => {
    let children = category.children.map((child: GuildChannel) => child.id);
    config[category.name] = children;
  });

  const jsonConf = JSON.stringify(config);

  fs.writeFile(
    `${__dirname}/../../../resources/configs/config.json`,
    jsonConf,
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
};

export const name: string = "setup";

/*
    switch (channel.type) {
      case "text":
        ch = channel as TextChannel;
        message.channel.send(ch.name + "  " + ch.parent.name);
        break;
      case "voice":
        ch = channel as VoiceChannel;
        message.channel.send(ch.name + "  " + ch.parent.name);
      case "category":
        ch = channel as CategoryChannel;
        message.channel.send(ch.name);
      default:
        break;
    }
*/
