import { RunFunction } from "../../interfaces/Event";
import {
  Channel,
  ChannelManager,
  DMChannel,
  GuildMember,
  Message,
  TextChannel,
} from "discord.js";
import Jimp from "jimp/es";
import { channel } from "diagnostic_channel";
import { Bot } from "../../client/Client";
import { textChangeRangeIsUnchanged } from "typescript";

export const run: RunFunction = async (client, member: GuildMember) => {
  member
    .createDM()
    .then(async (dmCh) => {
      const msg: Message = await dmCh.send(
        client.embed({
          description: `Welcome ${member.displayName}!`,
          title: "Welcome!",
        })
      );
    })
    .catch((res) => {
      console.log("Error in JoinEvent: " + res);
    });

  imageWelcome(client, member);
};

export const name: string = "guildMemberAdd";

async function imageWelcome(client, member: GuildMember) {
  const img = await Jimp.read(
    `${__dirname}/../../../resources/images/welcomeBannerTemplate.png`
  );

  img.resize(800, 200);

  const avatarimg = await Jimp.read(
    member.presence.user.displayAvatarURL({ format: "png", dynamic: true })
  );

  avatarimg.resize(Jimp.AUTO, 200);

  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);

  img.print(font, 400, 35, `Welcome \n${member.displayName}!`, 400);

  img.composite(avatarimg, 0, 0);

  img.write(`${__dirname}/../../../resources/images/welcomeBanner.png`);

  member.client.channels.fetch("568916007314259998").then((ch: TextChannel) => {
    ch.send(`Welcome <@${member.id}>!`, {
      files: [`${__dirname}/../../../resources/images/welcomeBanner.png`],
    });
  });
}
