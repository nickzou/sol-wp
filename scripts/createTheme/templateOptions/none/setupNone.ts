import generateIndexFile from "@createTheme/generateIndexFile/generateIndexFile";
import createFile from "@utils/createFile/createFile";
import { SetupPhpPackages as SetupTemplate } from "@utils/types/SetupPhpPackages";

const setupNone = ({answers}:SetupTemplate) => {
    const phpFile = generateIndexFile();

    createFile({
      directoryPath: `wp/themes/${answers.theme.directory}`,
      fileName: phpFile.name,
      fileContent: phpFile.content,
    });
};

export default setupNone;