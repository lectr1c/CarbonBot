import { RunFunction } from "../../interfaces/Command";
import { GuildChannel, Message, TextChannel } from "discord.js";

export const run: RunFunction = async (
  client,
  message: Message,
  args: string[]
) => {
  console.log("TESTT GIVEAWAY");

  message.guild.channels.valueOf().each((channel: GuildChannel) => {
    if (channel.type === "text") {
      let ch = channel as TextChannel;
      message.channel.send(ch.name);
    }
  });
};

export const name: string = "giveaway";
