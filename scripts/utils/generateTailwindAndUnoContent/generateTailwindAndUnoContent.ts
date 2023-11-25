import { Recipe } from "@utils/types/Recipe";

const generateTailwindAndUnoContent = (answers:Recipe) => {
    const {theme, tooling} = answers;

    let content = [
        `wp/themes/${theme.directory}/**/*.php`,
        `src/themes/${theme.directory}/ts/**/*.{js, jsx, ts, tsx}`,
        `wp/themes/${theme.directory}/views/**/*.${tooling.template.extension}`
    ];
 
    return content;
};

export default generateTailwindAndUnoContent;