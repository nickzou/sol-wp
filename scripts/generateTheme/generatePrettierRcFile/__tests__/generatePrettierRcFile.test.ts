import generatePrettierRcFile from '@generateTheme/generatePrettierRcFile/generatePrettierRcFile';
import { File } from '@utils/types/File';

describe('generatePrettierRcFile', () => {
  it('should generate a valid .prettierrc file', () => {
    // Arrange
    const expectedContent = `{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 80,
    "plugins": [
    ]
  };
  `;

    // Act
    const result: File = generatePrettierRcFile();

    // Assert
    expect(result.name).toBe('.prettierrc');
    expect(result.content).toBe(expectedContent);
  });
});
