import inquirer from "inquirer";

const getThemeName = async () => {
  const answer = await inquirer.prompt({
    name: "theme_name",
    type: "input",
    message: "Please create a name for your theme",
    default() {
      return "Sol WP";
    },
  });

  return answer.theme_name;
};

export default getThemeName;
