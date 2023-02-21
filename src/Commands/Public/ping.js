const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("will response pong"),
  /**
   *
   * @param {ChatInputCommandInteraction} interactin
   */
  execute(interactin) {
    interactin.reply({ content: "pong", ephemeral: true });
  },
};
