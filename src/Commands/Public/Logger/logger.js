const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logger")
    .setDescription("Generate ctf log")
    .addSubcommand((subCommand) => {
      return subCommand
        .setName("ctftime")
        .setDescription("Generate ctf log based on ctftime event id")
        .addStringOption((option) =>
          option.setName("id").setDescription("id CTFs")
        )
        .addStringOption((option) =>
          option.setName("writeup").setDescription("Writeup link")
        )
        .addStringOption((option) =>
          option.setName("leaderboard").setDescription("Leader board ranking")
        )

    }
    )
};