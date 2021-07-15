import { RunFunction } from "../../interfaces/Event";
import { Message } from "discord.js";
import { Command } from "../../interfaces/Command";

export const run: RunFunction = async (client, message: Message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(".")
  )
    return;

  const args: string[] = message.content.slice(1).trim().split(/ +/g);
  const cmd: string = args.shift();
  const command: Command = client.commands.get(cmd);

  if (!command) return;

  command
    .run(client, message, args)
    .catch((reason: any) =>
      message.channel.send(
        client.embed({ description: `An error came: ${reason}` }, message)
      )
    );
};

export const name: string = "message";
