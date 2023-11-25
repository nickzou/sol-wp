import { Recipe } from "@utils/types/Recipe";

const generateTailwindAndUnoContent = (answers:Recipe) => {
    const {theme, tooling} = answers;

    let content = [
        `wp/themes/${theme.directory}/**/*.php`,
        `src/themes/${theme.directory}/ts/**/*.{js, jsx, ts, tsx}`
    ];

    if(tooling.template.name === 'twig') {
        content.push(`wp/themes/${theme.directory}/views/**/*.twig`);
    } else if (tooling.template.name === 'latte') {
        content.push(`wp/themes/${theme.directory}/views/**/*.latte`);
    }
    
    return content;
};

export default generateTailwindAndUnoContent;