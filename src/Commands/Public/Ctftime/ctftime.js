const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ctftime")
    .setDescription("Display upcoming/current CTFs")
    .addSubcommand((subCommand) =>
      subCommand.setName("current").setDescription("Display current CTFs")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("upcoming").setDescription("Display upcoming CTFs")
    )
    .addSubcommand((subCommand) => {
      return subCommand
        .setName("schedule")
        .setDescription("schedule CTFs")
        .addStringOption((option) =>
          option.setName("id").setDescription("id CTFs")
        );
    }),
};
