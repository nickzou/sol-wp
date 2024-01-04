import { File } from "@utils/types/File";

const generateIndexBladeOneTemplateFile = ():File => {
    const content = `<!DOCTYPE html>
<html>
    <p>hello world</p>
</html>`;

    return {
        name: 'index.blade.php',
        content
    }
};

export default generateIndexBladeOneTemplateFile;