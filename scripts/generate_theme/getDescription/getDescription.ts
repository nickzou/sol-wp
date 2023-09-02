import { input } from "@inquirer/prompts";

const getDescription = async () => {
  return (
    (await input({
      message: "Provide a description for your theme",
      default: "A boilerplate theme provided by Sol WP.",
      validate: (input) => {
        if (/<\/?[a-z][\s\S]*>/i.test(input)) {
          return "HTML is not allowed. Please try again.";
        }
        return true;
      },
    })) || "A boilerplate theme provided by Sol WP."
  );
};

export default getDescription;
