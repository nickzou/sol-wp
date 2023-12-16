import generateComposerFile from "../generateComposerFile";

describe("generateComposerFIle", () => {
    const themeFolder = 'myTheme';
    const file = generateComposerFile({ themeFolder });

    it('should generate valid composer.json file', () => {
        expect(file.name).toBe('composer.json');
        expect(() => JSON.parse(file.content)).not.toThrow();
    });

    it('composer.json should have these minimum properties', () => {
        const content = JSON.parse(file.content);
        // Check specific properties
        expect(content.name).toBe(`nickzou/${themeFolder}`);
        expect(content.library).toBe(`library`);
        expect(content.license).toBe(`MIT`);
        //expect(content.autoload['psr-4']).toEqual({ [`wpSol\\${camelCase(themeFolder)}\\`]: './' });
        // ... additional checks as needed
    });
});