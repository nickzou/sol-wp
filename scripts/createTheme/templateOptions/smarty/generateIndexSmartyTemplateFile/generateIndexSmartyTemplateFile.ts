import { File } from "@utils/types/File";

const generateIndexTwigTemplateFile = ():File => {
    const content = `{* Smarty *}
<!DOCTYPE html>
    <html {}>
    </html>`;

    return {
        name: `index.tpl`,
        content
    }
};

export default generateIndexTwigTemplateFile;