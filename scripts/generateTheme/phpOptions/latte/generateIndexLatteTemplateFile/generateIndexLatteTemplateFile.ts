import { File } from "@utils/types/File";

const generateIndexLatteTemplateFile = ():File => {
    const content = `<main>this is latte</main>`;

    return {
        name: 'index.latte',
        content
    }
};

export default generateIndexLatteTemplateFile;