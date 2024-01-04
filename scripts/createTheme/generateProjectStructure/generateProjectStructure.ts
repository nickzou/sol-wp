import { Recipe } from "@utils/types/Recipe";
import generateCssFile from "@createTheme/generateCssFile/generateCssFile";
import createFolder from "@utils/createDirectory/createDirectory";

const generateProjectStucture = ({theme}:Recipe) => {
    const {name, author, description, version, directory} = theme;
    const cssFile = generateCssFile({
        name,
        author,
        description,
        version
    });

    createFolder({ location: `src/themes`, directoryName: directory});
};

export default generateProjectStucture;