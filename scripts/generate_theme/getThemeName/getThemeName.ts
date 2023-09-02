import { input } from "@inquirer/prompts";

const getThemeName = async () => {
  return (
    (await input({
      message: "Provide a name for your theme",
      default: "Sol WP",
    })) || "Sol WP"
  );
};

export default getThemeName;
