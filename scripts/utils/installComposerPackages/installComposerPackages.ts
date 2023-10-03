import executeCommand from "@utils/executeCommand/executeCommand";

const installComposerPackages = async (
  packages: string[] = [],
  installDir: string
) => {
  await executeCommand("composer", [
    "require",
    ...packages,
    `--working-dir=${installDir}`,
  ]);
};

export default installComposerPackages;
