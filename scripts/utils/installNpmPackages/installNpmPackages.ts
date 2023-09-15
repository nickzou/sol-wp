import executeCommand from "@utils/executeCommand/executeCommand";

const installNpmPackages = async (packages: string[] = []) => {
  await executeCommand("npm", ["install", ...packages, "--save-dev"]);
};

export default installNpmPackages;
