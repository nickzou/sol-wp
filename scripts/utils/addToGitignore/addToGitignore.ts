import { existsSync, readFileSync, writeFileSync } from "fs";

const addToGitignore = (gitignorePath:string, addEntries:string[]) => {
    let content = '';
    if(existsSync(gitignorePath)) {
        content = readFileSync(gitignorePath, 'utf-8');
    }

    const lines = content.split('\n');

    for (const entry of addEntries) {
        if (!lines.includes(entry)) {
            lines.push(entry);
        }
    }

    const updatedContent = lines.join('\n');
    writeFileSync(gitignorePath, updatedContent, 'utf-8');
};

export default addToGitignore;