import { Recipe } from "@utils/types/Recipe";
import generateCssFile from "@generateTheme/generateCssFile/generateCssFile";
import createFolder from "@utils/createDirectory/createDirectory";

const generateProjectStucture = ({theme}:Recipe) => {
    const {name, author, description, version, directory} = theme;
    const cssFile = generateCssFile({
        name,
        author,
        description,
        version
    });

    createFolder({ directory: `src/themes`, folderName: })
};

export default generateProjectStucture;