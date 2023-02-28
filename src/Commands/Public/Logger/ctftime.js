const {
  ChatInputCommandInteraction,
  Client,
  PermissionsBitField,
  ChannelType,
} = require("discord.js");
const { infoEvents } = require("../../../Functions/ctftime");
const { ManageRoles, ManageChannels, SendMessages, ViewChannel } =
  PermissionsBitField.Flags;

module.exports = {
  subCommand: "logger.ctftime",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const permissionAdmin = [ManageRoles, ManageChannels];

    if (!interaction.member.permissions.has(permissionAdmin)) {
      return interaction.reply({
        content: "This command is only available to the admin",
        ephemeral: true,
      });
    }

    const id = options.getString("id");
    const writeup = options.getString("writeup");
    const leaderboard = options.getString("leaderboard")

    await interaction.deferReply()
    const data = await infoEvents(id);
    if (data.length === 0) {
      return interaction.reply({
        content: "Invalid id CTFs",
        ephemeral: true,
      });
    }
    // get role id
    let roleId = interaction.guild.roles.cache.find(role => role.name === data.title)?.id;
    if (!roleId) {
      return interaction.reply({
        content: "The role for this CTFs doesn't exist",
        ephemeral: true,
      });
    }

    let membersWithRoleId = (await interaction.guild.members.fetch())
      .filter(member => member.roles.cache.find(a => a.id == roleId))
      .map(m => `<@${m.id}>`)

    const embed = {
      title: data.title,
      description: data.link,
      url: `https://ctftime.org/event/${id}`,
      thumbnail: {
        url: data.img,
      },
      fields: [
        { name: "**id**", value: id, inline: true },
        { name: "**format**", value: data.format, inline: true },
        { name: "**location**", value: data.location, inline: true },
        { name: "**weight**", value: data.weight, inline: true },
        { name: "**writeup**", value: writeup, inline: true },
        { name: "**leaderboard**", value: leaderboard, inline: true },
        { name: "**participant**", value: membersWithRoleId.join("\n"), inline: false }
      ],
      footer: {
        text: data.date,
      },
    };

    return interaction.editReply({ embeds: [embed] });
  },
};
