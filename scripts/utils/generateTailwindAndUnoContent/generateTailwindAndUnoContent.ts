import { Recipe } from "@utils/types/Recipe";

const generateTailwindAndUnoContent = (answers:Recipe) => {
    const {theme} = answers;
    return [
        `wp/themes/${theme.directory}/**/*.php`,
        `src/themes/${theme.directory}/ts/**/*.{js, jsx, ts, tsx}`
    ]
};

export default generateTailwindAndUnoContent;