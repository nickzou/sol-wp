import { existsSync, readFileSync, writeFileSync } from "fs";

const removeFromGitignore = (gitignorePath:string, removeEntries:string[]) => {
    let content = '';
    if(existsSync(gitignorePath)) {
        content = readFileSync(gitignorePath, 'utf-8');
    }

    const lines = content.split('\n');

    for (const entry of removeEntries) {
        const index = lines.indexOf(entry);
        if (index !== -1) {
            lines.splice(index, 1);
        }
    }

    const updatedContent = lines.join('\n');

    writeFileSync(gitignorePath, updatedContent, 'utf-8');
};

export default removeFromGitignore;