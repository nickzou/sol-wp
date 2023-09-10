import generateSassConfigFile from '@generateTheme/setupTooling/sass/generateSassConfigFile/generateSassConfigFile';
import { File } from '@utils/types/File'; // Adjust the import path

describe('generateSassConfigFile', () => {
  it('should generate a valid sass.config.ts file', () => {
    // Act
    const result: File = generateSassConfigFile();

    // Assert
    expect(result.name).toBe('sass.config.ts');
    expect(typeof result.content).toBe('string');
    expect(result.content).toContain('import * as sass from "sass";');
    expect(result.content).toContain(
      'const files = glob.sync(`./src/css/**/*.scss`);',
    );
    // ... you can add more specific assertions based on the expected content
  });
});
