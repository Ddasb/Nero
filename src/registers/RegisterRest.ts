import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";

export const RegisterRest = async (commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) => {
  try {
    const rest = new REST().setToken(process.env.TOKEN);

    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands
    });

    console.log(`Successfully reloaded ${(data as unknown[]).length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
};
