import { File } from "@utils/types/File";

const generateIndexBladeOneTemplateFile = ():File => {
    const content = `<!DOCTYPE html>
    <p>hello world</p>
    </html>
    `;

    return {
        name: 'index.blade.twig',
        content
    }
};

export default generateIndexBladeOneTemplateFile;